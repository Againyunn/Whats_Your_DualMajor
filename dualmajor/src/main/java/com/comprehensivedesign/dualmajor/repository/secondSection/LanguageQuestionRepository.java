package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityQuestion;
import com.comprehensivedesign.dualmajor.domain.secondSection.LanguageQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LanguageQuestionRepository extends JpaRepository<LanguageQuestion,Long> {

    @Override
    Optional<LanguageQuestion> findById(Long aLong);
}
