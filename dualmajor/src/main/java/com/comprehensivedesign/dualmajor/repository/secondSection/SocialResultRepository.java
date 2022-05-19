package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityResult;
import com.comprehensivedesign.dualmajor.domain.secondSection.SocialResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialResultRepository extends JpaRepository<SocialResult,Long> {

    SocialResult findByQuestionId(String questionId);
}
