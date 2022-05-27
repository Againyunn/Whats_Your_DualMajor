package com.comprehensivedesign.dualmajor.domain.secondSection;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "MAJOR_DETAIL")
public class MajorDetail {
    @Id @GeneratedValue
    private Long id;
    private String majorName;
    private String webpage;
    @Column(length = 1000)
    private String information;
    private String career;
    @Column(length = 1000)
    private String curriculum;
    private String certification;
    private String degree;
    private String resultType;
    private String campus;
    private String phoneNum;
}
