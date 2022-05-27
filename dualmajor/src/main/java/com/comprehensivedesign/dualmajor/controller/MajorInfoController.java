package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.MajorService.MajorService;
import com.comprehensivedesign.dualmajor.dto.DepartmentInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MajorInfoController {

    @Autowired private final MajorService majorService;

    /*학과별 전수별사 정보 조회용*/
    @PostMapping("/getDepartmentInfo")
    public Object getMajorInfo(@RequestBody DepartmentInfoDto departmentInfoDto) {
        Map map = majorService.viewMajorDetail(departmentInfoDto.getDepartmentName());
        return map;
    }
}
