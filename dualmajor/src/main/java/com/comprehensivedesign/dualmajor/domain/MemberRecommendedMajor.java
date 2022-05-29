package com.comprehensivedesign.dualmajor.domain;


import com.comprehensivedesign.dualmajor.domain.secondSection.MajorDetail;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name="MEMBER_RECOMMENDED_MAJOR")
public class MemberRecommendedMajor {

    @Id @GeneratedValue
    private Long id;
    private String majorName;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member; //하나의 회원-추천 학과는 하나의 회원을 가지고, 하나의 회원은 여러 회원-추천학과 가질 수 있음

    private LocalDateTime applyDate;

    /*회원 추천 학과 저장 로직*/
    public void createMemberRecommendedMajor(String majorName, Member member) {
        this.member = member;
        this.majorName  = majorName;
        //SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 날짜 데이터 포맷을 정함
        this.applyDate = LocalDateTime.now(); // 정해진 날짜 데이터 포맷에 맞게 시간을 가져와서 적용함(String)
    }

}
