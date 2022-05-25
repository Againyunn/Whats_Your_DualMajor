package com.comprehensivedesign.dualmajor.repository.firstSection;

import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.firstSection.FirstSectionDivision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FirstSectionDivisionRepository extends JpaRepository<FirstSectionDivision, Long> {

    Optional<FirstSectionDivision> findByTestKey(String testKey);
}
