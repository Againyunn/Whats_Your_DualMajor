package com.comprehensivedesign.dualmajor.Service;

import com.comprehensivedesign.dualmajor.domain.Member;

public interface MemberService {
    //회원가입
    Long join(Member member);
}
