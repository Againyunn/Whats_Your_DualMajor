package com.comprehensivedesign.dualmajor.domain.secondSection;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "LANGUAGE_QUESTION")
public class LanguageQuestion {
    @Id
    @GeneratedValue
    private Long id;
    private String questionContent;
    private String response1;
    private String response2;

}
