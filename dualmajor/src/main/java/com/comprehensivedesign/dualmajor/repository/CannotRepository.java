package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.Cannot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CannotRepository extends JpaRepository<Cannot, Long> {

    Optional<Cannot> findByFirstMajorIdAndDualMajorId(Long firstMajorId, Long dualMajorId);

}
