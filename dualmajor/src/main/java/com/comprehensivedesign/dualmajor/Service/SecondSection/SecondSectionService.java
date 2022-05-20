package com.comprehensivedesign.dualmajor.Service.SecondSection;

import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.FinalResult;
import com.comprehensivedesign.dualmajor.dto.SecondSectionQuestionDto;

import java.util.List;
import java.util.Map;

public interface SecondSectionService {
    SecondSectionResponse createResponse(Member member, String sectorName);
    Map recommendProcess(SecondSectionQuestionDto secondSectionDto, Member member);
    String binaryTree(String answer, Long memberId);
    Map viewCollegeQuestions(String totalQuestionNum, int leftQuestions, int questionNum);
    Map viewQuestions(String sectorName, int questionId, String totalQuestionNum, int leftQuestions, int questionNum);
    String saveCollegeAnswer(SecondSectionQuestionDto secondSectionQuestionDto, Long memberId);
    Map<String, Object> viewResult(Long id);
}
