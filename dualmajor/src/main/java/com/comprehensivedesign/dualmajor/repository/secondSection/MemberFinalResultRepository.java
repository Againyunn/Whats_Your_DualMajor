package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.MemberFinalResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberFinalResultRepository extends JpaRepository<MemberFinalResult, Long> {

    MemberFinalResult findByTestKey(String testKey); //회원 id에 해당하는 최종 결과 찾기
}
