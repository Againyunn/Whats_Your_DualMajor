package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.MajorDetail;
import com.comprehensivedesign.dualmajor.domain.secondSection.MemberFinalResult;
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
    @Query(value = "select m.majorName as departmentName, m.campus as campus, m.information as intro, m.degree as degree, m.career as career, m.curriculum as curriculum, m.certification as certification, m.webpage as webPage, m.phoneNum as phoneNum from MAJOR_DETAIL m where m.resultType = :result_type and m.campus = :campus", nativeQuery = true)
    List<FinalResult> findByResultTypeWithCampus(@Param("result_type")String resultType, @Param("campus")String campus);

    /*이중전공 선택 시 캠퍼스 교차 가능*/
     @Query(value = "select m.majorName as departmentName, m.campus as campus, m.information as intro, m.degree as degree, m.career as career, m.curriculum as curriculum, m.certification as certification, m.webpage as webPage, m.phoneNum as phoneNum from MAJOR_DETAIL m where m.resultType = :result_type", nativeQuery = true)
    List<FinalResult> findByResultTypeWithoutCampus(@Param("result_type")String resultType);

     //testKey로 memberfinalresult (testkey,resultType) 찾고
    // 여기의 resultType으로 majordetailrepository 조회
    //조회된 객체 수 만큼 memberrecommendedmajor에 저장

    //@Query(value = "select m.majorName as departmentName, m.campus as campus, m.information as intro, m.degree as degree, m.career as career, m.curriculum as curriculum, m.certification as certification, m.webpage as webPage from MAJOR_DETAIL m where m.resultType = :result_type and m.campus = :campus", nativeQuery = true)
    //List<MajorDetail> findByResultTypeAndCampus(@Param("result_type")String resultType, @Param("campus")String campus);
    List<MajorDetail> findByResultTypeAndCampus(String resultType, String campus);

    /**/
    //@Query(value = "select * from MAJOR_DETAIL m where m.resultType = :result_type", nativeQuery = true)
    //List<MajorDetail> findByResultType(@Param("result_type")String resultType);
    List<MajorDetail> findByResultType(String resultType);

    /* 학과 정보 조회용 */
    //@Query(value = "select m.majorName as departmentName, m.campus as campus, m.information as intro, m.degree as degree, m.career as career, m.curriculum as curriculum, m.certification as certification, m.webpage as webPage from MAJOR_DETAIL m where m.resultType = :result_type", nativeQuery = true)
    MajorDetail findByMajorName(String departmentName);

}
