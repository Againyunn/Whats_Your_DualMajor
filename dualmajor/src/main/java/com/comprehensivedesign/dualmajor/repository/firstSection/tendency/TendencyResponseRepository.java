package com.comprehensivedesign.dualmajor.repository.firstSection.tendency;

import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TendencyResponseRepository extends JpaRepository<TendencyResponse, Long> {

    TendencyResponse findByTestKey(String testKey);

}
