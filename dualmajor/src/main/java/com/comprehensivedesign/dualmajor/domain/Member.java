package com.comprehensivedesign.dualmajor.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

//@Setter --> Entity는 외부로부터 절대 보존되어야하기 때문에 최대한 setter사용 제한
@Entity
@Getter
public class Member {
    //식별번호, PK
    @Id @GeneratedValue //자동 증가시켜준다는 의미
    private Long id;
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
