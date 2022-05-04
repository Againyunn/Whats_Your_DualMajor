package com.comprehensivedesign.dualmajor.domain.Tendency;


import com.comprehensivedesign.dualmajor.domain.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class TendencyResponse {//회원의 응답 결과 저장
    @Id @GeneratedValue
    private Long id;
    //저장할 회원 객체 참조
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
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
    public void createMemberResponse(Member member) {
        this.member = member;
        this.mbtiScore = 0;
    }


    /*성향 질문 마친 후 mbti연산 후 업데이트에 사용될 메서드*/
    //성향 질문을 모두 마치면 질문의 응답들을 모아둔 tendency 리스트에를 통해 mbti를 산출하게 되는데,
    //이 작업으로 mbti가 산출되면 mbti 산출을 목적으로 두었던 tendency리스트는 쓸모 없어지게 된다.
    //또한 산출된 mbti로 한 번 성향 우선 결과지에서 같은 mbti를 갖는 행들을 걸러내고 걸러져 나온 tendency result 객체들을 리스트 형태로 저장
    public void setMbti(String mbti) {
        this.mbti = mbti;
    }
    /*진로 질문 마다 업데이트에 사용될 메서드*/
   /* //성향 관련 질문 마치면 저장된 성향 관련 응답에 의해 mbti가 산출되는데, 이로 인해 tendency result에서 mbti가 같은 행(객체)만 추려내게 된다.
    //그 후 진로 질문에 의한 응답 마다 같은 응답 결과를 갖는 결과 행을 추려내는 작업
    public void whileCarrier(ArrayList results) {
        this.results = results;
    }*/

    /*회원 mbti 점수 저장 로직*/
    public void setMbtiScoreLogic(int mbtiScore) {
        this.mbtiScore += mbtiScore;
    }

    public void clearMbtiScore() {
        this.mbtiScore = 0;
    }
}



