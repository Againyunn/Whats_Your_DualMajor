package com.comprehensivedesign.dualmajor.domain.sector;

import com.comprehensivedesign.dualmajor.domain.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MemberSector {
    @Id @GeneratedValue
    private Long id;
    //하나의 회원 : 하나의 섹터로 행 구성
    @OneToOne
    @JoinColumn(name="member_id")
    private Member member;
    @OneToOne
    @JoinColumn(name="sector_id")
    private Sector sector;

    /*회원에게 추천된 섹터 보관 메서드*/
    public void saveSector(Member member, Sector sector) {
        this.member = member;
        this.sector = sector;
    }



}
