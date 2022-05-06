package com.comprehensivedesign.dualmajor.repository.firstSection.carrier;

import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrierQuestionRepository extends JpaRepository<CarrierQuestion,Long> {
}
