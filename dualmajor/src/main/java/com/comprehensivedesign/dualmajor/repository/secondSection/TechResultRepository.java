package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityResult;
import com.comprehensivedesign.dualmajor.domain.secondSection.TechResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechResultRepository extends JpaRepository<TechResult,Long> {

    TechResult findByQuestionId(String questionId);
}
