package com.comprehensivedesign.dualmajor.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class SaveFinalResultDto {

    private String departmentName;
    private String user;
    //private Map user;
    private String testKey;

    private String stdNum;
    private String email;
}
