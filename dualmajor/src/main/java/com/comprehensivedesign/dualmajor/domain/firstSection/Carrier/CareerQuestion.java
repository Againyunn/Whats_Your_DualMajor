package com.comprehensivedesign.dualmajor.domain.firstSection.Carrier;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "CAREER_QUESTION")
public class CareerQuestion {

    @Id
    @GeneratedValue
    private Long id;
    //질문 번호
    private String questionNum;
    //사용자가 읽을 질문 내용
    private String questionContent;
    //사용자가 읽을 응답1
    private String response1;
    //사용자가 읽을 응답2
    private String response2;
}
