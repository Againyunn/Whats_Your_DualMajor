package com.comprehensivedesign.dualmajor.dto;


import com.comprehensivedesign.dualmajor.domain.Type;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class MemberDto { //데이터 저장 및 전송을 위한 데이터 처리 클래스
    /*도메인 클래스를 직접 주고받으면 그 과정에서 불필요한 데이터 처리가 될 수 있고, 엔티티 객체가 움직이는 것이기에 주요한 정보가 노출 될 수 있다.
    * 따라서 데이터 전송만을 목적으로 하는 캡슐화 된 데이터 캡슐처럼 사용하는 것이라 생각하면 될듯*/
    /*Spring의 MVC 패턴에서, Controller가 view와 model 사이에서 데이터를 주고받을 때 DTO를 주로 사용한다.
    * DTO에는 엔티터의 모든 정보를 담는 것이 아닌, 필요한 정보만을 취급하여 전송할 수 있다.*/

    //회원 이름(닉네임)
    private String name;
    //회원 이메일(학교이메일?)
    private String email;
    //회원 학번/사번
    private String stdNum;
    //회원 비밀번호
    private String password;
    //회원 본전공(제 1전공)
    private String firstMajor;
    //회원 이중/부전공(제 2전공)
    private String dualMajor;
    //회원 학년
    private String grade;
    //회원 유형(멘토 or 멘티)
    private String type;



    public void setLoginInfo(String name, String stdNum, String firstMajor, String dualMajor, String grade, String type) {
        this.name = name;
        this.stdNum = stdNum;
        this.firstMajor = firstMajor;
        this.dualMajor = dualMajor;
        this.grade = grade;
        this.type = type;

    }

    public Map getLoginInfo() {
        HashMap<Object, Object> map = new HashMap<>();
        map.put("name", name);
        map.put("stdNum", stdNum);
        map.put("firstMajor", firstMajor);
        map.put("dualMajor", dualMajor);
        map.put("grade", grade);
        map.put("type", type);
        return map;
    }
}
