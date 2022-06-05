package com.comprehensivedesign.dualmajor.Service.SecondSection;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.secondSection.*;
import com.comprehensivedesign.dualmajor.dto.FinalResult;
import com.comprehensivedesign.dualmajor.dto.SecondSectionQuestionDto;
import com.comprehensivedesign.dualmajor.repository.SectorRepository;
import com.comprehensivedesign.dualmajor.repository.secondSection.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    public SecondSectionResponse createResponse(String testKey, String sectorName) {
        SecondSectionResponse response = new SecondSectionResponse();
        /* 섹터 질문별로 질문 갯수가 다르기 때문에 경우 구분 */
        if (sectorName.equals("언어학 섹터")) { //language
            response.createResponse(4, "6", testKey, sectorName); //사용자가 이진트리에 총 응답할 질문 갯수
        }
        else if (sectorName.equals("사회경제학 섹터")) { //social
            response.createResponse(3, "5", testKey, sectorName);
        }
        else if (sectorName.equals("자연과학 섹터")) { //science
            response.createResponse(1, "3", testKey, sectorName);
        }
        else if (sectorName.equals("공과대학 섹터")) { //tech
            response.createResponse(1, "3", testKey, sectorName);
        }
        else { //humanity
            response.createResponse(0, "2", testKey, sectorName);
            SecondSectionResponse temp = secondSectionResponseRepository.save(response);//인문학 섹터는 질문이 없으므로 바로 결과 저장
            saveFinalResult(testKey);
            return temp;
        }
        return secondSectionResponseRepository.save(response);
    }

    /* 사용자가 선택한 섹터와 현재 노드id에 따라 질문 넘겨주는 로직 */
    @Override
    @Transactional
    public Map recommendProcess(SecondSectionQuestionDto secondSectionQuestionDto, String testKey) {
        SecondSectionResponse response = secondSectionResponseRepository.findByTestKey(testKey).get();
        if (secondSectionQuestionDto.getQuestionNum() == response.getQuestionNum()) {
            if(secondSectionQuestionDto.getQuestionNum() == 1 || secondSectionQuestionDto.getQuestionNum() == 2){
                Map map = viewCollegeQuestions(testKey, response.getTotalQuestionNum(), response.getLeftQuestions(), response.getQuestionNum());
                return map;
            }
            return viewQuestions(testKey, response.getSectorName(), response.getQuestionId(), response.getTotalQuestionNum(), response.getLeftQuestions(), response.getQuestionNum());
        }
        else{
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("success",false );
            return map;
        }
    }

    /*사용자에게 질문 return 로직*/
    @Override
    public Map viewQuestions(String testKey, String sectorName, int questionId, String totalQuestionNum, int leftQuestions, int questionNum) {
        String currentQuestionContent;
        String currentResponse1;
        String currentResponse2;
        Long id = new Long(questionId);
        System.out.println(sectorName);
        if (sectorName.equals("언어학 섹터")) { //language
            LanguageQuestion question = languageQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorName.equals("사회경제학 섹터")) { //social
            SocialQuestion question = socialQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorName.equals("자연과학 섹터")) { //science
            ScienceQuestion question = scienceQuestionRepository.findById(id).get();
            currentQuestionContent = question.getQuestionContent();
            currentResponse1 = question.getResponse1();
            currentResponse2 = question.getResponse2();
        }
        else if (sectorName.equals("공과대학 섹터")) { //tech
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
        map.put("testKey", testKey);
        map.put("questionNum", questionNum);
        map.put("totalQuestionNum", totalQuestionNum);
        map.put("questionId", questionId);
        map.put("questionContent", currentQuestionContent);
        map.put("response1", currentResponse1);
        map.put("response2", currentResponse2);
        return map;
    }
    @Override
    public Map viewCollegeQuestions(String testKey, String totalQuestionNum, int leftQuestions, int questionNum) {
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
        map.put("testKey", testKey);
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
    public String saveCollegeAnswer(SecondSectionQuestionDto secondSectionQuestionDto, String testKey) {
        SecondSectionResponse response = secondSectionResponseRepository.findByTestKey(testKey).get();
        if (secondSectionQuestionDto.getQuestionNum() == 1) { //1번 문제 설vs글
            response.setCampusQ1(secondSectionQuestionDto.getAnswer());
            response.afterCollege();
            return "q1";
        }
        else{ //2번문제 교차캠퍼스 가능vs불가능
            response.setCampusQ2(secondSectionQuestionDto.getAnswer()); //공통문항 2개가 끝나면 해당 사용자의 캠퍼스 여부를 처리하여 저장
            response.afterCollege();
            if(response.getCampusQ1().equals("1") && response.getCampusQ2().equals("2")){
                response.setCampus("서울");
            }
            else if(response.getCampusQ1().equals("2") && response.getCampusQ2().equals("2")){
                response.setCampus("글로벌");
            }
            else{
                response.setCampus("교차가능");
            }
            /*인문학 섹터의 경우 질문 트리가 없고 공통 문항이 끝나면 바로 최종 결과 도출됨*/
            if (response.getSectorName().equals("인문학 섹터")) {
                return "humanity";

            }
            return "q2";
        }
    }

    /* 회원의 응답에 따른 이진 트리 로직 */
    @Override
    @Transactional
    public String binaryTree(String answer, String testKey) {
        SecondSectionResponse response = secondSectionResponseRepository.findByTestKey(testKey).get();
        int currentQId = response.getQuestionId();
        int leftQuestions = response.getLeftQuestions()-1; //회원이 질문에 응답 시 마다 남은 질문 갯수-=1
        if (answer.equals("1")) { //전자에 해당하는 응답이 나올 시 다음 질문은 왼쪽 자식 노드이므로, 현재 노드 번호 n * 2
            currentQId *= 2;
        }
        else{ //후자에 해당하는 응답이 나올 시 다음 질문은 오른쪽 자식 노드이므로, 현재 노드 번호 (n * 2) + 1
            currentQId = (currentQId * 2) + 1;
        }
        response.updateResponse(currentQId, leftQuestions); //다음 질문에 해당하는 노드 Id와, 남은 질문의 갯수 업데이트
        /*==예외(사회경제학섹터 6번 노드)처리== */
        /*==마지막 질문의 응답까지 마친 후 결과 산출하기==*/
        if (response.getLeftQuestions() == 0 || (response.getSectorName().equals("사회경제학 섹터")&&response.getQuestionId()==6)) {
            saveFinalResult(testKey);
            return "end";
        }
        return "not end";
    }
    /*각 섹터별 질문 끝난 후 MemberFinalResult 테이블에 결과 유형 저장하기*/
    @Transactional
    private void saveFinalResult(String testKey) {
        //Member member = memberService.findById(memberId);
        SecondSectionResponse response = secondSectionResponseRepository.findByTestKey(testKey).get();
        //회원의 응답에 저장되어있는 questionId : int
        //result 테이블에 저장되어있는 questionId : String
        //따라서 questionId로 result테이블에 접근하기 위하여 String 형변환을 해주어야함.
        String questionId = Integer.toString(response.getQuestionId());
        MemberFinalResult memberFinalResult = new MemberFinalResult();
        String resultType;
        if (response.getSectorName().equals("언어학 섹터")) {
            LanguageResult result = languageResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        else if (response.getSectorName().equals("사회경제학 섹터")) {
            SocialResult result = socialResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        else if (response.getSectorName().equals("자연과학 섹터")) {
            ScienceResult result = scienceResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        else if (response.getSectorName().equals("공과대학 섹터")) {
            TechResult result = techResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        else{
            HumanityResult result = humanityResultRepository.findByQuestionId(questionId);
            resultType = result.getResultType();
        }
        memberFinalResult.createMemberFinalResult(testKey, resultType); //경우 분류로 의해 나눠진 resultType을 회원 최종 결과 응답지에 저장
        memberFinalResultRepository.save(memberFinalResult);
    }

    @Override
    public Map<String, Object> viewResult(String testKey) {
        MemberFinalResult result = memberFinalResultRepository.findByTestKey(testKey);
        String campus = secondSectionResponseRepository.findByTestKey(testKey).get().getCampus();
        List<FinalResult> finalResults;
        if (campus.equals("서울") || campus.equals("글로벌")) {
            //변수 campus에 캠퍼스명이 담겨있고, 해당 캠퍼스명과 같은 캠퍼스명을 갖는 학과 도출 조건
            if(campus.equals("서울") && result.getResultType().equals("H1")){
                System.out.println("humanity exception");
                return humanityCampusException(testKey); //인문학섹터 서울캠 존재 X 예외처리
            }
            else if ((campus.equals("서울") && result.getResultType().equals("SC1")) || (campus.equals("서울") && result.getResultType().equals("SC2"))) {
                return scienceCampusException(testKey); //자연과학 섹터 서울캠 존재 X 예외처리
            }
            else if ((campus.equals("글로벌") && result.getResultType().equals("SO5")) || (campus.equals("글로벌") && result.getResultType().equals("SO4"))) {
                return socialCampusException(testKey); //사회경제학 섹터 서울캠 존재 X 예외처리
            }
            finalResults = majorDetailRepository.findByResultTypeWithCampus(result.getResultType(), campus);
        }
        else{
            //캠퍼스 교차 여부 상관 없는 사용자에게 도출 조건
            finalResults = majorDetailRepository.findByResultTypeWithoutCampus(result.getResultType());
        }
        List<Map> list = new ArrayList<>();
        for (int i = 0; i < finalResults.size(); i++) {
            Map<String, Object> results = new LinkedHashMap<>();
            FinalResult finalResult = finalResults.get(i);
            results.put("departmentName", finalResult.getDepartmentName());
            results.put("campus", finalResult.getCampus());
            results.put("intro", finalResult.getIntro());
            results.put("degree", finalResult.getDegree());
            results.put("career", finalResult.getCareer());
            results.put("curriculum",finalResult.getCurriculum());
            results.put("certification",finalResult.getCertification());
            results.put("webPage", finalResult.getWebpage());
            results.put("phoneNum", finalResult.getPhoneNum());
            list.add(results);
        }
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("testKey", testKey);
        map.put("info", list);
        return map;
    }
    /*자연과학 섹터 서울 캠퍼스 존재 X 예외 처리*/
    private Map scienceCampusException(String testKey) {
        Map<String, Object> map = new LinkedHashMap<>();

        List<Map> list = new ArrayList<>();
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("departmentName", "죄송해요! 선택하신 자연과학 섹터 추천 학과 결과는 서울 캠퍼스에 없어요.");
        result.put("campus", null);
        result.put("intro", null);
        result.put("degree", null);
        result.put("career", null);
        result.put("curriculum",null);
        result.put("certification",null);
        result.put("webPage", null);
        list.add(result);

        map.put("testKey", testKey);
        map.put("info", list);
        return map;
    }

    /*사회경제학 섹터 글로벌 캠퍼스 존재 X 예외 처리*/
    private Map socialCampusException(String testKey) {
        Map<String, Object> map = new LinkedHashMap<>();

        List<Map> list = new ArrayList<>();
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("departmentName", "죄송해요! 선택하신 사회경제학 섹터 추천 학과 결과는 서울 캠퍼스에 없어요.");
        result.put("campus", null);
        result.put("intro", null);
        result.put("degree", null);
        result.put("career", null);
        result.put("curriculum",null);
        result.put("certification",null);
        result.put("webPage", null);
        list.add(result);

        map.put("testKey", testKey);
        map.put("info", list);
        return map;
    }
    /*인문학 섹터 서울 캠퍼스 존재 X 예외 처리*/
    private Map humanityCampusException(String testKey) {
        Map<String, Object> map = new LinkedHashMap<>();

        List<Map> list = new ArrayList<>();
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("departmentName", "죄송해요! 선택하신 인문학 섹터 추천 학과 결과는 서울 캠퍼스에 없어요.");
        result.put("campus", null);
        result.put("intro", null);
        result.put("degree", null);
        result.put("career", null);
        result.put("curriculum",null);
        result.put("certification",null);
        result.put("webPage", null);
        list.add(result);

        map.put("testKey", testKey);
        map.put("info", list);
        return map;
    }
}
