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
        String stdEmail = memberDto.getStdNum() + "@hufs.ac.kr"; //프론트엔드 입력 창에 학번만 입력되므로 이메일 형식으로 저장하기 위해 주소 붙여주기
        String password = bCryptPasswordEncoder.encode(memberDto.getPassword()); //비밀번호를 암호화하여 DB에 저장 => 보안 강화
        validateDuplicateEmail(stdEmail); //중복 이메일 판별
        Member member = new Member();
        FirstMajor firstMajor = majorService.findFirstMajorById(memberDto.getFirstMajorId()); //회원이 참조할 제1전공 객체
        DualMajor dualMajor = majorService.findDualMajorById(memberDto.getDualMajorId()); //회원이 참조할 이중전공 객체
        //DB의 회원 테이블과 매핑되는 회원 Entity 객체를 생성하여 가입할 회원의 정보 저장
        member.CreateMember(memberDto.getNickName(), stdEmail, password, memberDto.getStdNum(), firstMajor, dualMajor, memberDto.getGrade(),memberDto.getUserType(), memberDto.getGpa());
        return memberRepository.save(member).getId(); //가입될 회원 정보가 저장된 회원 객체를 DB의 회원 테이블에 매핑하여 저장
    }
    private void validateDuplicateEmail(String stdEmail) throws Exception{
        Optional<Member> byEmail = memberRepository.findByEmail(stdEmail); //회원이 입력한 이메일을 기준으로 DB에 같은 정보가 있는지 확인
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
        Member member = find(memberDto.getEmail()+"@hufs.ac.kr");//로그인 된 회원의 이메일이므로 학교 주소가 붙어서 저장된 형태
        if (member == null) {
            return null;
        }
        member.updateMember(memberDto.getNickName()
                , bCryptPasswordEncoder.encode(memberDto.getPassword())
                , memberDto.getEmail()
                , majorService.findFirstMajorById(memberDto.getFirstMajorId())
                , majorService.findDualMajorById(memberDto.getDualMajorId())
                , memberDto.getGrade()
                , memberDto.getUserType()
                , memberDto.getGpa());
        return member;
    }


    @Override
    @Transactional
    public String editPassword(MemberDto memberDto) throws Exception{
        System.out.println("editPW getEMail"+memberDto.getEmail());
        System.out.println("editPW getStdnum"+memberDto.getStdNum());
        System.out.println("editPW getId"+memberDto.getId());
        Member member = find(memberDto.getStdNum()+"@hufs.ac.kr");
        //Member member = find(memberDto.getEmail()+"@hufs.ac.kr");
        member.editPassword(bCryptPasswordEncoder.encode(memberDto.getPassword()));
        if(bCryptPasswordEncoder.matches(memberDto.getPassword(), member.getPassword())){
            return "success";
        }
        else{
            return "error";
        }
    }

}