package com.comprehensivedesign.dualmajor.domain.secondSection;

import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class SecondSectionResponse {
    @Id @GeneratedValue
    private Long id;
    //현재 위치해있는 노드 id
    private int questionId;
    //남아있는 질문의 수
    private int leftQuestions;
    @OneToOne //한명의 회원은 하나의 응답지를 갖고, 하나의 응답지는 한명의 회원의 것임
    @JoinColumn(name = "member_id")
    private Member member;
    @OneToOne //하나의 응답지에는 하나의 섹터가 온다.
    @JoinColumn(name = "sector_id")
    private Sector sector;

    /*응답지 생성*/
    public void createResponse(int leftQuestions, Member member, Sector sector) {
        this.questionId = 1;
        this.leftQuestions = leftQuestions;
        this.member = member;
        this.sector = sector;
    }

    /*응답지 업데이트*/
    public void updateResponse(int questionId, int leftQuestions) {
        this.questionId = questionId;
        this.leftQuestions = leftQuestions;
    }
}
