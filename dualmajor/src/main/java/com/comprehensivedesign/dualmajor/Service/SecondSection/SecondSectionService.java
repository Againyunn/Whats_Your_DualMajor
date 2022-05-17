package com.comprehensivedesign.dualmajor.Service.SecondSection;

import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.SecondSectionQuestionDto;

import java.util.Map;

public interface SecondSectionService {
    SecondSectionResponse createResponse(Member member, Long sectorId);
    void recommendProcess(SecondSectionQuestionDto secondSectionDto, Member member);
    SecondSectionResponse binaryTree(String answer, Long memberId);
    Map viewQuestions(Long sectorId, int questionId);

}
