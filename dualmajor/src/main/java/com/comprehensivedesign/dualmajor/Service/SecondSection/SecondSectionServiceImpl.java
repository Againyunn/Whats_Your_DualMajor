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
    @Autowired private final CollegeQuestionRepository collegeQuestionRepository;

    /* 회원의 응답 생성 로직 */
    @Override
    @Transactional
    public SecondSectionResponse createResponse(Member member, Long sectorId) {
        SecondSectionResponse response = new SecondSectionResponse();
        /* 섹터 질문별로 질문 갯수가 다르기 때문에 경우 구분 */
        if (sectorId == 1) { //language
            response.createResponse(4, "6", member, sectorRepository.findById(sectorId).get()); //사용자가 이진트리에 총 응답할 질문 갯수
        }
        else if (sectorId == 2) { //social
            response.createResponse(3, "5", member, sectorRepository.findById(sectorId).get());
        }
        else if (sectorId == 3) { //science
            response.createResponse(1, "3", member, sectorRepository.findById(sectorId).get());
        }
        else if (sectorId == 4) { //tech
            response.createResponse(1, "3", member, sectorRepository.findById(sectorId).get());
        }
        else { //humanity
            response.createResponse(0, "2", member, sectorRepository.findById(sectorId).get());
        }
        return secondSectionResponseRepository.save(response);
    }

    /* 사용자가 선택한 섹터와 현재 노드id에 따라 질문 넘겨주는 로직 */
    @Override
    @Transactional
    public Map recommendProcess(SecondSectionQuestionDto secondSectionQuestionDto, Member member) {
        SecondSectionResponse response = secondSectionResponseRepository.findByMemberId(member.getId()).get();
        if (secondSectionQuestionDto.getQuestionNum() == response.getQuestionNum()) {
            if(secondSectionQuestionDto.getQuestionNum()==1 || secondSectionQuestionDto.getQuestionNum()==2){
                Map map = viewCollegeQuestions(response.getTotalQuestionNum(), response.getLeftQuestions(), response.getQuestionNum());
                return map;
            }
            return viewQuestions(response.getSector().getId(), response.getQuestionId(), response.getTotalQuestionNum(), response.getLeftQuestions(), response.getQuestionNum());
        }
        else{
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("success",false );
            return map;
        }
    }

    /*사용자에게 질문 return 로직*/
    @Override
    public Map viewQuestions(Long sectorId, int questionId, String totalQuestionNum, int leftQuestions, int questionNum) {
        String currentQuestionContent;
        String currentResponse1;
        String currentResponse2;
        Long id = new Long(questionId);
        if (sectorId == 1) { //language
            LanguageQuestion question = languageQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorId == 2) { //social
            SocialQuestion question = socialQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorId == 3) { //science
            ScienceQuestion question = scienceQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorId == 4) { //tech
            TechQuestion question = techQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else { //humanity
            HumanityQuestion question = humanityQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        Map<String, Object> map = new LinkedHashMap<>(); //회원에게 보여질 질문 및 답변 내용들 JSON형식으로 저장
        map.put("questionNum", questionNum);
        map.put("totalQuestionNum", totalQuestionNum);
        map.put("questionId", questionId);
        map.put("questionContent", currentQuestionContent);
        map.put("response1", currentResponse1);
        map.put("response2", currentResponse2);
        return map;
    }

    /*공통 캠퍼스 문항 1,2번 처리 로직*/
    @Override
    @Transactional
    public boolean saveCollegeAnswer(SecondSectionQuestionDto secondSectionQuestionDto, Long memberId) {
        SecondSectionResponse response = secondSectionResponseRepository.findByMemberId(memberId).get();
        if (secondSectionQuestionDto.getQuestionNum() == 1) { //1번 문제 설vs글
            response.setCampusQ1(secondSectionQuestionDto.getAnswer());
            response.afterCollege();
            return true;
        }
        else{ //2번문제 교차캠퍼스 가능vs불가능
            response.setCampusQ2(secondSectionQuestionDto.getAnswer()); //공통문항 2개가 끝나면 해당 사용자의 캠퍼스 여부를 처리하여 저장
            response.afterCollege();
            if(response.getCampusQ1().equals("1") && response.getCampusQ2().equals("2")){
                response.setCampus("서울캠퍼스");
            }
            else if(response.getCampusQ1().equals("2") && response.getCampusQ2().equals("2")){
                response.setCampus("글로벌캠퍼스");
            }
            else{
                response.setCampus("교차 가능");
            }
            return true;
        }
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

    @Override
    public Map viewCollegeQuestions(String totalQuestionNum, int leftQuestions, int questionNum) {
        String currentQuestionContent;
        String currentResponse1;
        String currentResponse2;
        //모든 섹터 1, 2번은 캠퍼스 공통문항
        if(questionNum == 1){
            CollegeQuestion question = collegeQuestionRepository.findById(1L).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else {
            CollegeQuestion question = collegeQuestionRepository.findById(2L).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        //공통 campus질문은 노드id와 상관 없이 처리되므로 quesetionNum과 질문, 응답들만 보냄
        Map<String, Object> map = new LinkedHashMap<>(); //회원에게 보여질 질문 및 답변 내용들 JSON형식으로 저장
        map.put("questionNum", questionNum);
        map.put("totalQuestionNum", totalQuestionNum);
        map.put("questionContent", currentQuestionContent);
        map.put("response1", currentResponse1);
        map.put("response2", currentResponse2);
        return map;
    }


}
