package com.comprehensivedesign.dualmajor.domain.secondSection;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class HumanityResult {
    @Id @GeneratedValue
    private Long id;
}
