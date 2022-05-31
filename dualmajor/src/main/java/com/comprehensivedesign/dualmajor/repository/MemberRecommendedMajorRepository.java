package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.MemberRecommendedMajor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface MemberRecommendedMajorRepository extends JpaRepository <MemberRecommendedMajor, Long>{

    Optional<MemberRecommendedMajor> findByMemberId(Long memberId);

    List<MemberRecommendedMajor> findByMajorName(String majorName);

    @Query(value = "select count(*) as applyNum from MEMBER_RECOMMENDED_MAJOR m where m.majorName = :name", nativeQuery = true)
    int findMajorCount(String name);

    Optional<MemberRecommendedMajor> findByMajorNameAndMemberId(String majorName, Long memberId);

    void deleteByMajorNameAndMemberId(String majorName, Long memberId);
}
