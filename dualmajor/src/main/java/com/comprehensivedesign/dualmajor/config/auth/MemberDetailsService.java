package com.comprehensivedesign.dualmajor.config.auth;

import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberDetailsService implements UserDetailsService {
    @Autowired MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String stdEmail = username + "@hufs.ac.kr";
        Member member = memberRepository.findByEmail(stdEmail).orElseThrow(() -> new UsernameNotFoundException("not exists member"));
        return new MemberAdapter(member);
        /*Optional<Member> byEmail = memberRepository.findByEmail(stdEmail);
        System.out.println(byEmail.get());
        if (byEmail.isPresent()) {
            System.out.println(new MemberDetails(byEmail.get()));
            return new MemberDetails(byEmail.get());
        }
        return null;*/
    }

}
