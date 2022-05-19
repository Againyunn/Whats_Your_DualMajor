package com.comprehensivedesign.dualmajor.Service.SecondSection;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.secondSection.*;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.FinalResult;
import com.comprehensivedesign.dualmajor.dto.SecondSectionQuestionDto;
import com.comprehensivedesign.dualmajor.repository.SectorRepository;
import com.comprehensivedesign.dualmajor.repository.secondSection.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class SecondSectionServiceImpl implements SecondSectionService{
    @Autowired private final SecondSectionResponseRepository secondSectionResponseRepository;
    @Autowired private final SectorRepository sectorRepository;
    @Autowired private final LanguageQuestionRepository languageQuestionRepository;
    @Autowired private final LanguageResultRepository languageResultRepository;
    @Autowired private final SocialQuestionRepository socialQuestionRepository;
    @Autowired private final SocialResultRepository socialResultRepository;
    @Autowired private final TechQuestionRepository techQuestionRepository;
    @Autowired private final TechResultRepository techResultRepository;
    @Autowired private final ScienceQuestionRepository scienceQuestionRepository;
    @Autowired private final ScienceResultRepository scienceResultRepository;
    @Autowired private final HumanityQuestionRepository humanityQuestionRepository;
    @Autowired private final HumanityResultRepository humanityResultRepository;
    @Autowired private final CollegeQuestionRepository collegeQuestionRepository;
    @Autowired private final MemberService memberService;

    @Autowired private final MemberFinalResultRepository memberFinalResultRepository;
    @Autowired private final MajorDetailRepository majorDetailRepository;

    /* 회원의 응답 생성 로직 */
    @Override
    @Transactional
    public SecondSectionResponse createResponse(Member member, String sectorName) {
        SecondSectionResponse response = new SecondSectionResponse();
        /* 섹터 질문별로 질문 갯수가 다르기 때문에 경우 구분 */
        if (sectorName.equals("언어학섹터")) { //language
            response.createResponse(4, "6", member, sectorName); //사용자가 이진트리에 총 응답할 질문 갯수
        }
        else if (sectorName.equals("사회경제학섹터")) { //social
            response.createResponse(3, "5", member, sectorName);
        }
        else if (sectorName.equals("자연과학섹터")) { //science
            response.createResponse(1, "3", member, sectorName);
        }
        else if (sectorName.equals("공과섹터")) { //tech
            response.createResponse(1, "3", member, sectorName);
        }
        else { //humanity
            response.createResponse(0, "2", member, sectorName);
            SecondSectionResponse temp = secondSectionResponseRepository.save(response);//인문학 섹터는 질문이 없으므로 바로 결과 저장
            saveFinalResult(member.getId());
            return temp;
        }
        return secondSectionResponseRepository.save(response);
    }

    /* 사용자가 선택한 섹터와 현재 노드id에 따라 질문 넘겨주는 로직 */
    @Override
    @Transactional
    public Map recommendProcess(SecondSectionQuestionDto secondSectionQuestionDto, Member member) {
        SecondSectionResponse response = secondSectionResponseRepository.findByMemberId(member.getId()).get();
        if (secondSectionQuestionDto.getQuestionNum() == response.getQuestionNum()) {
            if(secondSectionQuestionDto.getQuestionNum() == 1 || secondSectionQuestionDto.getQuestionNum() == 2){
                Map map = viewCollegeQuestions(response.getTotalQuestionNum(), response.getLeftQuestions(), response.getQuestionNum());
                return map;
            }
            return viewQuestions(response.getSectorName(), response.getQuestionId(), response.getTotalQuestionNum(), response.getLeftQuestions(), response.getQuestionNum());
        }
        else{
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("success",false );
            return map;
        }
    }

    /*사용자에게 질문 return 로직*/
    @Override
    public Map viewQuestions(String sectorName, int questionId, String totalQuestionNum, int leftQuestions, int questionNum) {
        String currentQuestionContent;
        String currentResponse1;
        String currentResponse2;
        Long id = new Long(questionId);
        System.out.println(sectorName);
        if (sectorName.equals("언어학섹터")) { //language
            LanguageQuestion question = languageQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorName.equals("사회경제학섹터")) { //social
            SocialQuestion question = socialQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorName.equals("자연과학섹터")) { //science
            ScienceQuestion question = scienceQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorName.equals("공과섹터")) { //tech
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
        //공통 campus질문은 섹터 질문 트리 및 노드 id와 상관 없이 처리되므로 현재 quesetionNum과 질문, 응답들만 보냄
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("questionNum", questionNum);
        map.put("totalQuestionNum", totalQuestionNum);
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
        if (response.getLeftQuestions() == 0) { //마지막 질문의 응답까지 마친 후 결과 산출하기
            saveFinalResult(memberId);
        }
        return response;
    }
    /*각 섹터별 질문 끝난 후 MemberFinalResult 테이블에 결과 유형 저장하기*/
    @Transactional
    private void saveFinalResult(Long memberId) {
        Member member = memberService.findById(memberId);
        SecondSectionResponse response = secondSectionResponseRepository.findByMemberId(memberId).get();
        //회원의 응답에 저장되어있는 questionId : int
        //result 테이블에 저장되어있는 questionId : String
        //따라서 questionId로 result테이블에 접근하기 위하여 String 형변환을 해주어야함.
        String questionId = Integer.toString(response.getQuestionId());
        MemberFinalResult memberFinalResult = new MemberFinalResult();
        String resultType;
        if (response.getSectorName().equals("언어학섹터")) {
            LanguageResult result = languageResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        else if (response.getSectorName().equals("사회경제학섹터")) {
            SocialResult result = socialResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        else if (response.getSectorName().equals("자연과학섹터")) {
            ScienceResult result = scienceResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        else if (response.getSectorName().equals("공과섹터")) {
            TechResult result = techResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        else{
            HumanityResult result = humanityResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        memberFinalResult.createMemberFinalResult(member, resultType); //경우 분류로 의해 나눠진 resultType을 회원 최종 결과 응답지에 저장
        memberFinalResultRepository.save(memberFinalResult);
    }

    @Override
    public Map<String, Object> viewResult(Long id) {
        MemberFinalResult result = memberFinalResultRepository.findByMemberId(id);
        String campus = secondSectionResponseRepository.findByMemberId(id).get().getCampus();
        List<FinalResult> finalResults;
        if (campus.equals("서울캠퍼스") || campus.equals("글로벌캠퍼스")) {
            //변수 campus에 캠퍼스명이 담겨있고, 해당 캠퍼스명과 같은 캠퍼스명을 갖는 학과 도출 조건
            finalResults = majorDetailRepository.findByResultTypeWithCampus(result.getResultType(), campus);
        }
        else{
            //캠퍼스 교차 여부 상관 없는 사용자에게 도출 조건
            finalResults = majorDetailRepository.findByResultType(result.getResultType());
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("info", finalResults);
        return map;
    }



}
