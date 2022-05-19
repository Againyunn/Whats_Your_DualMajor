package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityQuestion;
import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HumanityResultRepository extends JpaRepository<HumanityResult,Long> {

    HumanityResult findByQuestionId(String questionId);
}
