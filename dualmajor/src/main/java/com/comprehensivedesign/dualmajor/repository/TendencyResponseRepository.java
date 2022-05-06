package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TendencyResponseRepository extends JpaRepository<TendencyResponse, Long> {

    TendencyResponse findByMemberId(Long memberId);

}
