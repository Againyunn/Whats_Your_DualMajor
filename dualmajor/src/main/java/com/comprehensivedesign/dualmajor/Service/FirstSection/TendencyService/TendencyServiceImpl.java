package com.comprehensivedesign.dualmajor.Service.FirstSection.TendencyService;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResponse;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResult;
import com.comprehensivedesign.dualmajor.domain.sector.MemberSector;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.DualMajorName;
import com.comprehensivedesign.dualmajor.dto.FirstSectionQuestionDto;
import com.comprehensivedesign.dualmajor.repository.major.DualMajorRepository;
import com.comprehensivedesign.dualmajor.repository.MemberSectorRepository;
import com.comprehensivedesign.dualmajor.repository.firstSection.tendency.TendencyResponseRepository;
import com.comprehensivedesign.dualmajor.repository.firstSection.tendency.TendencyResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TendencyServiceImpl implements TendencyService{

    @Autowired private final MemberService memberService;
    @Autowired private final TendencyResponseRepository tendencyResponseRepository;
    @Autowired private final TendencyResultRepository tendencyResultRepository;
    @Autowired private final MemberSectorRepository memberSectorRepository;

    /*섹션 1 : 섹터 도출 로직*/
    @Override
    @Transactional
    public String resultProcess(FirstSectionQuestionDto firstSectionQuestionDto, String testKey) {
        String q = firstSectionQuestionDto.getQuestionNum();
        //Member member = memberService.findById(memberId); //응답 객체에 참조할 현재 서비스 이용중인 회원 객체 불러오기
        /*성향 우선 질문지에서 성향 관련 질문 :: q2~q13(총 12개)*/
        if (q.equals("2") || q.equals("3") || q.equals("4") || q.equals("5") || q.equals("6") || q.equals("7") || q.equals("8") || q.equals("9") || q.equals("10") || q.equals("11") || q.equals("12") || q.equals("13")) {
            if (q.equals("2")) {//최초 1회 응답이 들어오면 회원 객체를 포함하는 회원의 응답 객체(TendencyResponse) 생성해야함.
                TendencyResponse tendencyResponse = new TendencyResponse();
                tendencyResponse.createMemberResponse(testKey);
                tendencyResponseRepository.save(tendencyResponse);
            }
            mbtiProcess(firstSectionQuestionDto, testKey); //mbti 판별 로직으로 성향 관련 질문 응답 전달
        }
        /*진로 관련 질문 응답 과정*/
        else if (q.equals("14") || q.equals("15") || q.equals("16")) {
            TendencyResponse tendencyResponse = tendencyResponseRepository.findByTestKey(testKey);
            if (q.equals("14")) { //14번 문제
                tendencyResponse.setQ14(firstSectionQuestionDto.getAnswer());
            } else if (q.equals("15")) { //15번 문제
                tendencyResponse.setQ15(firstSectionQuestionDto.getAnswer());
            } else { //16번 문제
                tendencyResponse.setQ16(firstSectionQuestionDto.getAnswer());
                saveSector(tendencyResponse);//최종 응답까지 저장되면 회원 응답을 통해 결과 테이블에서 일치하는 객체(행)들 찾아내기
                return "end";
            }
        }
        return "not end"; //매 응답에 의한 로직이 잘 처리되면 true 반환
    }

    @Override
    @Transactional
    public String mbtiProcess(FirstSectionQuestionDto firstSectionQuestionDto, String testKey) {
        String q = firstSectionQuestionDto.getQuestionNum();
        TendencyResponse tendencyResponse = tendencyResponseRepository.findByTestKey(testKey);//FK인 회원id 로 회원의 응답지 찾기
        tendencyResponse.setMbtiScoreLogic(Integer.parseInt(firstSectionQuestionDto.getAnswer()));//회원 테이블에 저장되는 mbti점수에 현재 들어온 응답 값 더해주기(+=)
        if (q.equals("4")) { //2,3,4번까지 문제 응답 후
            String mbti = tendencyResponse.getMbti(); //현재 회원 응답 객체에 저장되어있는 mbti 상태 반환
            if (tendencyResponse.getMbtiScore() > 4) { //"e"성향 질문에 두개 이상 응답했으면 회원 응답지 mbti항목에 "e"추가
                tendencyResponse.setMbti(mbti += "I");
            }
            else{tendencyResponse.setMbti(mbti += "E");}
            tendencyResponse.clearMbtiScore(); //세 문제의 응답을 통한 mbti 요소 산출이 완료되면 저장되어있는 mbti점수 초기화
        }
        else if (q.equals("7")) { //5,6,7번까지 문제 응답 후
            String mbti = tendencyResponse.getMbti();
            if (tendencyResponse.getMbtiScore() > 4) { //"e"성향 질문에 두개 이상 응답했으면 회원 응답지 mbti항목에 "n"추가
                tendencyResponse.setMbti(mbti += "N");
            }
            else{tendencyResponse.setMbti(mbti += "S");}
            tendencyResponse.clearMbtiScore();
        }
        else if (q.equals("10")) { //8,9,10번까지 문제 응답 후
            String mbti = tendencyResponse.getMbti();
            if (tendencyResponse.getMbtiScore() > 4) { //"e"성향 질문에 두개 이상 응답했으면 회원 응답지 mbti항목에 "t"추가
                tendencyResponse.setMbti(mbti += "T");
            }
            else{tendencyResponse.setMbti(mbti += "F");}
            tendencyResponse.clearMbtiScore();
        }
        else if (q.equals("13")) { //11,12,13번까지 문제 응답 후
            String mbti = tendencyResponse.getMbti();
            if (tendencyResponse.getMbtiScore() > 4) { //"e"성향 질문에 두개 이상 응답했으면 회원 응답지 mbti항목에 "p"추가
                tendencyResponse.setMbti(mbti += "P");
            }
            else{tendencyResponse.setMbti(mbti += "J");}
            tendencyResponse.clearMbtiScore();
            return tendencyResponse.getMbti(); //완성된 mbti 반환
        }
        return "ok"; //일반 결과
    }
    /*회원 응답에 따른 결과 Sector 찾기*/
    @Override
    @Transactional
    public boolean saveSector(TendencyResponse tendencyResponse){
        ArrayList<TendencyResult> result = tendencyResultRepository.findByMbtiAndQ14AndQ15AndQ16(tendencyResponse.getMbti(), tendencyResponse.getQ14(), tendencyResponse.getQ15(), tendencyResponse.getQ16());
        if (result.isEmpty()) {
            return false; //추천된 섹터가 없으면 재시도 요청
        }
        for (int i = 0; i < result.size(); i++) { //회원에게 추천된 섹터 결과만큼 MemberSector 객체 생성하여 회원과 결과 하나의 행으로 저장
            MemberSector memberSector = new MemberSector();
            memberSector.saveSector(tendencyResponse.getTestKey(), result.get(i).getSector());
            memberSectorRepository.save(memberSector);
        }
        return true;
    }




}
