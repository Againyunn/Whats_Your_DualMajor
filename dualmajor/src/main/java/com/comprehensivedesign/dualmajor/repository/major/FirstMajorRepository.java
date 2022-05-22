package com.comprehensivedesign.dualmajor.repository.major;

import com.comprehensivedesign.dualmajor.domain.FirstMajor;
import com.comprehensivedesign.dualmajor.dto.MajorList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FirstMajorRepository extends JpaRepository<FirstMajor, Long> {

    @Query(value = "select f.id as id, f.majorName as name from FIRST_MAJOR f ",nativeQuery = true)
    List<MajorList> viewFirstMajorList();

}
