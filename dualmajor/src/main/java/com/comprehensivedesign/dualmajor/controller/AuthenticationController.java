package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.MemberService;
import com.comprehensivedesign.dualmajor.config.auth.MemberAdapter;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private final MemberService memberService;

    @GetMapping("/loginSuccess")
    @ResponseBody
    public Object loginSuccess(@AuthenticationPrincipal MemberAdapter memberAdapter) {
        MemberDto memberDto = new MemberDto();
        memberDto.setLoginInfo(
                memberAdapter.getMember().getName(),
                memberAdapter.getMember().getStdNum(),
                memberAdapter.getMember().getFirstMajor(),
                memberAdapter.getMember().getDualMajor(),
                memberAdapter.getMember().getGrade(),
                memberAdapter.getMember().getType()
        );
        return memberDto.getLoginInfo();
    }

    @GetMapping("/logoutSuccess")
    @ResponseBody
    public Map logoutStatus() {
        Map<Object, Object> map = new HashMap<>();
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() ==  "anonymousUser") {
            map.put("is_success", true);
            return map;
        }
        map.put("is_success", false);
        return map;
    }


}
