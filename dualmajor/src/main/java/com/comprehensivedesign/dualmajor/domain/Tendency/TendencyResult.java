package com.comprehensivedesign.dualmajor.domain.Tendency;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class TendencyResult { //응답 결과들에 따른 섹터 구분

    @Id @GeneratedValue
    private Long id;
    //성향
    private String mbti;
    //14번 질문
    private String q14;
    //15번 질문
    private String q15;
    //16번 질문
    private String q16;
    //결과 응답들에 해당하는 섹터
    private String sector;
}
