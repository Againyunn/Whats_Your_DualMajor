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
        if(secondSectionQuestionDto.getQuestionNum()==1 || secondSectionQuestionDto.getQuestionNum()==2){
            boolean b = secondSectionService.saveCollegeAnswer(secondSectionQuestionDto, memberAdapter.getMember().getId());
            if(b==true){
                map.put("success", true);
            }
            else{
                map.put("success", true);
            }
            return map;
        }
        secondSectionService.binaryTree(secondSectionQuestionDto.getAnswer(), memberAdapter.getMember().getId());
        map.put("success", true);
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
