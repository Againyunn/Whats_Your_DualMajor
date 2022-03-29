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
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class Controller {

    @Autowired private final MemberService memberService;
    @Autowired private final MemberRepository memberRepository;

    /*=========Mapping for Test Spring Security==============*/
    @GetMapping({"","/"})
    @ResponseBody
    public Object home() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        //MemberDetails details = (MemberDetails)authentication.getDetails();
        if (principal == null) {
            return "no authenticated member";
        }
        return principal;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

   /* @PostMapping("/login")
    @ResponseBody
    public Object login(Model model, @AuthenticationPrincipal MemberDetails memberDetails) {
        //System.out.println(memberDetails.getUsername());
        if (memberDetails == null) {
            System.out.println("null");
            model.addAttribute("issuccess","null");
            return model;
        }
        System.out.println("not null");
        return memberDetails.getUsername();
    }*/

    /*@PostMapping("/loginProc")
    @ResponseBody
    public String memberAPI() {
        System.out.println("loginProcPost");

        return "loginProc";
    }*/

   @GetMapping("/loginSuccess")
   @ResponseBody
   public Object loginSuccess() {
       Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       Object principal = authentication.getPrincipal();
       //MemberDetails details = (MemberDetails)authentication.getDetails();
       if (principal == null) {
           return "no authenticated member";
       }
       return principal;
   }

    @GetMapping("/join")
    public String joinForm() {
        return "join";
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

    @GetMapping("/member")
    @ResponseBody
    public String member() {
        return "member page";
    }
    /*============================*/
}
