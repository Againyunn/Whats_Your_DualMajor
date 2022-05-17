package com.comprehensivedesign.dualmajor.Service.SecondSection;

import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.SecondSectionDto;

import java.util.Map;

public interface SecondSectionService {
    SecondSectionResponse createResponse(int leftQuestions, Member member, Sector sector);
    Map recommendProcess(SecondSectionDto secondSectionDto, Member member);

}
