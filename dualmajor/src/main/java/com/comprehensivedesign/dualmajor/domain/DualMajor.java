package com.comprehensivedesign.dualmajor.domain;


import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class DualMajor {

    @Id @GeneratedValue
    private Long id;
    private String majorName; //전공명
    private String campus; //서울vs글로벌
    private Sector sector; //해당되는 섹터

}
