package com.comprehensivedesign.dualmajor.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashMap;
import java.util.Map;

@Getter
@Setter
public class FirstSectionQuestionDto {

    //질문 번호
    private String questionNum;
    //사용자가 읽을 질문 내용
    private String questionContent;
    //사용자가 읽을 응답1
    private String response1;
    //사용자가 읽을 응답2
    private String response2;
    //특정 질문에 대해 사용자가 고른 답변
    private String answer;

    public void setQuestionData(String questionNum, String questionContent, String response1, String response2) {
        this.questionNum = questionNum;
        this.questionContent = questionContent;
        this.response1 = response1;
        this.response2 = response2;
    }
    public Map getQuestionData() {
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        map.put("questionNum", questionNum);
        map.put("questionContent", questionContent);
        map.put("response1", response1);
        map.put("response2", response2);
        return map;
    }

}
