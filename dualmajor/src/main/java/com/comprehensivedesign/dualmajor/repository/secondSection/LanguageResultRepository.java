package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityResult;
import com.comprehensivedesign.dualmajor.domain.secondSection.LanguageQuestion;
import com.comprehensivedesign.dualmajor.domain.secondSection.LanguageResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageResultRepository extends JpaRepository<LanguageResult,Long> {

    LanguageResult findByQuestionId(String questionId);
}
