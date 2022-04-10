package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.DualMajor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.stereotype.Repository;

@Repository
public interface DualMajorRepository extends JpaRepository<DualMajor, Long> {
}
