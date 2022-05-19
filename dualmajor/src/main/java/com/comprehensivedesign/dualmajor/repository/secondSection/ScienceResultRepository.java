package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityResult;
import com.comprehensivedesign.dualmajor.domain.secondSection.ScienceResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScienceResultRepository extends JpaRepository<ScienceResult,Long> {

    ScienceResult findByQuestionId(String questionId);
}
