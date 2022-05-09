package com.comprehensivedesign.dualmajor.repository.firstSection.carrier;

import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierQuestion;
import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CarrierResultRepository extends JpaRepository<CarrierResult,Long> {

    ArrayList<CarrierResult> findByMbtiAndQ6AndQ7AndQ8AndQ9AndQ10AndQ11AndQ12(String mbti, String q6, String q7, String q8, String q9, String q10, String q11, String q12);
}
