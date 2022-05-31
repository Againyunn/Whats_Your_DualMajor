package com.comprehensivedesign.dualmajor.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyDto {

    //지원 정보 확인  요청 시 넘어오는 학과 명
    private String name;
    //지원 정보 확인  요청 시 넘어오는 학과 명
    private String stdNum;
    //지원 여부
    private boolean apply; //true -> 지원하기 , false ->


}
