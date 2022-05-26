package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.config.auth.MemberAdapter;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
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
                memberAdapter.getMember().getFirstMajor().getMajorName(),
                memberAdapter.getMember().getFirstMajor().getId(), //회원 테이블이 참조하는 전공 객체의 Id값(Long) 반환, memberDto에서 Json형태를 위해 String으로 변환
                memberAdapter.getMember().getDualMajor().getMajorName(),
                memberAdapter.getMember().getDualMajor().getId(),
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
