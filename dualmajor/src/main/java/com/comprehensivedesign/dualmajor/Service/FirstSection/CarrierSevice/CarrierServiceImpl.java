package com.comprehensivedesign.dualmajor.Service.FirstSection.CarrierSevice;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CareerResponse;
import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarееrResult;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyResult;
import com.comprehensivedesign.dualmajor.domain.sector.MemberSector;
import com.comprehensivedesign.dualmajor.dto.FirstSectionQuestionDto;
import com.comprehensivedesign.dualmajor.repository.MemberSectorRepository;
import com.comprehensivedesign.dualmajor.repository.firstSection.carrier.CareerResponseRepository;
import com.comprehensivedesign.dualmajor.repository.firstSection.carrier.CareerResultRepository;
import com.comprehensivedesign.dualmajor.repository.major.DualMajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CarrierServiceImpl implements CarrierService{
    @Autowired private final MemberService memberService;
    @Autowired private final CareerResponseRepository carrierResponseRepository;
    @Autowired private final CareerResultRepository carrierResultRepository;
    @Autowired private final MemberSectorRepository memberSectorRepository;
    @Autowired private final DualMajorRepository dualMajorRepository;

    @Override
    @Transactional
    public String resultProcess(FirstSectionQuestionDto firstSectionQuestionDto, String testKey) {
        String q = firstSectionQuestionDto.getQuestionNum();
        /*진로 우선 질문지에서 성향 관련 질문 :: q2~q5(총 4개)*/
        if (q.equals("2") || q.equals("3") || q.equals("4") || q.equals("5")) {
            if (q.equals("2")) {//최초 1회 응답이 들어오면 회원 객체를 포함하는 회원의 응답 객체(CarrierResponse) 생성해야함.
                CareerResponse carrierResponse = new CareerResponse();
                carrierResponse.createMemberResponse(testKey);
                carrierResponseRepository.save(carrierResponse);
            }
            mbtiProcess(firstSectionQuestionDto, testKey); //mbti 판별 로직으로 성향 관련 질문 응답 전달
        }
        /*진로 관련 질문 응답 과정 ::q6~q12(총7개)*/
        else if (q.equals("6") || q.equals("7") || q.equals("8") || q.equals("9") || q.equals("10") || q.equals("11") || q.equals("12")) {
            CareerResponse carrierResponse = carrierResponseRepository.findByTestKey(testKey);
            if (q.equals("6")) {
                carrierResponse.setQ6(firstSectionQuestionDto.getAnswer());
            } else if (q.equals("7")) {
                carrierResponse.setQ7(firstSectionQuestionDto.getAnswer());
            }
            else if (q.equals("8")) {
                carrierResponse.setQ8(firstSectionQuestionDto.getAnswer());
            }
            else if (q.equals("9")) {
                carrierResponse.setQ9(firstSectionQuestionDto.getAnswer());
            }
            else if (q.equals("10")) {
                carrierResponse.setQ10(firstSectionQuestionDto.getAnswer());
            }
            else if (q.equals("11")) {
                carrierResponse.setQ11(firstSectionQuestionDto.getAnswer());
            }
            else if (q.equals("12")){
                carrierResponse.setQ12(firstSectionQuestionDto.getAnswer());
                saveSector(carrierResponse);//최종 응답까지 저장되면 회원 응답을 통해 결과 테이블에서 일치하는 객체(행)들 찾아내기
                return "end";
            }
        }
        return "not end"; //매 응답에 의한 로직이 잘 처리되면 true 반환
    }

    @Override
    @Transactional
    public String mbtiProcess(FirstSectionQuestionDto firstSectionQuestionDto, String testKey) {
        String q = firstSectionQuestionDto.getQuestionNum();
        CareerResponse carrierResponse = carrierResponseRepository.findByTestKey(testKey);//FK인 회원id 로 회원의 응답지 찾기
        /*진로 관련 질문지에서 성향 관련 잘문은 각 항목당 하나이므로, 사용자 응답에 따라 바로바로 mbti 요소판별 가능*/
        if (q.equals("2")) { //2번 e-i
            String mbti = carrierResponse.getMbti(); //현재 회원 응답 객체에 저장되어있는 mbti 상태 반환
            if (firstSectionQuestionDto.getAnswer().equals("2")) { //"e":"1" , "i":"2"
                carrierResponse.setMbti(mbti += "I");
            }
            else{carrierResponse.setMbti(mbti += "E");}
        }
        else if (q.equals("3")) { //3번 n-s
            String mbti = carrierResponse.getMbti();
            if (firstSectionQuestionDto.getAnswer().equals("2")) { //"s":"1" , "n":"2"
                carrierResponse.setMbti(mbti += "N");
            }
            else{carrierResponse.setMbti(mbti += "S");}
        }
        else if (q.equals("4")) { //4번 t-f
            String mbti = carrierResponse.getMbti();
            if (firstSectionQuestionDto.getAnswer().equals("2")) { //"f":"1" , "p":"2"
                carrierResponse.setMbti(mbti += "T");
            }
            else{carrierResponse.setMbti(mbti += "F");}
        }
        else if (q.equals("5")) { //5번 p-j
            String mbti = carrierResponse.getMbti();
            if (firstSectionQuestionDto.getAnswer().equals("2")) { //"j":"1" , "p":"2"
                carrierResponse.setMbti(mbti += "P");
            }
            else{carrierResponse.setMbti(mbti += "J");}
            return carrierResponse.getMbti(); //완성된 mbti 반환
        }
        return "ok"; //일반 결과
    }

    @Override
    @Transactional
    public boolean saveSector(CareerResponse carrierResponse) {
        ArrayList<CarееrResult> result = carrierResultRepository.findByMbtiAndQ6AndQ7AndQ8AndQ9AndQ10AndQ11AndQ12(carrierResponse.getMbti(), carrierResponse.getQ6(), carrierResponse.getQ7(), carrierResponse.getQ8(), carrierResponse.getQ9(), carrierResponse.getQ10(), carrierResponse.getQ11(), carrierResponse.getQ12());
        if (result.isEmpty()) {
            return false; //추천된 섹터가 없으면 재시도 요청
        }
        for (int i = 0; i < result.size(); i++) { //회원에게 추천된 섹터 결과만큼 MemberSector 객체 생성하여 회원과 결과 하나의 행으로 저장
            MemberSector memberSector = new MemberSector();
            memberSector.saveSector(carrierResponse.getTestKey(), result.get(i).getSector());
            memberSectorRepository.save(memberSector);
        }
        return true;
    }
}
