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

        System.out.println("stdNum in controller"+applyDto.getStdNum());
        try{
            map = applyService.getApplyInfo(applyDto);
        }
        catch(Exception e){
            Map<String, Object> failedMap = new LinkedHashMap<>();
            failedMap.put("stdNum",applyDto.getStdNum());
            failedMap.put("apply",false);
            failedMap.put("majorName",null);
            failedMap.put("gpa",null);
            failedMap.put("change",true);
            return failedMap;
        }
        return map;
    }

    @PostMapping("/postApply")
    public Object postApply(@RequestBody ApplyDto applyDto) throws Exception{
        Map<String, Object> map = new LinkedHashMap<>();
        System.out.println("isApply"+applyDto.isApply());
        if(applyDto.isApply()==true) { //지원하기 인 경우
            try{
                applyService.postApply(applyDto); //지원자의 학번과 지원 학과를 지원 정보에 저장
            }
            catch(Exception e){
                map.put("is_success", false);
                return map;
            }
            map.put("is_success", true);
            return map;
        }
        else{ //지원취소인 경우
            applyService.deleteApply(applyDto); //지원자의 학번과 지원한 학과에 해당하는 지원 정보 삭제
            map.put("is_success", true);
            return map;
        }
    }

}
