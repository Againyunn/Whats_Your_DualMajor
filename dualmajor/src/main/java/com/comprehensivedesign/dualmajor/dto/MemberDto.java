package com.comprehensivedesign.dualmajor.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashMap;
import java.util.Map;

@Getter
@Setter
public class MemberDto { //데이터 저장 및 전송을 위한 데이터 처리 클래스
    /*도메인 클래스를 직접 주고받으면 그 과정에서 불필요한 데이터 처리가 될 수 있고, 엔티티 객체가 움직이는 것이기에 주요한 정보가 노출 될 수 있다.
    * 따라서 데이터 전송만을 목적으로 하는 캡슐화 된 데이터 캡슐처럼 사용하는 것이라 생각하면 될듯*/
    /*Spring의 MVC 패턴에서, Controller가 view와 model 사이에서 데이터를 주고받을 때 DTO를 주로 사용한다.
    * DTO에는 엔티터의 모든 정보를 담는 것이 아닌, 필요한 정보만을 취급하여 전송할 수 있다.*/

    private String id; //프론트에서 넘어오는 아이디의 변수명("id")
    //회원 이름(닉네임)
    private String nickName;
    //회원 학번/사번
    private String stdNum;
    //회원 이메일(학교이메일?)
    private String email;
    //회원 비밀번호
    private String password;

    private String firstMajor;
    //회원 본전공(제 1전공)
    private String firstMajorId;
    //회원 이중/부전공(제 2전공)
    private String dualMajor;

    private String dualMajorId;
    //회원 학년
    private String grade;
    //회원 유형(멘토 or 멘티)
    private String userType;

    private String user;

    private String testKey;

    private String resultType;

    private Double gpa;

    /*===majorId type parsint(String->Long)===*/
    /*Json으로 넘어오는 majorId(String)을 회원 DB에 저장할 때에는 Long타입으로 넣어줘야 함.
     * 해당 데이터로 전공 테이블에 접근이 가능하기 때문*/
    /*이 DTO에서 전공 Id에 대한 타입 변환(Long->String, String->Long)은 모두 이루어주기에 비즈니스 로직에서는 신경 쓰지 않고 개발 가능*/

    public Long getFirstMajorId() {
        return Long.parseLong(this.firstMajorId);
    }

    public Long getDualMajorId() {
        return Long.parseLong(this.dualMajorId);
    }

    public void setLoginInfo(String nickName, String stdNum, String firstMajor, Long firstMajorId, String dualMajor, Long dualMajorId, String grade, String userType) {
        this.nickName = nickName;
        this.stdNum = stdNum;
        this.firstMajor = firstMajor;
        this.firstMajorId = Long.toString(firstMajorId); //DB의 Long형태 -> Json의 String 형태
        this.dualMajor = dualMajor;
        this.dualMajorId = Long.toString(dualMajorId);
        this.grade = grade;
        this.userType = userType;
    }
    public Map getLoginInfo() {
        LinkedHashMap<String, Object> map = new LinkedHashMap<>();
        map.put("id", stdNum);
        map.put("nickName", nickName);
        map.put("grade", grade);
        map.put("userType", userType);
        map.put("firstMajorId", firstMajorId);
        map.put("dualMajorId", dualMajorId);
        map.put("firstMajor",firstMajor);
        map.put("dualMajor",dualMajor);
        return map;
    }
    /*회원 수정 API*/
    public void setEditInfo(String stdNum) {
        this.stdNum = stdNum;
    }
    public Map getEditInfo() {
        LinkedHashMap<String, Object> map = new LinkedHashMap<>();
        map.put("is_success", true);
        map.put("stdNum", stdNum);
        return map;
    }

}
