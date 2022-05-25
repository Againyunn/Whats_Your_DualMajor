package com.comprehensivedesign.dualmajor.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SecondSectionQuestionDto {

    private String testKey;
    private Long sectorId;
    private int questionNum;
    private String questionContent;
    private int questionId;
    private int leftQuestions;
    private String answer;

    private String academicName; //프론트에서 넘어오는 sectorName

    private String resultType;


}
