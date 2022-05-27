package com.comprehensivedesign.dualmajor.Service.MemberRecommendedMajor;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.MemberRecommendedMajor;
import com.comprehensivedesign.dualmajor.domain.secondSection.MajorDetail;
import com.comprehensivedesign.dualmajor.domain.secondSection.MemberFinalResult;
import com.comprehensivedesign.dualmajor.dto.FinalResult;
import com.comprehensivedesign.dualmajor.dto.MemberDto;
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
    @Autowired private final MemberFinalResultRepository memberFinalResultRepository;
    @Autowired private final SecondSectionResponseRepository secondSectionResponseRepository;
    @Autowired private final MajorDetailRepository majorDetailRepository;
    @Autowired private final MemberRecommendedMajorRepository memberRecommendedMajorRepository;
    @Autowired private final CannotRepository cannotRepository;
    @Autowired private final DualMajorRepository dualMajorRepository;

    @Override
    @Transactional
    public boolean saveResult(MemberDto memberDto, String testKey) throws Exception { //회원 최종 추전 결과 저장 로직
        Member member = memberService.find(memberDto.getUser() + "@hufs.ac.kr"); //요청된 회원의 id?로 회원 객체 조회
        MemberFinalResult result = memberFinalResultRepository.findByTestKey(testKey); //전달받은 testKey로 회원의 최종 추천 resultType조회
        String campus = secondSectionResponseRepository.findByTestKey(testKey).get().getCampus(); //testKey로 회원이 원하는 캠퍼스 조회
        List<MajorDetail> majorDetails;
        if (campus.equals("서울") || campus.equals("글로벌")) {
            //변수 campus에 캠퍼스명이 담겨있고, 해당 캠퍼스명과 같은 캠퍼스명을 갖는 학과 도출 조건
            majorDetails = majorDetailRepository.findByResultTypeAndCampus(result.getResultType(), campus);
        }
        else{
            //캠퍼스 교차 여부 상관 없는 사용자에게 도출 조건
            majorDetails = majorDetailRepository.findByResultType(result.getResultType());
        }
        for (int i = 0; i < majorDetails.size(); i++) { //조회된 MajorDetail 객체 수 만큼 MemberRecommendedMajor에 저장.
            DualMajor dualMajor = dualMajorRepository.findByMajorName(majorDetails.get(i).getMajorName()).get();//이중전공id 찾기
            /*회원의 본전공 Id를 추천된 이중전공 Id와 조합하여 이수 불가 학과이면 저장하지 않음(Cannot테이블에 두 Id로 형성된 행이 있으면 이수 불가능한 것)*/
            if (cannotRepository.findByFirstMajorIdAndDualMajorId(member.getFirstMajor().getId(), dualMajor.getId()).isPresent()) {
                continue;
            }
            MemberRecommendedMajor memberRecommendedMajor = new MemberRecommendedMajor();
            memberRecommendedMajor.createMemberRecommendedMajor(majorDetails.get(i), member);
            memberRecommendedMajorRepository.save(memberRecommendedMajor);
        }
        return true;
    }
}
