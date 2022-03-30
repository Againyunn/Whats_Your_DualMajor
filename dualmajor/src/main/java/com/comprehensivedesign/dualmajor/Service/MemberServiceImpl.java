package com.comprehensivedesign.dualmajor.Service;


import com.comprehensivedesign.dualmajor.config.auth.MemberDetails;
import com.comprehensivedesign.dualmajor.config.auth.MemberDetailsService;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
/*일련의 작업을 의미하는 트랜잭션 설정.
* readonly를 true로 해놓은 것은, 모든 db 관련 과정에서 작업을 한다면 성능 저하가 발생함.
* 따라서 기본을 readOnly로 놓고, 직접 db에 접근하여 저장,수정 등의 기능을 해야하는 경우에 Transactional 어노테이션을 재정의*/
public class MemberServiceImpl implements MemberService{

    @Autowired private MemberRepository memberRepository;
    @Autowired private MemberDetailsService memberDetailsService;
    @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    @Override
    public Long join(MemberDto memberDto) throws Exception {
        String stdEmail = memberDto.getEmail() + "@hufs.ac.kr";
        String password = bCryptPasswordEncoder.encode(memberDto.getPassword());
        validateDuplicateEmail(stdEmail);
        Member member = new Member();
        member.CreateMember(memberDto.getName(), stdEmail, password, memberDto.getFirstMajor(), memberDto.getGrade());
        return memberRepository.save(member).getId();
    }
    private void validateDuplicateEmail(String stdEmail) throws Exception{
        Optional<Member> byEmail = memberRepository.findByEmail(stdEmail);
        if(!byEmail.isEmpty()){
            throw new Exception("already exists Email");
        }
    }
    @Override
    public UserDetails login(String stdNum, String rawPassword) throws UsernameNotFoundException, Exception{
        String stdEmail = stdNum + "@hufs.ac.kr";
        UserDetails memberDetails = memberDetailsService.loadUserByUsername(stdEmail);
        if(!bCryptPasswordEncoder.matches(rawPassword, memberDetails.getPassword())){
            throw new Exception("wrong password");
        }
        return memberDetails;
    }

    @Override
    public Member find(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            return member.get();
        }
        return null;
    }

    @Override
    public Member findById(Long id) {
        return memberRepository.findById(id).get();
    }

}