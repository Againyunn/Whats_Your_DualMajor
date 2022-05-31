package com.comprehensivedesign.dualmajor.Service.ApplyService;

import com.comprehensivedesign.dualmajor.dto.ApplyDto;

import java.util.Map;

public interface ApplyService {

    Map getRateInfo(ApplyDto applyDto);

    Map getApplyInfo(ApplyDto applyDto) throws Exception;

    boolean postApply(ApplyDto applyDto) throws Exception;

    boolean deleteApply(ApplyDto applyDto) throws Exception;

}
