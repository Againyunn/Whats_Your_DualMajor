package com.comprehensivedesign.dualmajor.domain;


import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CareerResponse;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import com.comprehensivedesign.dualmajor.domain.secondSection.MemberFinalResult;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "SURVEY")
public class Survey {

    @Id @GeneratedValue
    private Long id;
    private String question1;
    private String question2;
    private String question3;
    private String question4;
    private String question5;
    private String question6;
    private String question7;
    private String starCount;
    @OneToOne
    @JoinColumn(name="tendency_response_testKey")
    private TendencyResponse tendencyResponse;
    @OneToOne
    @JoinColumn(name="career_response_testKey")
    private CareerResponse careerResponse;
    @OneToOne
    @JoinColumn(name="member_final_result_testKey")
    private MemberFinalResult memberFinalResult;

    /*설문 응답 정보 생성 로직*/
    public void createSurveyResponse(String question1, String question2, String question3, String question4,
                                      String question5, String question6, String question7, String starCount,
                                      TendencyResponse tendencyResponse, CareerResponse careerResponse,
                                     MemberFinalResult memberFinalResult) {
        this.question1 = question1;
        this.question2 = question2;
        this.question3 = question3;
        this.question4 = question4;
        this.question5 = question5;
        this.question6 = question6;
        this.question7 = question7;
        this.starCount = starCount;
        this.tendencyResponse = tendencyResponse;
        this.careerResponse = careerResponse;
        this.memberFinalResult = memberFinalResult;
    }


}
