package com.comprehensivedesign.dualmajor.domain.secondSection;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "COLLEGE_QUESTION")
public class CollegeQuestion {
    @Id @GeneratedValue
    private Long id;
    private String questionContent;
    private String response1;
    private String response2;
}
