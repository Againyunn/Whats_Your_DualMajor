package com.comprehensivedesign.dualmajor.domain.firstSection.Tendency;


import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "TENDENCY_RESULT")
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
    @OneToOne
    @JoinColumn(name="sector_id")
    private Sector sector;
}
