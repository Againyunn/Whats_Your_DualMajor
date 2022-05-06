package com.comprehensivedesign.dualmajor.repository.major;

import com.comprehensivedesign.dualmajor.domain.FirstMajor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FirstMajorRepository extends JpaRepository<FirstMajor, Long> {
}
