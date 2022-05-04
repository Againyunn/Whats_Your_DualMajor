package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    //JpaRepository : 기본적인 CRUD 기능을 갖고 있는 JPA 기능

    @Override
    Optional<Member> findById(Long Long);

    List<Member> findByEmailAndNickNameAndGrade(String email, String name, String grade);

    //JPA query Method : findBy~ ==> 뒤에 붙는 명사를 기준으로 자동으로 쿼리 생성
    //select * from member m where m.email="email"
    Optional<Member> findByEmail(String email);

}
