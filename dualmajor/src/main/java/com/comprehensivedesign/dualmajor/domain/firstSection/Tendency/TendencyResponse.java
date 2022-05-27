package com.comprehensivedesign.dualmajor.domain.firstSection.Tendency;


import com.comprehensivedesign.dualmajor.domain.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "TENDENCY_RESPONSE")
public class TendencyResponse {//회원의 응답 결과 저장
    @Id
    @GeneratedValue
    private Long id;
    //저장할 회원 객체 참조
    @Column(name="tendency_response_testKey")
    private String testKey;
    //mbti 점수
    private int mbtiScore;
    //mbti판별 로직에 의한 mbti
    private String mbti;
    //응답 결과에 따른 결과 리스트(매 응답마다 업데이트)
    private String q14;
    private String q15;
    private String q16;

   /* @OneToMany
    private List<TendencyResult> results; //성향 질문 결과 테이블 단순 참조 .. 일대다 단방향 관계*/

    /*회원 응답 객체 메서드*/
    public void createMemberResponse(String testKey) {
        this.testKey = testKey;
        this.mbti="";
        this.mbtiScore = 0;
    }
    /*성향 질문 마친 후 mbti연산 후 업데이트에 사용될 메서드*/
    public void setMbti(String mbti) {
        this.mbti = mbti;
    }

    /*회원 mbti 점수 저장 로직*/
    public void setMbtiScoreLogic(int mbtiScore) {
        this.mbtiScore += mbtiScore;
    }

    public void clearMbtiScore() {
        this.mbtiScore = 0;
    }
}



