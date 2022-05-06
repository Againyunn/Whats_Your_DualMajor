package com.comprehensivedesign.dualmajor.repository.firstSection.carrier;

import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierQuestion;
import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrierResultRepository extends JpaRepository<CarrierResult,Long> {
}
