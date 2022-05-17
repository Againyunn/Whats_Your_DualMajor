package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityResult;
import com.comprehensivedesign.dualmajor.domain.secondSection.TechResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechResultRepository extends JpaRepository<TechResult,Long> {
}
