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
    @Column(name="member_final_result_testKey")
    private String testKey;
    private String resultType;

    /*객체 생성 로직*/
    public void createMemberFinalResult(String testKey, String resultType) {
        this.testKey = testKey;
        this.resultType = resultType;
    }
}
