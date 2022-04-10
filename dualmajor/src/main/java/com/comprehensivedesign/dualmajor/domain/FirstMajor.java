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
public class FirstMajor {

    @Id @GeneratedValue
    private Long id; //제1전공 테이블의 PK

    private String majorName; //전공명

    /*@OneToMany(mappedBy = "firstMajorId")
    private List<Member> members = new ArrayList<>();*/

}
