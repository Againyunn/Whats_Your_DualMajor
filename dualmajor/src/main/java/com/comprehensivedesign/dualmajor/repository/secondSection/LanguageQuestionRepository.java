package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityQuestion;
import com.comprehensivedesign.dualmajor.domain.secondSection.LanguageQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageQuestionRepository extends JpaRepository<LanguageQuestion,Long> {
}
