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
@Table(name = "TECH_RESULT")
public class TechResult {
    @Id @GeneratedValue
    private Long id;
    private String questionId;
    private String resultType;
}
