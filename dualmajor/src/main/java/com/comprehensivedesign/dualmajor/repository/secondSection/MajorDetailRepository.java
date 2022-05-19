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

    /*이중전공 선택 시 캠퍼스 교차 불가*/
    //회원이 원하는 캠퍼스(서울or글로벌)에 따른 학과 도출
    @Query(value = "select m.majorName as departmentName, m.information as intro, m.degree as degree, m.career as career, m.webpage as webPage from MAJOR_DETAIL m where m.resultType = :result_type and m.campus = :campus", nativeQuery = true)
    List<FinalResult> findByResultTypeWithCampus(@Param("result_type")String resultType, @Param("campus")String campus);

    /*이중전공 선택 시 캠퍼스 교차 가능*/
     @Query(value = "select m.majorName as departmentName, m.information as intro, m.degree as degree, m.career as career, m.webpage as webPage from MAJOR_DETAIL m where m.resultType = :result_type", nativeQuery = true)
    List<FinalResult> findByResultType(@Param("result_type")String resultType);
}
