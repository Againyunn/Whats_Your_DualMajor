package com.comprehensivedesign.dualmajor.repository.firstSection.tendency;

import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TendencyQuestionRepository extends JpaRepository<TendencyQuestion, Long> {

    TendencyQuestion findByQuestionNum(String questionNum); //질문 번호로 질문에 대한 정보(질문, 응답1, 응답2 . .) 반환

}
