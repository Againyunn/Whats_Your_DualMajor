package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.SurveyService.SurveyService;
import com.comprehensivedesign.dualmajor.dto.SurveyDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SurveyController {
    @Autowired private final SurveyService surveyService;

    @PostMapping("/saveSurvey")
    public Map saveSurvey(@RequestBody SurveyDto surveyDto) {
        Map<String, Object> map = new LinkedHashMap<>();
        surveyService.saveSurvey(surveyDto);
        map.put("success", true);
        return map;
    }

}
