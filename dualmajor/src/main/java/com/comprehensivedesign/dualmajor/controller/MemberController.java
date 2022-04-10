package com.comprehensivedesign.dualmajor.controller;

import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberController {

    @Autowired
    private final MemberService memberService;


    @GetMapping("/member")
    @ResponseBody
    public String member() {
        return "member page";
    }
    /*============================*/

    /*===비밀번호 찾기 API===*/
    @PostMapping("/checkJoinedEmail")
    //email 입력받은 후 가입된 회원인지 확인
    //비밀번호 찾기 기능중 회원 확인 절차용
    public Map checkJoinedMember(@RequestBody MemberDto memberDto) throws Exception{
        HashMap<String, Object> map = new HashMap<>();
        Member member = memberService.find(memberDto.getEmail());
        if (member == null) {
            map.put("joinedMember", false);
        }
        else{
            map.put("joinMember", true);
            map.put("email",member.getEmail());
        }
        return map;
    }
    @PostMapping("/editPW") //비밀번호 수정 성공 여부 API
    public Map editPW(@RequestBody MemberDto memberDto) throws Exception{
        HashMap<String, Object> map = new HashMap<>();
        String status = memberService.editPassword(memberDto);
        if (status == "success") {
            map.put("isEditPasswordSuccess", true);
        }
        else{
            map.put("isEditPasswordSuccess", false);
        }
        return map;
    }

    /*회원정보 수정 API*/
    @PostMapping("/editInfo")
    public Map editMember(@RequestBody MemberDto memberDto) throws Exception{
        Member updatedMember = memberService.update(memberDto);
        MemberDto updatedMemberDto = new MemberDto();
        updatedMemberDto.setLoginInfo(
                updatedMember.getName(),
                updatedMember.getStdNum(),
                updatedMember.getFirstMajor().getId(), //회원 엔티티에 연관관계로 인해 저장된 전공 객체를 참조하여 id값 반환
                updatedMember.getDualMajor().getId(),
                updatedMember.getGrade(),
                updatedMember.getType());
        return updatedMemberDto.getLoginInfo(); //업데이트 성공 후 업데이트된 데이터 셋 반환
    }
}
