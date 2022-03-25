package com.comprehensivedesign.dualmajor.Service;

import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.dto.MemberDto;

public interface MemberService {
    //회원가입
    Long join(MemberDto memberDto) throws Exception;
}
