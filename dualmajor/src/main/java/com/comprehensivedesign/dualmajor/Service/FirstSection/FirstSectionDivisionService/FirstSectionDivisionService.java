package com.comprehensivedesign.dualmajor.Service.FirstSection.FirstSectionDivisionService;

public interface FirstSectionDivisionService {
    /*회원의 응답 찾기*/
    String findResponse(String testKey);

    /*회원의 응답 생성*/
    void createResponse(String testKey, String q1) throws Exception;

    /*회원의 응답 업데이트*/
    void updateResponse(String testKey, String q1) throws Exception;
}
