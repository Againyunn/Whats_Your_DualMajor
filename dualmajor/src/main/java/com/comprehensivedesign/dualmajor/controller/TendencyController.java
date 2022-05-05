package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.TendencyService.TendencyService;
import com.comprehensivedesign.dualmajor.config.auth.MemberAdapter;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.Tendency.TendencyQuestion;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.dto.FirstSectionDto;
import com.comprehensivedesign.dualmajor.dto.TendencyDto;
import com.comprehensivedesign.dualmajor.repository.TendencyQuestionRepository;
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

    @Autowired private final TendencyQuestionRepository tendencyQuestionRepository;
    @Autowired private final TendencyService tendencyService;

    /*질문 요청*/
    @GetMapping("/firstSectionQuestion")
    public Object firstSectionQuestion(@RequestBody TendencyDto tendencyDto) {
        TendencyQuestion byQuestionNum = tendencyQuestionRepository.findByQuestionNum(tendencyDto.getQuestionNum());//프론트에서 요청한 질문 번호를 기준으로 해당 질문으로 조회한 해당 질문 정보들
        TendencyDto questionAPI = new TendencyDto();
        questionAPI.setQuestionData(byQuestionNum.getQuestionNum(), byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
        return questionAPI.getQuestionData(); //요청한 질문 번호에 대한 질문 정보들 응답
    }
    /*사용자 응답 전송*/
    @PostMapping("/firstSectionAnswer")
    public Object firstSectionAnswer(@RequestBody TendencyDto tendencyDto,
                                     @AuthenticationPrincipal MemberAdapter memberAdapter) {//현재 인증된 회원이라면 회원 정보 불러오기
        boolean b = tendencyService.resultProcess(tendencyDto, memberAdapter.getMember().getId());
        Map<String, Boolean> map = new HashMap<>();
        if (b == true) {
            map.put("success", true);
        }
        else{
            map.put("success", false);
        }
        return map;
    }
    /*섹터 추천 최종 결과 요청*/
    @GetMapping("/firstSectionResult")
    public Map viewMemberSector(@AuthenticationPrincipal MemberAdapter memberAdapter) throws Exception{
        List<Sector> memberSector;
        try {
            memberSector = tendencyService.findMemberSector(memberAdapter.getMember().getId());
        } catch (Exception e) {
            Map<String, Boolean> map = new HashMap<>();
            map.put("findSectors", false);
            return map;
        }
        FirstSectionDto firstSectionApi = new FirstSectionDto();
        firstSectionApi.setMemberSectorApi(memberSector);
        return firstSectionApi.getMemberSectorApi();

    }
}
