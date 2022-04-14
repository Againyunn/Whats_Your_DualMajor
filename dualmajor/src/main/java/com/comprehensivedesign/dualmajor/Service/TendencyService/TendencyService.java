package com.comprehensivedesign.dualmajor.Service.TendencyService;

import com.comprehensivedesign.dualmajor.dto.TendencyDto;

import java.util.List;

public interface TendencyService {
    Object resultProcess(TendencyDto tendencyDto, Long memberId);
    String mbtiProcess(TendencyDto tendencyDto, Long memberId);
}
