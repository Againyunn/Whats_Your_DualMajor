package com.comprehensivedesign.dualmajor.repository;

import com.comprehensivedesign.dualmajor.domain.Tendency.TendencyResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface TendencyResultRepository extends JpaRepository<TendencyResult, Long> {


    ArrayList<TendencyResult> findByMbti(String mbti); //성향 우선 질문에 대한 결과지에서 mbti가 같은 객체들만 찾아오기


}
