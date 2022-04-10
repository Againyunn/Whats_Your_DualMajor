package com.comprehensivedesign.dualmajor.Service.MemberService;

import com.comprehensivedesign.dualmajor.domain.Member;
import java.util.Optional;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface MemberService {
    //회원가입
    Long join(MemberDto memberDto) throws Exception; //회원가입
    UserDetails login(String stdNum, String password) throws Exception; //로그인
    Member find(String email) throws Exception; // 회원 찾기
    Member update(MemberDto memberDto) throws Exception; //회원 정보 수정

    Member findById(Long id);
    String editPassword(MemberDto memberDto) throws Exception;
}
