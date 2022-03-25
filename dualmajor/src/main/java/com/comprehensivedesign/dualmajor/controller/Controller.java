package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.MemberService;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class Controller {

    private final MemberService memberService;

    /*=========Mapping for Test Spring Security==============*/
    @GetMapping({"","/"})
    public String home() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/join")
    @ResponseBody
    public String joinForm() {
        return "joinForm";
    }

    @PostMapping("/join")
    @ResponseBody
    public String join(MemberDto memberDto) {
        //view를 통해 넘어온 web 계층 데이터를 MemberDto에 저장
        memberService.join(memberDto);
        return "joinForm";
    }

    @GetMapping("/member")
    @ResponseBody
    public String member() {
        return "member page";
    }
    /*============================*/

}
