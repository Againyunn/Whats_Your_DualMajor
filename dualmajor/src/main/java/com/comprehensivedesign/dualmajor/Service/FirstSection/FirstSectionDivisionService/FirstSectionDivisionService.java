package com.comprehensivedesign.dualmajor.Service.FirstSection.FirstSectionDivisionService;

public interface FirstSectionDivisionService {
    /*회원의 응답 찾기*/
    String findResponse(Long memberId);

    /*회원의 응답 생성*/
    void createResponse(Long memberId, String q1) throws Exception;

    /*회원의 응답 업데이트*/
    void updateResponse(Long memberId, String q1) throws Exception;
}
