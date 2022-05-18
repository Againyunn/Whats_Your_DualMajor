package com.comprehensivedesign.dualmajor.domain.sector;


import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Primary;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "SECTOR")
public class Sector {
    @Id @GeneratedValue
    private Long id;
    private String sectorName;
}
