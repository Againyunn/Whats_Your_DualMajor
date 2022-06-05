package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class JoinController {

    @Autowired
    private final MemberService memberService;
    @Autowired
    private final MemberRepository memberRepository;

    /*=========Mapping for Test Spring Security==============*/
   /* @GetMapping({"", "/"})
    @ResponseBody
    public String home() {
        return "home";
    }*/


    @PostMapping("join/")
    @ResponseBody
    public Object join(@RequestBody MemberDto memberDto) throws Exception {
        Map<Object, Object> map = new HashMap<>();
        Long memberId;
        //view를 통해 넘어온 web 계층 데이터를 MemberDto에 저장
        try {
            memberId = memberService.join(memberDto);
        } catch (Exception e) {
            map.put("is_success", false);
            return map;
        }
        map.put("is_success", true);
        //map.put("email", memberRepository.findById(memberId).get().getEmail());
        map.put("id", memberRepository.findById(memberId).get().getStdNum());
        return map;
    }

    @PostMapping("/checkEmail") // 회원가입 시 아이디 중복확인
    public Object checkMemberEmail(@RequestBody MemberDto memberDto) {
        HashMap<String, Boolean> map = new HashMap<>();
        Optional<Member> byEmail = memberRepository.findByEmail(memberDto.getStdNum() + "@hufs.ac.kr");
        if (byEmail.isEmpty()) {
            map.put("joinPossible", true);
            return map;
        }
        else{
            map.put("joinPossible", false);
            return map;
        }
        //넘어온 파라미터와 같은 이메일 정보가 있으면 false, 그렇지 않아 회원가입 가능하면 true
    }

}
