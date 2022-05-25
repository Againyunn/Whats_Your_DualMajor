package com.comprehensivedesign.dualmajor.repository;

import java.util.*;
import com.comprehensivedesign.dualmajor.domain.sector.MemberSector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberSectorRepository extends JpaRepository<MemberSector, Long> {
    Optional<List<MemberSector>> findByTestKey(String testKey);
}
