package com.comprehensivedesign.dualmajor.Service.FirstSection.TendencyService;

import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.FirstSectionQuestionDto;

import java.util.List;
import java.util.Map;

public interface TendencyService {
    String resultProcess(FirstSectionQuestionDto firstSectionQuestionDto, String testKey);
    String mbtiProcess(FirstSectionQuestionDto firstSectionQuestionDto, String testKey);
    boolean saveSector(TendencyResponse tendencyResponse);
    //TendencyResponse findTendencyResponse();


}
