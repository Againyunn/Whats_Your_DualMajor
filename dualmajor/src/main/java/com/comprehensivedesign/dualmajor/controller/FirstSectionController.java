package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.FirstSection.CarrierSevice.CarrierService;
import com.comprehensivedesign.dualmajor.Service.FirstSection.FirstSectionDivisionService.FirstSectionDivisionService;
import com.comprehensivedesign.dualmajor.Service.FirstSection.MemberSector.MemberSectorService;
import com.comprehensivedesign.dualmajor.Service.FirstSection.TendencyService.TendencyService;
import com.comprehensivedesign.dualmajor.Service.MajorService.MajorService;
import com.comprehensivedesign.dualmajor.config.auth.MemberAdapter;
import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CareerQuestion;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyQuestion;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.FirstSectionDto;
import com.comprehensivedesign.dualmajor.dto.FirstSectionQuestionDto;
import com.comprehensivedesign.dualmajor.repository.firstSection.carrier.CareerQuestionRepository;
import com.comprehensivedesign.dualmajor.repository.firstSection.tendency.TendencyQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequiredArgsConstructor
public class FirstSectionController {
    @Autowired private final FirstSectionDivisionService firstSectionDivisionService;
    @Autowired private final TendencyQuestionRepository tendencyQuestionRepository;
    @Autowired private final TendencyService tendencyService;
    @Autowired private final CareerQuestionRepository carrierQuestionRepository;
    @Autowired private final CarrierService carrierService;
    @Autowired private final MajorService majorService;
    @Autowired private final MemberSectorService memberSectorService;

    /*이중전공 설문용 testKey 생성*/
    //랜덤 4자리 정수 + 사용자가 테스트를 요청한 시각
    public String createTestKey() {
        /*사용자의 요청이 들어온 시간*/
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar now = Calendar.getInstance();
        String time = sdf.format(now.getTime());
        Random random = new Random();
        int i = random.nextInt(9999);
        String key = Integer.toString(i);
        String testKey = time +","+ key;
        return testKey;
    }

    /* 임의의 새로운 테스트 키 발급 */
    @PostMapping("/testKey")
    public Object getTestKey() {
        Map<String, Object> map = new HashMap<>();
        map.put("testKey", createTestKey());
        return map;
    }

    /*질문 요청*/
    @PostMapping("/firstSectionQuestion")
    public Object firstSectionQuestion(@RequestBody FirstSectionQuestionDto firstSectionQuestionDto) {
        FirstSectionQuestionDto questionAPI = new FirstSectionQuestionDto();
        //String response = firstSectionDivisionService.findResponse(firstSectionQuestionDto.getTestKey());
        //1번 문제 요청이거나
        /*if (firstSectionQuestionDto.getQuestionNum().equals("0")) {
            String testKey = createTestKey();//질문에 대한 첫 응답 처리 시 임의의 테스트 값을 생성하여 부여. 이 testKey로 추천 로직 마지막까지 진행
            Map<String, String> map = new LinkedHashMap<>();
            map.put("testKey",testKey);
            System.out.println("questionNum IN Q0: "+firstSectionQuestionDto.getQuestionNum());
            System.out.println("testKey : "+firstSectionQuestionDto.getTestKey());
            return map;
        }*/
       /* if (firstSectionQuestionDto.getQuestionNum().equals("1")) {
            TendencyQuestion byQuestionNum = tendencyQuestionRepository.findByQuestionNum(firstSectionQuestionDto.getQuestionNum());//프론트에서 요청한 질문 번호를 기준으로 해당 질문으로 조회한 해당 질문 정보들
            String testKey = createTestKey();//질문에 대한 첫 응답 처리 시 임의의 테스트 값을 생성하여 부여. 이 testKey로 추천 로직 마지막까지 진행
            System.out.println("questionNum  IN Q1: "+firstSectionQuestionDto.getQuestionNum());
            System.out.println("testKey : "+firstSectionQuestionDto.getTestKey());
            *//*String testKey = createTestKey();//질문에 대한 첫 응답 처리 시 임의의 테스트 값을 생성하여 부여. 이 testKey로 추천 로직 마지막까지 진행
            System.out.println("AtfirstQ"+testKey);*//*
            questionAPI.setQuestionData(testKey, byQuestionNum.getQuestionNum(), byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
            //questionAPI.setQuestionData(testKey, byQuestionNum.getQuestionNum(), byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
            return questionAPI.getQuestionData();
        }
        else if(firstSectionDivisionService.findResponse(firstSectionQuestionDto.getTestKey()).equals("1")){//성향관련질문
            TendencyQuestion byQuestionNum = tendencyQuestionRepository.findByQuestionNum(firstSectionQuestionDto.getQuestionNum());//프론트에서 요청한 질문 번호를 기준으로 해당 질문으로 조회한 해당 질문 정보들
            System.out.println("questionNum : In  Tendency case "+firstSectionQuestionDto.getQuestionNum());
            System.out.println("testKey : "+firstSectionQuestionDto.getTestKey());
            questionAPI.setQuestionData(firstSectionQuestionDto.getTestKey(), byQuestionNum.getQuestionNum(), byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
            return questionAPI.getQuestionData();
        }
        else{ //진로관련질문
            System.out.println("questionNum in  Career case: "+firstSectionQuestionDto.getQuestionNum());
            System.out.println("testKey : "+firstSectionQuestionDto.getTestKey());
            CareerQuestion byQuestionNum = carrierQuestionRepository.findByQuestionNum(firstSectionQuestionDto.getQuestionNum());
            questionAPI.setQuestionData(firstSectionQuestionDto.getTestKey(), byQuestionNum.getQuestionNum(), byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
            return questionAPI.getQuestionData();
        }*/
        if (firstSectionQuestionDto.getQuestionNum().equals("1") || firstSectionDivisionService.findResponse(firstSectionQuestionDto.getTestKey()).equals("1")) { //1번 문제 요청이거나, 1번 문제에서 성향 관련 응답을 한 경우
            TendencyQuestion byQuestionNum = tendencyQuestionRepository.findByQuestionNum(firstSectionQuestionDto.getQuestionNum());//프론트에서 요청한 질문 번호를 기준으로 해당 질문으로 조회한 해당 질문 정보들
            if (firstSectionQuestionDto.getQuestionNum().equals("1")) { //1번 문제 요청 시 사용자의 임시 테스트값 생성 후  api에 반환
                String testKey = createTestKey();//질문에 대한 첫 응답 처리 시 임의의 테스트 값을 생성하여 부여. 이 testKey로 추천 로직 마지막까지 진행
                questionAPI.setQuestionData(testKey, byQuestionNum.getQuestionNum(), "16", byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
            }
            else if(firstSectionDivisionService.findResponse(firstSectionQuestionDto.getTestKey()).equals("1")){// 1번 문제에서 성향 관련 응답을 한 경우
                questionAPI.setQuestionData(firstSectionQuestionDto.getTestKey(), byQuestionNum.getQuestionNum(), "16", byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());}
            return questionAPI.getQuestionData(); //요청한 질문 번호에 대한 질문 정보들 응답
        }
        else if(!firstSectionQuestionDto.getQuestionNum().equals("1") && firstSectionDivisionService.findResponse(firstSectionQuestionDto.getTestKey()).equals("2")){ //1번 문제 요청도 아니고, 1번 문항에 대하여 진로 관련 질문지를 고른 경우
            CareerQuestion byQuestionNum = carrierQuestionRepository.findByQuestionNum(firstSectionQuestionDto.getQuestionNum());
            questionAPI.setQuestionData(firstSectionQuestionDto.getTestKey(), byQuestionNum.getQuestionNum(), "13", byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
            return questionAPI.getQuestionData(); //요청한 질문 번호에 대한 질문 정보들 응답
        }
        return false;
    }
    /*사용자 응답 전송*/
    @PostMapping("/firstSectionAnswer")
    public Object firstSectionAnswer(@RequestBody FirstSectionQuestionDto firstSectionQuestionDto) throws Exception{//현재 인증된 회원이라면 회원 정보 불러오기
        Map<String, Object> map = new HashMap<>();
        if (firstSectionQuestionDto.getQuestionNum().equals("1")) {
            firstSectionDivisionService.createResponse(firstSectionQuestionDto.getTestKey(), firstSectionQuestionDto.getAnswer());
            map.put("testKey", firstSectionQuestionDto.getTestKey());
            map.put("success", true);
            map.put("finished", false);
        }
        else{ // 1번문제 이후 성향 vs 진로에 따른 로직
            String response = firstSectionDivisionService.findResponse(firstSectionQuestionDto.getTestKey());
            String process;
            if (response.equals("1")) { //성향 관련 질문 로직
                process = tendencyService.resultProcess(firstSectionQuestionDto, firstSectionQuestionDto.getTestKey());}
            else{ //진로 관련 질문 로직
                process = carrierService.resultProcess(firstSectionQuestionDto, firstSectionQuestionDto.getTestKey());}

            /* 로직 성공 유무 처리 */
            if (process.equals("not end")) {
                map.put("testKey",firstSectionQuestionDto.getTestKey());
                map.put("success", true);
                map.put("finished", false);
            }
            else if(process.equals("end")){
                map.put("testKey",firstSectionQuestionDto.getTestKey());
                map.put("success", true);
                map.put("finished", "result20");
            }
            else{
                map.put("success", false);
            }
        }
        return map;
    }

    /*섹터 추천 최종 결과 요청*/
    @PostMapping("/getFirstSectionResult")
    public Map viewMemberSector(@RequestBody FirstSectionDto firstSectionDto) throws Exception {
        if(firstSectionDto.getResultType().equals("result20")){
            List<Sector> memberSector = memberSectorService.findMemberSector(firstSectionDto.getTestKey());
            Map<Long, List> dualMajor = majorService.findDualMajor(firstSectionDto.getTestKey());
            FirstSectionDto firstSectionApi = new FirstSectionDto();
            firstSectionApi.setMemberSectorApi(memberSector, dualMajor, firstSectionDto.getTestKey());
            return firstSectionApi.getMemberSectorApi();
            /*try {
                memberSector = memberSectorService.findMemberSector(firstSectionDto.getTestKey());
                dualMajor = majorService.findDualMajor(firstSectionDto.getTestKey());
            } catch (Exception e) {
                Map<String, Boolean> map = new HashMap<>();
                map.put("findSectors", false);
                return map;
            }
            FirstSectionDto firstSectionApi = new FirstSectionDto();
            firstSectionApi.setMemberSectorApi(memberSector, dualMajor, firstSectionDto.getTestKey());
            return firstSectionApi.getMemberSectorApi();*/
        }
        Map<String, Object> map = new HashMap<>();
        map.put("accessed",false);
        return map;
    }
}
