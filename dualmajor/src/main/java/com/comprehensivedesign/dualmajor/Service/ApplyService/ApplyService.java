package com.comprehensivedesign.dualmajor.Service.ApplyService;

import com.comprehensivedesign.dualmajor.dto.ApplyDto;

import java.util.Map;

public interface ApplyService {

    Map getRateInfo(ApplyDto applyDto);

    Map getApplyInfo(ApplyDto applyDto) throws Exception;

}
