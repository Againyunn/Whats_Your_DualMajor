package com.comprehensivedesign.dualmajor.Service.FirstSection.FirstSectionDivisionService;


import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.firstSection.FirstSectionDivision;
import com.comprehensivedesign.dualmajor.repository.firstSection.FirstSectionDivisionRepository;
import com.comprehensivedesign.dualmajor.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FirstSectionDivisionServiceImpl implements FirstSectionDivisionService {

    @Autowired private final FirstSectionDivisionRepository firstSectionDivisionRepository;
    @Autowired private final MemberRepository memberRepository;

    /*회원 응답 찾기*/
    @Override
    public String findResponse(String testKey) {
        Optional<FirstSectionDivision> response = firstSectionDivisionRepository.findByTestKey(testKey);
        if (response.isEmpty()) {
            return "X";
        }
        return response.get().getQ1();
    }

    /*회원 응답 생성*/
    @Override
    @Transactional
    public void createResponse(String testKey, String q1) throws Exception{
        FirstSectionDivision response = new FirstSectionDivision();
        response.createFirstSectionDivision(testKey, q1);
        firstSectionDivisionRepository.save(response);
    }
    /*회원 응답 수정*/
    @Override
    @Transactional
    public void updateResponse(String testKey, String q1) throws Exception{
        FirstSectionDivision response = firstSectionDivisionRepository.findByTestKey(testKey).get();
        response.updateFirstSectionDivision(q1);
    }
}
