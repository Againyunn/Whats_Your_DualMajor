package com.comprehensivedesign.dualmajor.Service.TendencyService;

import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.TendencyDto;

import java.util.List;
import java.util.Map;

public interface TendencyService {
    boolean resultProcess(TendencyDto tendencyDto, Long memberId);
    String mbtiProcess(TendencyDto tendencyDto, Long memberId);
    boolean saveSector(TendencyResponse tendencyResponse);
    List<Sector> findMemberSector(Long memberId) throws Exception;
    Map<Long, List> findDualMajor(Long memberId) throws Exception;

}
