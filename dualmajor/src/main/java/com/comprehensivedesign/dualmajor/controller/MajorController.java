package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.MajorService.MajorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MajorController {
    @Autowired private final MajorService majorService;

    @GetMapping("/firstMajorList")
    public Map firstMajorList() {
        return majorService.viewFirstMajorList();

    }
    @GetMapping("/dualMajorList")
    public Map dualMajorList() {
        return majorService.viewDualMajorList();
    }


    @PostMapping("/majorList/seoul")
    public Map seoulMajorList() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("majorListSeoul",majorService.viewMajorByCampus("서울"));
        return map;
    }

    @PostMapping("/majorList/global")
    public Map globalMajorList() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("majorListGlobal", majorService.viewMajorByCampus("글로벌"));
        return map;
    }

}
