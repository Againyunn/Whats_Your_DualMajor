package com.comprehensivedesign.dualmajor.repository.major;

import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.dto.DualMajorName;
import com.comprehensivedesign.dualmajor.dto.MajorList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

import java.util.List;

@Repository
public interface DualMajorRepository extends JpaRepository<DualMajor, Long> {

    Optional<List<DualMajor>> findBySectorId(Long sectorId);

    @Query(value = "select d.majorName as majorName from DUAL_MAJOR d where d.sector_id = :sector_id",nativeQuery = true)
    List<DualMajorName> findMajorNameBySectorId(@Param("sector_id") Long sectorId);

    @Query(value = "select d.id as id, d.majorName as name from DUAL_MAJOR d ",nativeQuery = true)
    List<MajorList> viewDualMajorList();

    Optional<DualMajor> findByMajorName(String majorName);

    @Query(value = "select d.id as id, d.majorName as name from DUAL_MAJOR d where d.campus = :campus",nativeQuery = true)
    List<MajorList> viewMajorListByCampus(String campus);


}
