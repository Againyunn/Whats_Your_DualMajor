package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.HumanityResult;
import com.comprehensivedesign.dualmajor.domain.secondSection.ScienceResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScienceResultRepository extends JpaRepository<ScienceResult,Long> {
}
