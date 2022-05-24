package com.comprehensivedesign.dualmajor.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="CANNOT")
public class Cannot {
    @Id @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "first_major_id")
    private FirstMajor firstMajor;
    @ManyToOne
    @JoinColumn(name = "dual_major_id")
    private DualMajor dualMajor;

}
