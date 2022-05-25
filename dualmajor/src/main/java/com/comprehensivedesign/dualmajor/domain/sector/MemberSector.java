package com.comprehensivedesign.dualmajor.domain.sector;

import com.comprehensivedesign.dualmajor.domain.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "MEMBER_SECTOR")
public class MemberSector {
    @Id @GeneratedValue
    private Long id;
    //하나의 회원 : 하나의 섹터로 행 구성
    private String testKey;
    @OneToOne
    @JoinColumn(name="sector_id")
    private Sector sector;

    /*회원에게 추천된 섹터 보관S 메서드*/
    public void saveSector(String testKey, Sector sector) {
        this.testKey = testKey;
        this.sector = sector;
    }



}
