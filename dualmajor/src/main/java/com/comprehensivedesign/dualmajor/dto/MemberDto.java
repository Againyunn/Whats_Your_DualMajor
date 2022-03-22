package com.comprehensivedesign.dualmajor.dto;


import com.comprehensivedesign.dualmajor.domain.Type;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto { //데이터 저장 및 전송을 위한 데이터 처리 클래스
    /*폼으로 읽은 데이터를 이 DTO(Data Transfer Object에 저장하여 사용하게 된다.*/

    //회원 이름(닉네임)
    private String name;
    //회원 이메일(학교이메일?)
    private String email;
    //회원 비밀번호
    private String password;
    //회원 본전공(제 1전공)
    private String firstMajor;
    //회원 학년
    private int grade;
    //회원 유형(멘토 or 멘티)
    private Type type;
    //서비스 내 회원 지위
    private String role;
}
