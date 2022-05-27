package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.MemberRecommendedMajor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRecommendedMajorRepository extends JpaRepository <MemberRecommendedMajor, Long>{


}
