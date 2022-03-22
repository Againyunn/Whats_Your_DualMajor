package com.comprehensivedesign.dualmajor.Service;


import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Long join(Member member) {
        Member saveMember = memberRepository.save(member);
        return saveMember.getId();
    }
}
