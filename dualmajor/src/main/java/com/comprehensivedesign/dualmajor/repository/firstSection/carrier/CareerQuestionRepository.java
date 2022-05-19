package com.comprehensivedesign.dualmajor.repository.firstSection.carrier;

import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CareerQuestion;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerQuestionRepository extends JpaRepository<CareerQuestion,Long> {

    CareerQuestion findByQuestionNum(String questionNum); //질문 번호로 질문에 대한 정보(질문, 응답1, 응답2 . .) 반환
}
