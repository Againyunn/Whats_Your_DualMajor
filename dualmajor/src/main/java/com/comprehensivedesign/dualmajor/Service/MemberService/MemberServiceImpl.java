package com.comprehensivedesign.dualmajor.Service.MemberService;


import com.comprehensivedesign.dualmajor.Service.MajorService.MajorService;
import com.comprehensivedesign.dualmajor.config.auth.MemberDetailsService;
import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.FirstMajor;
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
    @Autowired private MajorService majorService;
    @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Member find(String email) throws Exception{
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isEmpty()) {
            throw new Exception("not exists member");
        }
        return member.get();
    }
    @Override
    public Member findById(Long id) {
        return memberRepository.findById(id).get();
    }

    @Transactional
    @Override
    public Long join(MemberDto memberDto) throws Exception {
        String stdEmail = memberDto.getStdNum() + "@hufs.ac.kr";
        String password = bCryptPasswordEncoder.encode(memberDto.getPassword());
        validateDuplicateEmail(stdEmail);
        Member member = new Member();
        FirstMajor firstMajor = majorService.findFirstMajorById(memberDto.getFirstMajorId());
        DualMajor dualMajor = majorService.findDualMajorById(memberDto.getDualMajorId());
        member.CreateMember(memberDto.getNickName(), stdEmail, password, memberDto.getStdNum(), firstMajor, dualMajor, memberDto.getGrade(),memberDto.getUserType());
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
    @Transactional
    public Member update(MemberDto memberDto) throws Exception{
        /*회원가입 -> 폼에서 몇개의 정보만 수정하는 것처럼 보이지만.
        사실 폼에 value에 박혀있는 모든 정보들이 다시 백으로 넘어오는 것*/
        Member member = find(memberDto.getStdNum()+"@hufs.ac.kr");//로그인 된 회원의 이메일이므로 학교 주소가 붙어서 저장된 형태
        if (member == null) {
            return null;
        }
        member.updateMember(memberDto.getNickName()
                , memberDto.getPassword()
                , memberDto.getStdNum()
                , majorService.findFirstMajorById(memberDto.getFirstMajorId())
                , majorService.findDualMajorById(memberDto.getDualMajorId())
                , memberDto.getGrade()
                , memberDto.getUserType());
        return member;
    }


    @Override
    @Transactional
    public String editPassword(MemberDto memberDto) throws Exception{
        Member member = find(memberDto.getEmail());
        member.editPassword(bCryptPasswordEncoder.encode(memberDto.getPassword()));
        if(bCryptPasswordEncoder.matches(memberDto.getPassword(), member.getPassword())){
            return "success";
        }
        else{
            return "error";
        }
    }

}