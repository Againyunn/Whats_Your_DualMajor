package com.comprehensivedesign.dualmajor.repository.firstSection.carrier;

import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarееrResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CareerResultRepository extends JpaRepository<CarееrResult,Long> {

    ArrayList<CarееrResult> findByMbtiAndQ6AndQ7AndQ8AndQ9AndQ10AndQ11AndQ12(String mbti, String q6, String q7, String q8, String q9, String q10, String q11, String q12);
}
