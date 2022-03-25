package com.comprehensivedesign.dualmajor.Service;


import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired MemberRepository memberRepository;

    @Transactional
    @Override
    public Long join(MemberDto memberDto) throws Exception {
        //필요한 유저 아이디는 학교 메일
        //but 클라이언트측에서는 "   "@hufs.ac.kr 이런 식으로 보이게 되며, 학번만 입력하게끔 설계
        //따라서 입력받은 학번에 "@hufs.ac.kr" 을 자동으로 달아주는 작업 필요
        String stdNum = memberDto.getEmail();
        String stdEmail = stdNum + "@hufs.ac.kr";
        //중복 로그인 판별
        validateDuplicateEmail(stdEmail);
        //새로운 Member 엔티티 객체를 생성
        //Member 엔티티 객체에 memberDto로 넘어온 웹 계층 데이터를 옮기는 작업
        Member member = new Member();
        member.CreateMember(memberDto.getName(), stdEmail, memberDto.getPassword(), memberDto.getFirstMajor(), memberDto.getGrade());
        return memberRepository.save(member).getId();
    }

    private void validateDuplicateEmail(String stdEmail) throws Exception{
        Optional<Member> byEmail = memberRepository.findByEmail(stdEmail);
        if(!byEmail.isEmpty()){
            throw new Exception("already exists Email . . .");
        }
    }
}
