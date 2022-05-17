package com.comprehensivedesign.dualmajor.Service.SecondSection;


import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.SecondSectionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class SecondSectionServiceImpl implements SecondSectionService{



    @Override
    public SecondSectionResponse createResponse(int leftQuestions, Member member, Sector sector) {
        return null;
    }

    @Override
    public Map recommendProcess(SecondSectionDto secondSectionDto, Member member) {
        return null;
    }
}
