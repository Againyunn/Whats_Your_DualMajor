package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.ApplyService.ApplyService;
import com.comprehensivedesign.dualmajor.dto.ApplyDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ApplyController {
    @Autowired private final ApplyService applyService;

    //특정 학과의 지원 수와 이중전공 정원
    @PostMapping("/rateInfo")
    public Object rateInfo(@RequestBody ApplyDto applyDto){
        return applyService.getRateInfo(applyDto);
    }

    //회원의 지원 정보 확인
    @PostMapping("/getApplyInfo")
    public Object applyInfo(@RequestBody ApplyDto applyDto) throws Exception{
        Map<String, Object> map = new LinkedHashMap<>();
        try{
            applyService.getApplyInfo(applyDto);
        }
        catch(Exception e){
            map.put("stdNum",applyDto.getStdNum());
            map.put("apply",false);
            map.put("majorName",null);
            map.put("gpa",null);
            map.put("change",true);
            return map;
        }
        return applyService.getApplyInfo(applyDto);
    }

    @PostMapping("/postApply")
    public Object postApply(@RequestBody ApplyDto applyDto) throws Exception{
        Map<String, Object> map = new LinkedHashMap<>();
        try{
            applyService.postApply(applyDto);
        }
        catch(Exception e){
            map.put("is_success", false);
            return map;
        }
        map.put("is_success", true);
        return map;
    }

}
