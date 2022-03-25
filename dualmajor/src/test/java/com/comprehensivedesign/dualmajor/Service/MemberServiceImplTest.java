package com.comprehensivedesign.dualmajor.Service;

import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class MemberServiceImplTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    @Rollback(value = false)
    void join() throws Exception{
        //given
        MemberDto memberDto = new MemberDto();
        memberDto.setEmail("email");
        MemberDto memberDto2 = new MemberDto();
        memberDto2.setEmail("email2");

        //when
        memberService.join(memberDto);
        memberService.join(memberDto2);

        //then
        //중복 아이디 처리 되지 않고 정상 회원가입 되는지
        assertThat(memberRepository.findById(2L).get().getEmail()).isEqualTo("email2@hufs.ac.kr");

    }
    @Test
    @Rollback(value = false)
    void validateDuplicateEmail() throws Exception{
        //given
        MemberDto memberDto = new MemberDto();
        memberDto.setEmail("email");
        MemberDto memberDto2 = new MemberDto();
        memberDto2.setEmail("email");
        //when
        memberService.join(memberDto);
        try {
            memberService.join(memberDto2);
        } catch (Exception e) {
            System.out.println("error Test");
        }

        //then

    }

}