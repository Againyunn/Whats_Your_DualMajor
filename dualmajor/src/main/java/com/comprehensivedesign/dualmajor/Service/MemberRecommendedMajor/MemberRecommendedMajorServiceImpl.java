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
    public boolean saveResult(String user, String departmentName) throws Exception { //회원 최종 추전 결과 저장 로직
        Member member = memberService.find(user + "@hufs.ac.kr"); //요청된 회원의 id?로 회원 객체 조회
        if (memberRecommendedMajorRepository.findByMemberId(member.getId()).isPresent()) { //이미 해당 계정으로 지원한 정보 있으면 저장 x
            return true;
        }
        MemberRecommendedMajor memberRecommendedMajor = new MemberRecommendedMajor();
        memberRecommendedMajor.createMemberRecommendedMajor(departmentName, member);
        memberRecommendedMajorRepository.save(memberRecommendedMajor);
        return true;
    }
}
