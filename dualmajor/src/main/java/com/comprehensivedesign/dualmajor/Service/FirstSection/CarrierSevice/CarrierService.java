package com.comprehensivedesign.dualmajor.Service.FirstSection.CarrierSevice;

import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CareerResponse;
import com.comprehensivedesign.dualmajor.dto.FirstSectionQuestionDto;

public interface CarrierService {
    /*사용자 응답 처리 로직*/
    String resultProcess(FirstSectionQuestionDto firstSectionQuestionDto, String testKey);
    /*사용자 성향 관련 응답 mbti 판별 로직*/
    String mbtiProcess(FirstSectionQuestionDto firstSectionQuestionDto, String testKey);
    /*사용자 응답을 통한 결과 섹터 도출 로직*/
    boolean saveSector(CareerResponse careerResponse);
}
