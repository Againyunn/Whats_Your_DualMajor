package com.comprehensivedesign.dualmajor.domain;


import com.comprehensivedesign.dualmajor.domain.secondSection.MajorDetail;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MemberRecommendedMajor {

    @Id @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "major_detail_id")
    private MajorDetail majorDetail;//하나의 추천 학과는 여러 추천 학과를 가질 수 있고, 하나의 추천 학과는 여러 회원-추천학과를 가질 수 있음
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member; //하나의 회원-추천 학과는 하나의 회원을 가지고, 하나의 회원은 여러 회원-추천학과 가질 수 있음

    /*회원 추천 학과 저장 로직*/
    public void createMemberRecommendedMajor(MajorDetail majorDetail, Member member) {
        this.member = member;
        this.majorDetail = majorDetail;

    }

}
