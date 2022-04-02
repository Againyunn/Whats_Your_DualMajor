package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.MemberService;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class JoinController {

    @Autowired private final MemberService memberService;
    @Autowired private final MemberRepository memberRepository;

    /*=========Mapping for Test Spring Security==============*/
    @GetMapping({"", "/"})
    @ResponseBody
    public String home() {
        return "home";
    }


    @PostMapping("/join")
    @ResponseBody
    public Object join(@RequestBody MemberDto memberDto) throws Exception{
        Map<Object, Object> map = new HashMap<>();
        Long memberId;
        //view를 통해 넘어온 web 계층 데이터를 MemberDto에 저장
        try{
            memberId = memberService.join(memberDto);
        }
        catch (Exception e){
            map.put("is_success", false);
            return map;
        }
        map.put("is_success", true);
        map.put("email", memberRepository.findById(memberId).get().getEmail());
        return map;
    }

}
