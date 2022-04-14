package com.comprehensivedesign.dualmajor.domain;


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
/*    @OneToMany(mappedBy = "dualMajorId")
    private List<Member> members = new ArrayList<>();*/
}
