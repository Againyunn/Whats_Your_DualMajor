package com.comprehensivedesign.dualmajor.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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
    //회원 학번.사번
    private String stdNum;
    //회원 본전공(제 1전공)
    private String firstMajor;
    //회원 이중전공
    //멘토 : 현재 이중전공
    //멘티 : 희망 이중전공
    private String dualMajor;
    //회원 학년
    private String grade;
    //회원 유형(멘토 or 멘티)
    //@Enumerated(EnumType.STRING)
    //private Type type;
    private String type;
    //서비스 내 회원 지위
    private String role;

    //Getter
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstMajor() {
        return firstMajor;
    }

    public String getGrade() {return grade;}

    /*public Type getType() {
        return type;
    }*/
    public String getRole() {
        return role;
    }

    /*Member 저장 로직*/
    public void CreateMember(String name, String email, String password, String stdNum, String firstMajor, String dualMajor,String grade, String type) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.stdNum = stdNum;
        this.firstMajor = firstMajor;
        this.dualMajor = dualMajor;
        this.grade = grade;
        this.role = "ROLE_USER";
        this.type = type;
    }
}
