package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.SecondSection.SecondSectionService;
import com.comprehensivedesign.dualmajor.config.auth.MemberAdapter;
import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import com.comprehensivedesign.dualmajor.dto.SecondSectionQuestionDto;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.RequiredTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SecondSectionController {

    @Autowired private final SecondSectionService secondSectionService;

    @PostMapping("/submitFirstSectionResult")
    public Map saveSector(@RequestBody SecondSectionQuestionDto secondSectionQuestionDto, @AuthenticationPrincipal MemberAdapter memberAdapter) {
        Map<String, Object> map = new LinkedHashMap<>();
        SecondSectionResponse response = secondSectionService.createResponse(memberAdapter.getMember(), secondSectionQuestionDto.getAcademicName());
        map.put("success", true);
        map.put("academicName", response.getSectorName());
        return map;
    }

    @PostMapping("/secondSectionQuestion")
    public Map viewQuestion(@RequestBody SecondSectionQuestionDto secondSectionQuestionDto, @AuthenticationPrincipal MemberAdapter memberAdapter) {
        Map map = secondSectionService.recommendProcess(secondSectionQuestionDto, memberAdapter.getMember());
        return map;
    }

    @PostMapping("/secondSectionAnswer")
    public Map getAnswer(@RequestBody SecondSectionQuestionDto secondSectionQuestionDto, @AuthenticationPrincipal MemberAdapter memberAdapter) {
        Map<String, Object> map = new LinkedHashMap<>();
        /* 학과 추천 섹터별 캠퍼스 공통 문항 1, 2번에 대한 처리 */
        if(secondSectionQuestionDto.getQuestionNum()==1 || secondSectionQuestionDto.getQuestionNum()==2){
            String str = secondSectionService.saveCollegeAnswer(secondSectionQuestionDto, memberAdapter.getMember().getId());
            if(str.equals("q1")){
                map.put("success", true);
                map.put("finished", false);
            } else { //공퉁 문항이 끝난 후 인문학 섹터 vs 나머지 섹터
                if (str.equals("humanity")) { //인문학 섹터는 공통 문항 2번이 마지막 질문임.
                    map.put("success", true);
                    map.put("finished", true);
                }
                else{
                    map.put("success", true);
                    map.put("finished", false);
                }
            }
            return map;
        }
        /* 섹터별 질문 트리에 관한 응답 처리 */
        String progress = secondSectionService.binaryTree(secondSectionQuestionDto.getAnswer(), memberAdapter.getMember().getId());
        if (progress.equals("end")) { //마지막 질문에 응답한 경우 프론트에 질문이 끝났다는 것을 알리기 위한 API
            map.put("success", true);
            map.put("finished", true);
            return map;
        }
        map.put("success", true);
        map.put("finished", false);
        return map;
    }

    @PostMapping("/finalResult")
    public Map viewResult(@RequestBody SecondSectionQuestionDto secondSectionQuestionDto, @AuthenticationPrincipal MemberAdapter memberAdapter) {
        if (secondSectionQuestionDto.getResultType().equals("result101")) {
            return secondSectionService.viewResult(memberAdapter.getMember().getId());
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("success", false);
        return map;

    }
}
