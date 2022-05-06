package com.comprehensivedesign.dualmajor.Service.TendencyService;

import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.FirstSectionQuestionDto;

import java.util.List;
import java.util.Map;

public interface TendencyService {
    boolean resultProcess(FirstSectionQuestionDto firstSectionQuestionDto, Long memberId);
    String mbtiProcess(FirstSectionQuestionDto firstSectionQuestionDto, Long memberId);
    boolean saveSector(TendencyResponse tendencyResponse);
    List<Sector> findMemberSector(Long memberId) throws Exception;
    Map<Long, List> findDualMajor(Long memberId) throws Exception;

}
