package com.comprehensivedesign.dualmajor.Service.TendencyService;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.Tendency.TendencyResponse;
import com.comprehensivedesign.dualmajor.domain.Tendency.TendencyResult;
import com.comprehensivedesign.dualmajor.dto.TendencyDto;
import com.comprehensivedesign.dualmajor.repository.TendencyResponseRepository;
import com.comprehensivedesign.dualmajor.repository.TendencyResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TendencyServiceImpl implements TendencyService{

    @Autowired private final MemberService memberService;
    @Autowired private final TendencyResponseRepository tendencyResponseRepository;
    @Autowired private final TendencyResultRepository tendencyResultRepository;

    /*이중전공 추천 로직*/
    @Override
    public Object resultProcess(TendencyDto tendencyDto, Long memberId) {
        String q = tendencyDto.getQuestionNum();
        Member member = memberService.findById(memberId); //응답 객체에 참조할 현재 서비스 이용중인 회원 객체 불러오기
        /*성향 우선 질문지에서 성향 관련 질문 :: q2~q13(총 12개)*/
        //최초 1회 응답이 들어오면 회원 객체를 포함하는 회원의 응답 객체 생성해야함.
        if (q == "2"||q=="3" || q=="4" || q=="5"|| q=="6"|| q=="7"|| q=="8"|| q=="9"|| q=="10"|| q=="11"|| q=="12"|| q=="13") {
            String mbti = mbtiProcess(tendencyDto, memberId);
            if (mbti != "ok") {
                ArrayList<TendencyResult> byMbti = tendencyResultRepository.findByMbti(mbti);
                TendencyResponse tendencyResponse = tendencyResponseRepository.findByMemberId(memberId);
                tendencyResponse.setMbti(mbti,byMbti); //회원 응답 객체에 산출된 mbti와 mbti로 select한 결과 객체들 저장
            }
        }
        /*진로 질문부터는 한 질문의 응답 마다 회원의 응답 객체의 걸러진 결과 객체에서 같은 응답인 객체들을 다시 추려내는 과정*/
        else if (q=="14"|| q=="15"|| q=="16") {
            TendencyResponse tendencyResponse = tendencyResponseRepository.findByMemberId(memberId);
            if (q=="14") { //14번 문제
                ArrayList<TendencyResult> results = new ArrayList<>();
                for (int i = 0; i < tendencyResponse.getResults().size(); i++) {//mbti가 같은 객체만 뽑아서 저장한 resulst 리스트에서, 14번 문제의 응답과 같은 결과를 갖고있는 객체를 다시 걸러내는 작업
                    if (tendencyDto.getAnswer() == tendencyResponse.getResults().get(i).getQ14()) {//응답된 14번 문제 답 == 응답 테이블의 결과 객체의 14번문제
                        results.add(tendencyResponse.getResults().get(i));//리스트에 저장
                    }
                }
                tendencyResponse.whileCarrier(results);
            }
            else if (q == "15") { //15번 문제
                ArrayList<TendencyResult> results = new ArrayList<>();
                for (int i = 0; i < tendencyResponse.getResults().size(); i++) {//mbti가 같은 객체만 뽑아서 저장한 resulst 리스트에서, 15번 문제의 응답과 같은 결과를 갖고있는 객체를 다시 걸러내는 작업
                    if (tendencyDto.getAnswer() == tendencyResponse.getResults().get(i).getQ15()) {//응답된 15번 문제 답 == 응답 테이블의 결과 객체의 15번문제
                        results.add(tendencyResponse.getResults().get(i));//리스트에 저장
                    }
                }
                tendencyResponse.whileCarrier(results);
            }
            else{ //16번 문제
                ArrayList<TendencyResult> results = new ArrayList<>();
                for (int i = 0; i < tendencyResponse.getResults().size(); i++) {//mbti가 같은 객체만 뽑아서 저장한 resulst 리스트에서, 16번 문제의 응답과 같은 결과를 갖고있는 객체를 다시 걸러내는 작업
                    if (tendencyDto.getAnswer() == tendencyResponse.getResults().get(i).getQ16()) {//응답된 16번 문제 답 == 응답 테이블의 결과 객체의 16번문제
                        results.add(tendencyResponse.getResults().get(i));//리스트에 저장
                    }
                }
                tendencyResponse.whileCarrier(results);
            }
        }
        return true; //매 응답에 의한 로직이 잘 처리되면 true 반환
    }

    @Override
    public String mbtiProcess(TendencyDto tendencyDto, Long memberId) {
        String q = tendencyDto.getQuestionNum();
        TendencyResponse tendencyResponse = tendencyResponseRepository.findByMemberId(memberId);//FK인 회원id 로 회원의 응답지 찾기
        Member member = memberService.findById(memberId);
        member.setMbtiScoreLogic(Integer.parseInt(tendencyDto.getAnswer()));//회원 테이블에 저장되는 mbti점수에 현재 들어온 응답 값 더해주기(+=)
        if (q == "4") { //2,3,4번까지 문제 응답 후
            String mbti = tendencyResponse.getMbti();
            if (member.getMbtiScore() > 4) { //"e"성향 질문에 두개 이상 응답했으면 회원 응답지 mbti항목에 "e"추가
                tendencyResponse.setMbti(mbti += "e");
            }
            else{tendencyResponse.setMbti(mbti += "i");}
            member.clearMbtiScore(); //세 문제의 응답을 통한 mbti 요소 산출이 완료되면 저장되어있는 mbti점수 초기화
        }
        else if (q == "7") { //5,6,7번까지 문제 응답 후
            String mbti = tendencyResponse.getMbti();
            if (member.getMbtiScore() > 4) { //"e"성향 질문에 두개 이상 응답했으면 회원 응답지 mbti항목에 "n"추가
                tendencyResponse.setMbti(mbti += "n");
            }
            else{tendencyResponse.setMbti(mbti += "s");}
            member.clearMbtiScore();
        }
        else if (q == "10") { //8,9,10번까지 문제 응답 후
            String mbti = tendencyResponse.getMbti();
            if (member.getMbtiScore() > 4) { //"e"성향 질문에 두개 이상 응답했으면 회원 응답지 mbti항목에 "t"추가
                tendencyResponse.setMbti(mbti += "t");
            }
            else{tendencyResponse.setMbti(mbti += "f");}
            member.clearMbtiScore();
        }
        else if (q == "13") { //11,12,13번까지 문제 응답 후
            String mbti = tendencyResponse.getMbti();
            if (member.getMbtiScore() > 4) { //"e"성향 질문에 두개 이상 응답했으면 회원 응답지 mbti항목에 "p"추가
                tendencyResponse.setMbti(mbti += "p");
            }
            else{tendencyResponse.setMbti(mbti += "j");}
            member.clearMbtiScore();
            return tendencyResponse.getMbti(); //완성된 mbti 반환
        }
        return "ok"; //일반 결과
    }
}
