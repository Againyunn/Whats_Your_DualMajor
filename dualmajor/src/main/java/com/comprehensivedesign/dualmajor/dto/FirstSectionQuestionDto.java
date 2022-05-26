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
    //총 질문 수
    private String totalQuestionNum;
    //사용자가 읽을 질문 내용
    private String questionContent;
    //사용자가 읽을 응답1
    private String response1;
    //사용자가 읽을 응답2
    private String response2;
    //특정 질문에 대해 사용자가 고른 답변
    private String answer;
    //testKey
    private String testKey;

    public void setQuestionData(String testKey, String questionNum, String totalQuestionNum, String questionContent, String response1, String response2) {
        this.testKey = testKey;
        this.questionNum = questionNum;
        this.totalQuestionNum = totalQuestionNum;
        this.questionContent = questionContent;
        this.response1 = response1;
        this.response2 = response2;
    }
    public Map getQuestionData() {
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        map.put("testKey", testKey);
        map.put("questionNum", questionNum);
        map.put("totalQuestionNum", totalQuestionNum);
        map.put("questionContent", questionContent);
        map.put("response1", response1);
        map.put("response2", response2);
        return map;
    }

}
