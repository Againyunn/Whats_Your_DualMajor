package com.comprehensivedesign.dualmajor.controller;


import com.comprehensivedesign.dualmajor.Service.TendencyService.TendencyService;
import com.comprehensivedesign.dualmajor.config.auth.MemberAdapter;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.Tendency.TendencyQuestion;
import com.comprehensivedesign.dualmajor.dto.TendencyDto;
import com.comprehensivedesign.dualmajor.repository.TendencyQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TendencyController {

    @Autowired private final TendencyQuestionRepository tendencyQuestionRepository;
    @Autowired private final TendencyService tendencyService;

    @PostMapping("/firstSectionQuestion")
    public Object firstSectionQuestion(@RequestBody TendencyDto tendencyDto) {
        TendencyQuestion byQuestionNum = tendencyQuestionRepository.findByQuestionNum(tendencyDto.getQuestionNum());//프론트에서 요청한 질문 번호를 기준으로 해당 질문으로 조회한 해당 질문 정보들
        TendencyDto questionData = new TendencyDto();
        questionData.setQuestionData(byQuestionNum.getQuestionNum(), byQuestionNum.getQuestionContent(), byQuestionNum.getResponse1(), byQuestionNum.getResponse2());
        return questionData.getQuestionData(); //요청한 질문 번호에 대한 질문 정보들 응답
    }

    @PostMapping("/firstSectionAnswer")
    public Object firstSectionAnswer(@RequestBody TendencyDto tendencyDto,
                                     @AuthenticationPrincipal MemberAdapter memberAdapter) {//현재 인증된 회원이라면 회원 정보 불러오기
        tendencyService.resultProcess(tendencyDto, memberAdapter.getMember().getId());
        return "test";
    }

}
