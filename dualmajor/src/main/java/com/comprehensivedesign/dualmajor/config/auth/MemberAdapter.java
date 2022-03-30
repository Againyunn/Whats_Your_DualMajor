package com.comprehensivedesign.dualmajor.config.auth;

import com.comprehensivedesign.dualmajor.domain.Member;
import lombok.Getter;
import org.hibernate.annotations.common.reflection.XMember;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.List;

@Getter
public class MemberAdapter extends User {

    private Member member;

    public MemberAdapter(Member member) {
        super(member.getEmail(), member.getPassword(), List.of(new SimpleGrantedAuthority(member.getRole())));
        this.member = member;
    }


}
