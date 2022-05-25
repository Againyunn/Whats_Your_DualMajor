package com.comprehensivedesign.dualmajor.Service.FirstSection.MemberSector;

import com.comprehensivedesign.dualmajor.domain.sector.Sector;

import java.util.List;

public interface MemberSectorService {

    List<Sector> findMemberSector(String testKey) throws Exception;
}
