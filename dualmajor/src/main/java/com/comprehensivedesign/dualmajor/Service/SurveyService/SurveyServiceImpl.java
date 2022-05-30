package com.comprehensivedesign.dualmajor.Service.SurveyService;

import com.comprehensivedesign.dualmajor.domain.Survey;
import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CareerResponse;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import com.comprehensivedesign.dualmajor.domain.secondSection.MemberFinalResult;
import com.comprehensivedesign.dualmajor.dto.SurveyDto;
import com.comprehensivedesign.dualmajor.repository.SurveyRepository;
import com.comprehensivedesign.dualmajor.repository.firstSection.carrier.CareerResponseRepository;
import com.comprehensivedesign.dualmajor.repository.firstSection.tendency.TendencyResponseRepository;
import com.comprehensivedesign.dualmajor.repository.secondSection.MemberFinalResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService{

    @Autowired private final SurveyRepository surveyRepository;
    @Autowired private final TendencyResponseRepository tendencyResponseRepository;
    @Autowired private final CareerResponseRepository careerResponseRepository;
    @Autowired private final MemberFinalResultRepository memberFinalResultRepository;

    @Override
    @Transactional
    public void saveSurvey(SurveyDto surveyDto) {
        Survey survey = new Survey();
        TendencyResponse tendencyResponse = tendencyResponseRepository.findByTestKey(surveyDto.getTestKey());
        CareerResponse careerResponse = careerResponseRepository.findByTestKey(surveyDto.getTestKey());
        MemberFinalResult memberFinalResult = memberFinalResultRepository.findByTestKey(surveyDto.getTestKey());
        survey.createSurveyResponse(surveyDto.getQuestion1(), surveyDto.getQuestion2(), surveyDto.getQuestion3(), surveyDto.getQuestion4(), surveyDto.getQuestion5(), surveyDto.getQuestion6(), surveyDto.getQuestion7(), surveyDto.getStarCount(), tendencyResponse, careerResponse, memberFinalResult);
        surveyRepository.save(survey);
    }
}
