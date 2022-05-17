package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectorRepository extends JpaRepository<Sector, Long> {
}
