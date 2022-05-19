package com.comprehensivedesign.dualmajor.domain.sector;


import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Primary;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "SECTOR")
public class Sector {
    @Id @GeneratedValue
    @Column(name = "sector_id")
    private Long id;
    private String sectorName;
}
