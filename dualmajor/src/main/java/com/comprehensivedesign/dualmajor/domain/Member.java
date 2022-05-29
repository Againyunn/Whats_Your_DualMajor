package com.comprehensivedesign.dualmajor.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

//@Setter --> Entity는 외부로부터 절대 보존되어야하기 때문에 최대한 setter사용 제한
@Entity
@Getter
@Table(name = "MEMBER")
public class Member {
    //식별번호, PK
    @Id
    @GeneratedValue //자동 증가시켜준다는 의미
    @Column(name = "member_id")
    private Long id;
    //회원 이름(닉네임)
    private String nickName;
    //회원 이메일(학교이메일?)
    private String email;
    //회원 비밀번호
    private String password;
    //회원 학번.사번
    private String stdNum;
    //회원 본전공(제 1전공)
    @ManyToOne//다대일 관계 (여러 회원은 하나의 본전공을 가질 수 있고, 하나의 본전공을 수강하는 여러 회원이 있을 수 있다.)
    @JoinColumn(name = "firstMajor_id") //firstMajor의 id(PK)를 참조함.
    private FirstMajor firstMajor; //FK , 학과의 이름은 부르는 학생마다 차이가 있을 수 있으므로 firstMajorId를 입력받도록 함
    //회원 이중전공
    //멘토 : 현재 이중전공
    //멘티 : 희망 이중전공
    @ManyToOne//다대일 관계 (여러 회원은 하나의 이중전공을 가질 수 있고, 하나의 이중전공을 수강하는 여러 회원이 있을 수 있다.)
    @JoinColumn(name = "dualMajor_id") //dualMajor의 id(PK)를 참조함.
    private DualMajor dualMajor; //FK , 학과의 이름은 부르는 학생마다 차이가 있을 수 있으므로 firstMajorId를 입력받도록 함
    //회원 학년
    private String grade;
    //회원 유형(멘토 or 멘티)
    private String userType;
    //서비스 내 회원 지위
    private String role;
    //회원 학점
    private Double gpa;

    //Getter
    public Long getId() {
        return id;
    }

    public String getName() {
        return nickName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public FirstMajor getFirstMajor() {
        return firstMajor;
    }

    public DualMajor getDualMajor() {
        return dualMajor;
    }

    public String getGrade() {
        return grade;
    }

    public String getType() {
        return userType;
    }

    public String getRole() {
        return role;
    }

    /*Member 저장 로직*/
    public void CreateMember(String nickName, String email, String password, String stdNum, FirstMajor firstMajor, DualMajor dualMajor, String grade, String userType, Double gpa) {
        this.nickName = nickName;
        this.email = email;
        this.password = password;
        this.stdNum = stdNum;
        this.firstMajor = firstMajor;
        this.dualMajor = dualMajor;
        this.grade = grade;
        this.role = "ROLE_USER";
        this.userType = userType;
        this.gpa = gpa;
    }

    /*Member 수정 로직*/
    public void updateMember(String nickName, String password, String stdNum, FirstMajor firstMajor, DualMajor dualMajor, String grade, String userType, Double gpa) {
        this.nickName = nickName;
        this.password = password;
        this.stdNum = stdNum;
        this.firstMajor = firstMajor;
        this.dualMajor = dualMajor;
        this.grade = grade;
        this.userType = userType;
        this.gpa = gpa;
    }

    /*Member 비밀번호 재설정 로직*/
    public void editPassword(String password) {
        this.password = password;
    }
}

