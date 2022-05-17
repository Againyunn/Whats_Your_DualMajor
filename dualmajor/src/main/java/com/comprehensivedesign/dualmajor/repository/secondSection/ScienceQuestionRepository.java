package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.ScienceQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScienceQuestionRepository extends JpaRepository<ScienceQuestion,Long> {
    ScienceQuestion findByQuestionId(int questionId);
}
