package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.FirstMajor;
import com.comprehensivedesign.dualmajor.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void join() {
        /*Member 객체에 저장된 정보를 repository로 넘기고, 
        * DB에 정상적으로 저장이 되었는지 확인*/
        //given
        Member member = new Member();
        FirstMajor firstMajor = new FirstMajor();
        DualMajor dualMajor = new DualMajor();
        member.CreateMember("test","email","1234","111",firstMajor,dualMajor,"1","MENTEE");

        //when
        memberRepository.save(member);

        //then
        assertThat(memberRepository.findById(1L).get()).isEqualTo(member);
    }

    @Test
    void findByEmail() {
        //given
        Member member = new Member();
        FirstMajor firstMajor = new FirstMajor();
        DualMajor dualMajor = new DualMajor();
        member.CreateMember("test","email","1234","111",firstMajor,dualMajor,"1","MENTEE");

        //when
        memberRepository.save(member);
        //then
        Optional<Member> email = memberRepository.findByEmail("email");

        assertThat(email.get().getId()).isEqualTo(1);
    }

}