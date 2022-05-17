package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.TechQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechQuestionRepository extends JpaRepository<TechQuestion,Long> {
    TechQuestion findByQuestionId(int questionId);

}
