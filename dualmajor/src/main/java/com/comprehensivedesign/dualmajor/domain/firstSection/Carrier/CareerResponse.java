package com.comprehensivedesign.dualmajor.domain.firstSection.Carrier;

import com.comprehensivedesign.dualmajor.domain.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "CAREER_RESPONSE")
public class CareerResponse {
    @Id
    @GeneratedValue
    private Long id;
    //저장할 회원 객체 참조
    @Column(name="career_response_testKey")
    private String testKey;
    //mbti판별 로직에 의한 mbti
    private String mbti;
    //응답 결과에 따른 결과 리스트
    private String q6;
    private String q7;
    private String q8;
    private String q9;
    private String q10;
    private String q11;
    private String q12;

    /*회원 응답 객체 메서드*/
    public void createMemberResponse(String testKey) {
        this.testKey = testKey;
        this.mbti="";
    }
    /*성향 질문 마친 후 mbti연산 후 업데이트에 사용될 메서드*/
    public void setMbti(String mbti) {
        this.mbti = mbti;
    }

}
