package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.MemberService;
import com.comprehensivedesign.dualmajor.config.auth.MemberDetails;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class Controller {

    @Autowired private final MemberService memberService;
    @Autowired private final MemberRepository memberRepository;

    /*=========Mapping for Test Spring Security==============*/
    @GetMapping({"","/"})
    public String home() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

   /* @PostMapping("/loginProc")
    @ResponseBody
    public String memberAPI(Authentication authentication) {
        UserDetails member = (UserDetails)authentication.getDetails();
        return member.getUsername();
    }*/

    @GetMapping("/loginSuccess")
    public String loginSuccess(Authentication authentication) {
        UserDetails principal = (UserDetails)authentication.getPrincipal();
        return principal.getUsername();
    }

    @GetMapping("/join")
    public String joinForm() {
        return "join";
    }

    @PostMapping("/join")
    @ResponseBody
    public String join(@RequestBody MemberDto memberDto) throws Exception{
        //view를 통해 넘어온 web 계층 데이터를 MemberDto에 저장
        Long join = memberService.join(memberDto);
        Member member = memberService.findById(join);
        return member.getEmail();
    }

    @GetMapping("/member")
    @ResponseBody
    public String member() {
        return "member page";
    }
    /*============================*/
}
