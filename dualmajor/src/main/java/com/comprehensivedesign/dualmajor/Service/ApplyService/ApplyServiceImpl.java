package com.comprehensivedesign.dualmajor.Service.ApplyService;


import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.MemberRecommendedMajor;
import com.comprehensivedesign.dualmajor.dto.ApplyCount;
import com.comprehensivedesign.dualmajor.dto.ApplyDto;
import com.comprehensivedesign.dualmajor.repository.MemberRecommendedMajorRepository;
import com.comprehensivedesign.dualmajor.repository.major.DualMajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ApplyServiceImpl implements ApplyService{

    @Autowired private final MemberService memberService;
    @Autowired private final DualMajorRepository dualMajorRepository;
    @Autowired private final MemberRecommendedMajorRepository memberRecommendedMajorRepository;


    /* 학과별 지원 정보(경쟁률 구하기 위함) */
    @Override
    public Map getRateInfo(ApplyDto applyDto) {
        Map<String, Object> map = new LinkedHashMap<>();
        DualMajor dualMajor = dualMajorRepository.findByMajorName(applyDto.getName()).get();
        int applyNum = memberRecommendedMajorRepository.findMajorCount(applyDto.getName());//같은 학과 명으로 저장된 수(count) 조회
        double avgGpa = getAvgGpa(applyDto.getName()); //해당 학과 지원한 학생 평균 학점 구하기
        if(dualMajor.getTotalNum().equals("융합")){ //융합전공은 정원 정보를 알 수 없어서 지원 정원과 지원자 수 모두 false로 설정
            map.put("applyNum", false); //해당 학과에 지원한 학생 수
            map.put("totalNum", false); //해당 학과 이중전공 정원
        }
        map.put("id", dualMajor.getId()); //해당 학과 id
        map.put("name", dualMajor.getMajorName()); //해당 학과 명
        map.put("applyNum", applyNum); //해당 학과에 지원한 학생 수
        map.put("totalNum", dualMajor.getTotalNum()); //해당 학과 이중전공 정원
        map.put("avgGpa", avgGpa); //해당 학과 지원한 학생들의 평균 학점
        return map;
    }
     //학과별 지원한 학생들의 평균 학점 구하기
    private double getAvgGpa(String name) {
        List<MemberRecommendedMajor> list = memberRecommendedMajorRepository.findByMajorName(name);
        if(list.size()==0){ //해당 학과에 지원한 학생이 0명이면 평균 학점 0
            return 0;
        }
        double index = 0;
        for(int i=0;i<list.size();i++){
            index += memberService.findById(list.get(i).getMember().getId()).getGpa(); //지원 정보에 저장된 회원 객체를 통해 회원 테이블 참조
        }
        return index/list.size();
    }
     //사용자의 지원 정보 가져오기
    @Override
    public Map getApplyInfo(ApplyDto applyDto)  throws Exception{
        Map<String, Object> map = new LinkedHashMap<>();
        Member member = memberService.find(applyDto.getStdNum() + "@hufs.ac.kr");//이메일로 회원 조회
        MemberRecommendedMajor memberRecommendedMajor = memberRecommendedMajorRepository.findByMemberId(member.getId()).orElseThrow(
                ()-> new Exception("not exists data")); //해당 회원으로 저장된 지원 정보가 없으면 exception 반환
        map.put("stdNum",member.getStdNum()); //회원 학번
        map.put("apply",true); //지원 여부
        map.put("majorName",memberRecommendedMajor.getMajorName()); //지원한 학과 명
        map.put("gpa",member.getGpa()); //회원 학점
        map.put("change",memberRecommendedMajor.getApplyDate()); //이중전공 지원 수정 여부
        return map;
    }
}
