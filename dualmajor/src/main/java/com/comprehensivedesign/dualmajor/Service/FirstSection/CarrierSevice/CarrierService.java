package com.comprehensivedesign.dualmajor.Service.FirstSection.CarrierSevice;

import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierResponse;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import com.comprehensivedesign.dualmajor.dto.FirstSectionQuestionDto;

public interface CarrierService {
    /*사용자 응답 처리 로직*/
    boolean resultProcess(FirstSectionQuestionDto firstSectionQuestionDto, Long memberId);
    /*사용자 성향 관련 응답 mbti 판별 로직*/
    String mbtiProcess(FirstSectionQuestionDto firstSectionQuestionDto, Long memberId);
    /*사용자 응답을 통한 결과 섹터 도출 로직*/
    boolean saveSector(CarrierResponse carrierResponse);
}
