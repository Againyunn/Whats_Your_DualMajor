package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.MajorDetail;
import com.comprehensivedesign.dualmajor.dto.FinalResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MajorDetailRepository extends JpaRepository<MajorDetail, Long> {

   /* @Query(value = "select m. as majorName from MEMBER_FINAL_RESULT m where m.result_type = :result_type",nativeQuery = true)
    List<FinalResult> findByResultType(@Param("result_type")String resultType);*/
}
