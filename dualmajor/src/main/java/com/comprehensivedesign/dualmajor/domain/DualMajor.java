package com.comprehensivedesign.dualmajor.domain;


import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "DUAL_MAJOR")
public class DualMajor {

    @Id @GeneratedValue
    private Long id;
    private String majorName; //전공명
    private String campus; //서울vs글로벌
    @ManyToOne //하나의 이중전공은 하나의 섹터를 가지고, 하나의 섹터는 여러 이중전공을 포함함.
    @JoinColumn(name="sector_id") //섹터 테이블 참조하는 FK
    private Sector sector; //해당되는 섹터
    private String totalNum;

}
