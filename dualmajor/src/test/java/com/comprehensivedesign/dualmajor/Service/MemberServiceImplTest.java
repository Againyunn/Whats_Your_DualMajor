package com.comprehensivedesign.dualmajor.Service;

import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.FirstMajor;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;


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
        memberDto.setPassword("1234");
        MemberDto memberDto2 = new MemberDto();
        memberDto2.setEmail("email2");
        memberDto2.setPassword("5678");

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

    @Test
    void login() throws Exception{
        //given
        MemberDto memberDto = new MemberDto();
        memberDto.setNickName("test");
        memberDto.setEmail("email");
        memberDto.setPassword("1234");
        memberService.join(memberDto);

        MemberDto memberDto2 = new MemberDto();
        memberDto2.setNickName("test2");
        memberDto2.setEmail("email2");
        memberDto2.setPassword("5678");
        memberService.join(memberDto2);
        //when
        UserDetails member = memberService.login("email", "1234");
        UserDetails member2 = memberService.login("email2", "5678");
        //then
        assertThat(member.getUsername()).isEqualTo("test");
        assertThat(member2.getUsername()).isEqualTo("test2");
    }

    @Test
    public void update() throws Exception{
        HashMap<String, String> map = new HashMap<>();
        //given
        MemberDto memberDto = new MemberDto();
        FirstMajor firstMajor = new FirstMajor();
        DualMajor dualMajor = new DualMajor();

        memberDto.setStdNum("202000000");
        memberDto.setStdNum("202000000@hufs.ac.kr");
        memberDto.setPassword("1234");
        memberDto.setUserType("type");
        /*memberDto.setDualMajor(dualMajor);
        memberDto.setFirstMajor(firstMajor);*/
        memberDto.setGrade("1");
        memberDto.setNickName("jwc");
        memberDto.setUserType("tyope");
        Long join = memberService.join(memberDto);
        Optional<Member> byId = memberRepository.findById(join);
        String email = byId.get().getEmail();
        //when
        MemberDto editMemberDto = new MemberDto();
        editMemberDto.setStdNum("202000000");
        editMemberDto.setEmail(email);
        editMemberDto.setPassword("123456");
        editMemberDto.setNickName("editName");
        /*editMemberDto.setFirstMajor("editFM");
        editMemberDto.setDualMajor("editDM");*/
        editMemberDto.setGrade("edtGrade");
        editMemberDto.setUserType("editType");
        Member update = memberService.update(editMemberDto);
        System.out.println(update==null);

        //then
        map.put("stdNum", update.getStdNum());
        map.put("nickName", update.getNickName());
        map.put("grade", update.getGrade());
        /*map.put("dualMajor", update.getDualMajor());*/

        System.out.println(map);
    }


}