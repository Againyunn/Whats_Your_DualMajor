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

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class MemberServiceImplTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    @Rollback(value = false)
    void join() {
        //given
        MemberDto memberDto = new MemberDto();
        memberDto.setName("test");
        memberDto.setEmail("email");
        memberDto.setPassword("1234");
        memberDto.setFirstMajor("a");
        memberDto.setGrade(1);

        //when
        Long join = memberService.join(memberDto);

        //then
        Assertions.assertThat(memberRepository.findById(join).get().getName()).isEqualTo("test");

    }

}