package com.comprehensivedesign.dualmajor.domain;


import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class DualMajor {

    @Id
    @GeneratedValue
    private Long id;

    private String majorName; //전공명
}
