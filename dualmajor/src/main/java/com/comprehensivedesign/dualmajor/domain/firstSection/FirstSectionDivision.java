package com.comprehensivedesign.dualmajor.domain.firstSection;


import com.comprehensivedesign.dualmajor.domain.Member;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.EnableLoadTimeWeaving;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "FIRST_SECTION_DIVISION")
public class FirstSectionDivision {
    @Id @GeneratedValue
    private Long id;
    private String testKey; //회원 참조FK
    private String q1; //성향 vs 진로 구분지을 첫번째 질문

    /*객체 생성 메서드*/
    public void createFirstSectionDivision(String testKey, String q1) {
        this.testKey = testKey;
        this.q1 = q1;
    }
    /*객체 수정 메서드*/
    public void updateFirstSectionDivision(String q1) {
        this.q1 = q1;
    }

}
