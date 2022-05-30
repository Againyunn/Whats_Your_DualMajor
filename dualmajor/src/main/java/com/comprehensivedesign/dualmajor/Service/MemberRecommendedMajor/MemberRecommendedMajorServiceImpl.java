package com.comprehensivedesign.dualmajor.Service.MemberRecommendedMajor;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.MemberRecommendedMajor;
import com.comprehensivedesign.dualmajor.domain.secondSection.MajorDetail;
import com.comprehensivedesign.dualmajor.domain.secondSection.MemberFinalResult;
import com.comprehensivedesign.dualmajor.dto.FinalResult;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.dto.SaveFinalResultDto;
import com.comprehensivedesign.dualmajor.repository.CannotRepository;
import com.comprehensivedesign.dualmajor.repository.MemberRecommendedMajorRepository;
import com.comprehensivedesign.dualmajor.repository.major.DualMajorRepository;
import com.comprehensivedesign.dualmajor.repository.secondSection.MajorDetailRepository;
import com.comprehensivedesign.dualmajor.repository.secondSection.MemberFinalResultRepository;
import com.comprehensivedesign.dualmajor.repository.secondSection.SecondSectionResponseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberRecommendedMajorServiceImpl implements MemberRecommendedMajorService{

    @Autowired private final MemberService memberService;
    @Autowired private final MemberRecommendedMajorRepository memberRecommendedMajorRepository;


    @Override
    @Transactional
    public boolean saveResult(SaveFinalResultDto saveFinalResultDto) throws Exception { //회원 최종 추전 결과 저장 로직
        System.out.println("user in memberrecommendedmajorservice : "+saveFinalResultDto.getUser());
        Member member = memberService.find(saveFinalResultDto.getUser() + "@hufs.ac.kr"); //요청된 회원의 id?로 회원 객체 조회
        MemberRecommendedMajor memberRecommendedMajor = new MemberRecommendedMajor();
        memberRecommendedMajor.createMemberRecommendedMajor(saveFinalResultDto.getDepartmentName(), member);
        memberRecommendedMajorRepository.save(memberRecommendedMajor);
        return true;
    }
}
