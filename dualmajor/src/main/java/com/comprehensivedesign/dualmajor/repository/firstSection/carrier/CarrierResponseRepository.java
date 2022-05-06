package com.comprehensivedesign.dualmajor.repository.firstSection.carrier;

import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierQuestion;
import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierResponse;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrierResponseRepository extends JpaRepository<CarrierResponse,Long> {

    CarrierResponse findByMemberId(Long memberId);

}
