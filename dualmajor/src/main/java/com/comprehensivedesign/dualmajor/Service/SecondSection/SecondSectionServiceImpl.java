package com.comprehensivedesign.dualmajor.Service.SecondSection;


import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.secondSection.*;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.SecondSectionQuestionDto;
import com.comprehensivedesign.dualmajor.repository.SectorRepository;
import com.comprehensivedesign.dualmajor.repository.secondSection.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class SecondSectionServiceImpl implements SecondSectionService{
    @Autowired private final SecondSectionResponseRepository secondSectionResponseRepository;
    @Autowired private final SectorRepository sectorRepository;
    @Autowired private final LanguageQuestionRepository languageQuestionRepository;
    @Autowired private final SocialQuestionRepository socialQuestionRepository;
    @Autowired private final TechQuestionRepository techQuestionRepository;
    @Autowired private final ScienceQuestionRepository scienceQuestionRepository;
    @Autowired private final HumanityQuestionRepository humanityQuestionRepository;


    @Override
    public void recommendProcess(SecondSectionQuestionDto secondSectionQuestionDto, Member member) {
        if (secondSectionResponseRepository.findByMemberId(member.getId()).isEmpty()) {
            SecondSectionResponse response = createResponse(member, secondSectionQuestionDto.getSectionId());
            viewQuestions(response.getSector().getId(), response.getQuestionId());
        }
        SecondSectionResponse response = binaryTree(secondSectionQuestionDto.getAnswer(), member.getId());
        viewQuestions(response.getSector().getId(), response.getQuestionId());
    }

    /* 회원의 응답 생성 로직 */
    @Override
    @Transactional
    public SecondSectionResponse createResponse(Member member, Long sectorId) {
        SecondSectionResponse response = new SecondSectionResponse();
        /* 섹터 질문별로 질문 갯수가 다르기 때문에 경우 구분 */
        if (sectorId.equals(1L)) { //language
            response.createResponse(5, member, sectorRepository.findById(sectorId).get());
        }
        else if (sectorId.equals(2L)) { //social
            response.createResponse(5, member, sectorRepository.findById(sectorId).get());
        }
        else if (sectorId.equals(3L)) { //science
            response.createResponse(5, member, sectorRepository.findById(sectorId).get());
        }
        else if (sectorId.equals(4L)) { //tech
            response.createResponse(5, member, sectorRepository.findById(sectorId).get());
        }
        else { //humanity
            response.createResponse(5, member, sectorRepository.findById(sectorId).get());
        }
        return secondSectionResponseRepository.save(response);
    }

    /*사용자에게 질문 return 로직*/
    @Override
    public Map viewQuestions(Long sectorId, int questionId) {
        if (sectorId.equals(1L)) { //language
            languageQuestionRepository.findByQuestionId(questionId);
        }
        else if (sectorId.equals(2L)) { //social
            socialQuestionRepository.findByQuestionId(questionId);
        }
        else if (sectorId.equals(3L)) { //science
            scienceQuestionRepository.findByQuestionId(questionId);
        }
        else if (sectorId.equals(4L)) { //tech
            techQuestionRepository.findByQuestionId(questionId);
        }
        else { //humanity
            humanityQuestionRepository.findByQuestionId(questionId);
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("questionId", );
        map.put("questionContent",);
        map.put("leftQuestions", );
        return map;
    }

    /* 회원의 응답에 따른 이진 트리 로직 */
    @Override
    @Transactional
    public SecondSectionResponse binaryTree(String answer, Long memberId) {
        SecondSectionResponse response = secondSectionResponseRepository.findByMemberId(memberId).get();
        int currentQId = response.getQuestionId();
        int leftQuestions = response.getLeftQuestions()-1;
        if (answer.equals("1")) { //전자에 해당하는 응답이 나올 시 다음 질문은 왼쪽 자식 노드이므로, 현재 노드 번호 n * 2
            currentQId *= 2;
        }
        else{ //후자에 해당하는 응답이 나올 시 다음 질문은 오른쪽 자식 노드이므로, 현재 노드 번호 (n * 2) + 1
            currentQId = (currentQId * 2) + 1;
        }
        response.updateResponse(currentQId, leftQuestions); //다음 질문에 해당하는 노드 Id와, 남은 질문의 갯수 업데이트
        return response;
    }


}
