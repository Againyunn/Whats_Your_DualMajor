package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.FirstSection.CarrierSevice.CarrierService;
import com.comprehensivedesign.dualmajor.Service.FirstSection.FirstSectionDivisionService.FirstSectionDivisionService;
import com.comprehensivedesign.dualmajor.Service.FirstSection.MemberSector.MemberSectorService;
import com.comprehensivedesign.dualmajor.Service.FirstSection.TendencyService.TendencyService;
import com.comprehensivedesign.dualmajor.Service.MajorService.MajorService;
import com.comprehensivedesign.dualmajor.config.auth.MemberAdapter;
import com.comprehensivedesign.dualmajor.domain.firstSection.Carrier.CarrierQuestion;
import com.comprehensivedesign.dualmajor.domain.firstSection.Tendency.TendencyQuestion;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.FirstSectionDto;
import com.comprehensivedesign.dualmajor.dto.FirstSectionQuestionDto;
import com.comprehensivedesign.dualmajor.repository.firstSection.carrier.CarrierQuestionRepository;
import com.comprehensivedesign.dualmajor.repository.firstSection.tendency.TendencyQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class TendencyController {
    @Autowired private final FirstSectionDivisionService firstSectionDivisionService;
    @Autowired private final TendencyQuestionRepository tendencyQuestionRepository;
    @Autowired private final TendencyService tendencyService;
    @Autowired private final CarrierQuestionRepository carrierQuestionRepository;
    @Autowired private final CarrierService carrierService;
    @Autowired private final MajorService majorService;
    @Autowired private final MemberSectorService memberSectorService;


    /*질문 요청*/
    @GetMapping("/firstSectionQuestion")
    public Object firstSectionQuestion(@RequestBody FirstSectionQuestionDto firstSectionQuestionDto,
                                       @AuthenticationPrincipal MemberAdapter memberAdapter) {
        FirstSectionQuestionDto questionAPI = new FirstSectionQuestionDto();
        String response = firstSectionDivisionService.findResponse(memberAdapter.getMember().getId());
        if (firstSectionQuestionDto.getQuestionNum().equals("1") || response.equals("1")) { //1번 문제 요청이거나, 1번 문제에서 성향 관련 응답을 한 경우
            TendencyQuestion byQuestionNum = tendencyQuestionRepository.findByQuestionNum(firstSectionQuestionDto.getQuestionNum());//프론트에서 요청한 질문 번호를 기준으로 해당 질문으로 조회한 해당 질문 정보들
            questionAPI.setQuestionData(byQuestionNum.getQuestionNum(), byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
            return questionAPI.getQuestionData(); //요청한 질문 번호에 대한 질문 정보들 응답
        }
        else{ //1번 문제 요청도 아니고, 1번 문항에 대하여 진로 관련 질문지를 고른 경우
            CarrierQuestion byQuestionNum = carrierQuestionRepository.findByQuestionNum(firstSectionQuestionDto.getQuestionNum());
            questionAPI.setQuestionData(byQuestionNum.getQuestionNum(), byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
            return questionAPI.getQuestionData(); //요청한 질문 번호에 대한 질문 정보들 응답
        }
    }
    /*사용자 응답 전송*/
    @PostMapping("/firstSectionAnswer")
    public Object firstSectionAnswer(@RequestBody FirstSectionQuestionDto firstSectionQuestionDto,
                                     @AuthenticationPrincipal MemberAdapter memberAdapter) throws Exception{//현재 인증된 회원이라면 회원 정보 불러오기
        Map<String, Boolean> map = new HashMap<>();
        if (firstSectionQuestionDto.getQuestionNum().equals("1")) {
            firstSectionDivisionService.createResponse(memberAdapter.getMember().getId(), firstSectionQuestionDto.getAnswer());
            map.put("success", true);
            return map;
        }
        else{ // 1번문제 이후 성향 vs 진로에 따른 로직
            String response = firstSectionDivisionService.findResponse(memberAdapter.getMember().getId());
            boolean b;
            if (response.equals("1")) { //성향 관련 질문 로직
                b = tendencyService.resultProcess(firstSectionQuestionDto, memberAdapter.getMember().getId());
                if (b == true) {map.put("success", true);}
                else{map.put("success", false);}

            }
            else if (response.equals("2")) { //진로 관련 질문 로직
                System.out.println("go to carrier response");
                b = carrierService.resultProcess(firstSectionQuestionDto, memberAdapter.getMember().getId());
                if (b == true) {map.put("success", true);}
                else{map.put("success", false);}

            }
            return map;
        }
    }

    /*섹터 추천 최종 결과 요청*/
    @PostMapping("/firstSectionResult")
    public Map viewMemberSector(@RequestBody FirstSectionDto firstSectionDto, @AuthenticationPrincipal MemberAdapter memberAdapter) throws Exception {
        if(firstSectionDto.getResultType().equals("result20")){
            List<Sector> memberSector;
            Map<Long, List> dualMajor;
            try {
                memberSector = memberSectorService.findMemberSector(memberAdapter.getMember().getId());
                dualMajor = majorService.findDualMajor(memberAdapter.getMember().getId());
            } catch (Exception e) {
                Map<String, Boolean> map = new HashMap<>();
                map.put("findSectors", false);
                return map;
            }
            FirstSectionDto firstSectionApi = new FirstSectionDto();
            firstSectionApi.setMemberSectorApi(memberSector, dualMajor);
            return firstSectionApi.getMemberSectorApi();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("accessed",false);
        return map;
    }
}
