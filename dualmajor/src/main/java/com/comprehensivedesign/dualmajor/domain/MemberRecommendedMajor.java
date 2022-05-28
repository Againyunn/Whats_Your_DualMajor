package com.comprehensivedesign.dualmajor.domain;


import com.comprehensivedesign.dualmajor.domain.secondSection.MajorDetail;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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
        this.applyDate = LocalDateTime.now();
    }

}
