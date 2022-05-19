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
@Table(name = "MAJOR_DETAIL")
public class MajorDetail {
    @Id @GeneratedValue
    private Long id;
    private String majorName;
    private String webpage;
    private String information;
    private String career;
    private String curriculum;
    private String certification;
    private String degree;
    private String resultType;
    private String campus;
}
