package com.comprehensivedesign.dualmajor.repository.firstSection.tendency;

import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TendencyResultRepository extends JpaRepository<TendencyResult, Long> {


    ArrayList<TendencyResult> findByMbti(String mbti); //성향 우선 질문에 대한 결과지에서 mbti가 같은 객체들만 찾아오기
    ArrayList<TendencyResult> findByMbtiAndQ14AndQ15AndQ16(String mbti, String q14, String q15, String q16);


}
