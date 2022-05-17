package com.comprehensivedesign.dualmajor.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SecondSectionQuestionDto {

    private Long sectionId;
    private String questionContent;
    private int questionId;
    private int leftQuestions;
    private String answer;


}
