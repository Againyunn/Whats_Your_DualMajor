package com.comprehensivedesign.dualmajor.domain.firstSection.Carrier;

import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "CAREER_RESULT")
public class CarееrResult {
    @Id
    @GeneratedValue
    private Long id;
    //성향
    private String mbti;
    //6번 질문
    private String q6;
    //7번 질문
    private String q7;
    //8번 질문
    private String q8;
    //9번 질문
    private String q9;
    //10번 질문
    private String q10;
    //11번 질문
    private String q11;
    //12번 질문
    private String q12;
    //결과 응답들에 해당하는 섹터
    @OneToOne
    @JoinColumn(name="sector_id")
    private Sector sector;
}
