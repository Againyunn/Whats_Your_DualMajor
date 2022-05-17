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

    /* 회원의 응답 생성 로직 */
    @Override
    @Transactional
    public SecondSectionResponse createResponse(Member member, Long sectorId) {
        SecondSectionResponse response = new SecondSectionResponse();
        /* 섹터 질문별로 질문 갯수가 다르기 때문에 경우 구분 */
        if (sectorId == 1) { //language
            response.createResponse(5, member, sectorRepository.findById(sectorId).get()); //사용자가 이진트리에 총 응답할 질문 갯수
        }
        else if (sectorId == 2) { //social
            response.createResponse(3, member, sectorRepository.findById(sectorId).get());
        }
        else if (sectorId == 3) { //science
            response.createResponse(1, member, sectorRepository.findById(sectorId).get());
        }
        else if (sectorId == 4) { //tech
            response.createResponse(1, member, sectorRepository.findById(sectorId).get());
        }
        else { //humanity
            response.createResponse(0, member, sectorRepository.findById(sectorId).get());
        }
        return secondSectionResponseRepository.save(response);
    }

    /* 사용자가 선택한 섹터와 현재 노드id에 따라 질문 넘겨주는 로직 */
    @Override
    public Map recommendProcess(SecondSectionQuestionDto secondSectionQuestionDto, Member member) {
        SecondSectionResponse response = secondSectionResponseRepository.findByMemberId(member.getId()).get();
        if (secondSectionQuestionDto.getQuestionNum() == response.getQuestionNum()) {
            return viewQuestions(response.getSector().getId(), response.getQuestionId(), response.getLeftQuestions(), response.getQuestionNum());
        }
        else{
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("success",false );
            return map;
        }
    }

    /*사용자에게 질문 return 로직*/
    @Override
    public Map viewQuestions(Long sectorId, int questionId, int leftQuestions, int questionNum) {
        String currentQuestionContent;
        if (sectorId == 1) { //language
            LanguageQuestion question = languageQuestionRepository.findByQuestionId(questionId);
            currentQuestionContent = question.getQuestionContent();
        }
        else if (sectorId == 2) { //social
            SocialQuestion question = socialQuestionRepository.findByQuestionId(questionId);
            currentQuestionContent = question.getQuestionContent();
        }
        else if (sectorId == 3) { //science
            ScienceQuestion question = scienceQuestionRepository.findByQuestionId(questionId);
            currentQuestionContent = question.getQuestionContent();
        }
        else if (sectorId == 4) { //tech
            TechQuestion question = techQuestionRepository.findByQuestionId(questionId);
            currentQuestionContent = question.getQuestionContent();
        }
        else { //humanity
            HumanityQuestion question = humanityQuestionRepository.findByQuestionId(questionId);
            currentQuestionContent = question.getQuestionContent();
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("questionNum", questionNum);
        map.put("questionId", questionId);
        map.put("questionContent", currentQuestionContent);
        map.put("leftQuestions", leftQuestions);
        return map;
    }

    /* 회원의 응답에 따른 이진 트리 로직 */
    @Override
    @Transactional
    public SecondSectionResponse binaryTree(String answer, Long memberId) {
        SecondSectionResponse response = secondSectionResponseRepository.findByMemberId(memberId).get();
        int currentQId = response.getQuestionId();
        int leftQuestions = response.getLeftQuestions()-1; //회원이 질문에 응답 시 마다 남은 질문 갯수-=1
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
