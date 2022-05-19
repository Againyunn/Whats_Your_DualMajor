package com.comprehensivedesign.dualmajor.domain.secondSection;


import com.comprehensivedesign.dualmajor.domain.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "MEMBER_FINAL_RESULT")
public class MemberFinalResult {
    @Id @GeneratedValue
    private Long id;
    @OneToOne
    @JoinColumn(name = "member_Id")
    private Member member;
    private String resultType;

    /*객체 생성 로직*/
    public void createMemberFinalResult(Member member, String resultType) {
        this.member = member;
        this.resultType = resultType;
    }
}
