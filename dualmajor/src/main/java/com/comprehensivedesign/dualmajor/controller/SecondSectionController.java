package com.comprehensivedesign.dualmajor.controller;


import ch.qos.logback.core.encoder.EchoEncoder;
import com.comprehensivedesign.dualmajor.Service.MemberRecommendedMajor.MemberRecommendedMajorService;
import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.Service.SecondSection.SecondSectionService;
import com.comprehensivedesign.dualmajor.config.auth.MemberAdapter;
import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.dto.SaveFinalResultDto;
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
    @Autowired private final MemberService memberService;
    @Autowired private final SecondSectionService secondSectionService;
    @Autowired private final MemberRecommendedMajorService memberRecommendedMajorService;

    @PostMapping("/submitFirstSectionResult")
    public Map saveSector(@RequestBody SecondSectionQuestionDto secondSectionQuestionDto) {
        Map<String, Object> map = new LinkedHashMap<>();
        SecondSectionResponse response = secondSectionService.createResponse(secondSectionQuestionDto.getTestKey(), secondSectionQuestionDto.getAcademicName());
        map.put("testKey", secondSectionQuestionDto.getTestKey());
        map.put("success", true);
        map.put("academicName", response.getSectorName());
        return map;
    }

    @PostMapping("/secondSectionQuestion")
    public Map viewQuestion(@RequestBody SecondSectionQuestionDto secondSectionQuestionDto, @AuthenticationPrincipal MemberAdapter memberAdapter) {
        Map map = secondSectionService.recommendProcess(secondSectionQuestionDto, secondSectionQuestionDto.getTestKey());
        return map;
    }

    @PostMapping("/secondSectionAnswer")
    public Map getAnswer(@RequestBody SecondSectionQuestionDto secondSectionQuestionDto, @AuthenticationPrincipal MemberAdapter memberAdapter) {
        Map<String, Object> map = new LinkedHashMap<>();
        /* 학과 추천 섹터별 캠퍼스 공통 문항 1, 2번에 대한 처리 */
        if(secondSectionQuestionDto.getQuestionNum()==1 || secondSectionQuestionDto.getQuestionNum()==2){
            String str = secondSectionService.saveCollegeAnswer(secondSectionQuestionDto, secondSectionQuestionDto.getTestKey());
            if(str.equals("q1")){
                map.put("testKey", secondSectionQuestionDto.getTestKey());
                map.put("success", true);
                map.put("finished", false);
            } else { //공퉁 문항이 끝난 후 인문학 섹터 vs 나머지 섹터
                if (str.equals("humanity")) { //인문학 섹터는 공통 문항 2번이 마지막 질문임.
                    map.put("testKey", secondSectionQuestionDto.getTestKey());
                    map.put("success", true);
                    map.put("finished", true);
                }
                else{
                    map.put("testKey", secondSectionQuestionDto.getTestKey());
                    map.put("success", true);
                    map.put("finished", false);
                }
            }
            return map;
        }
        /* 섹터별 질문 트리에 관한 응답 처리 */
        String progress = secondSectionService.binaryTree(secondSectionQuestionDto.getAnswer(), secondSectionQuestionDto.getTestKey());
        if (progress.equals("end")) { //마지막 질문에 응답한 경우 프론트에 질문이 끝났다는 것을 알리기 위한 API
            map.put("testKey", secondSectionQuestionDto.getTestKey());
            map.put("success", true);
            map.put("finished", "result101");
            return map;
        }
        map.put("testKey", secondSectionQuestionDto.getTestKey());
        map.put("success", true);
        map.put("finished", false);
        return map;
    }

    @PostMapping("/finalResult")
    public Map viewResult(@RequestBody SecondSectionQuestionDto secondSectionQuestionDto, @AuthenticationPrincipal MemberAdapter memberAdapter) {
        /*if (secondSectionQuestionDto.getResultType().equals("result101")) {
            return secondSectionService.viewResult(secondSectionQuestionDto.getTestKey());
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("success", false);
        return map;*/
        return secondSectionService.viewResult(secondSectionQuestionDto.getTestKey());

    }

    @PostMapping("/saveResult")
    public Object saveResult(@RequestBody SaveFinalResultDto saveFinalResultDto) throws Exception {
        Map<String, Object> map = new LinkedHashMap<>();
        System.out.println("user in save Result : "+saveFinalResultDto.getUser());
        if (saveFinalResultDto.getUser().equals(false)) { //회원이 아닐 시  username에 false 도착
            map.put("success", true);
            return map;
        }
        memberRecommendedMajorService.saveResult(saveFinalResultDto.getUser(), saveFinalResultDto.getDepartmentName());
        map.put("success", true);
        return map;
    }
}
