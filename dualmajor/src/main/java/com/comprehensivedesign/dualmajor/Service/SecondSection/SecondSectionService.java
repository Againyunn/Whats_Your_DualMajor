package com.comprehensivedesign.dualmajor.Service.SecondSection;

import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.FinalResult;
import com.comprehensivedesign.dualmajor.dto.SecondSectionQuestionDto;

import java.util.List;
import java.util.Map;

public interface SecondSectionService {
    SecondSectionResponse createResponse(String testKey, String sectorName);
    Map recommendProcess(SecondSectionQuestionDto secondSectionDto, String testKey);
    String binaryTree(String answer, String testKey);
    Map viewCollegeQuestions(String testKey, String totalQuestionNum, int leftQuestions, int questionNum);
    Map viewQuestions(String testKey, String sectorName, int questionId, String totalQuestionNum, int leftQuestions, int questionNum);
    String saveCollegeAnswer(SecondSectionQuestionDto secondSectionQuestionDto, String testKey);
    Map<String, Object> viewResult(String testKey);
}
