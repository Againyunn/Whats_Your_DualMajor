package com.comprehensivedesign.dualmajor.Service.ApplyService;


import com.comprehensivedesign.dualmajor.Service.MemberRecommendedMajor.MemberRecommendedMajorService;
import com.comprehensivedesign.dualmajor.Service.MemberService.MemberService;
import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.Member;
import com.comprehensivedesign.dualmajor.domain.MemberRecommendedMajor;
import com.comprehensivedesign.dualmajor.dto.ApplyCount;
import com.comprehensivedesign.dualmajor.dto.ApplyDto;
import com.comprehensivedesign.dualmajor.repository.MemberRecommendedMajorRepository;
import com.comprehensivedesign.dualmajor.repository.major.DualMajorRepository;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ApplyServiceImpl implements ApplyService{

    @Autowired private final MemberService memberService;
    @Autowired private final DualMajorRepository dualMajorRepository;
    @Autowired private final MemberRecommendedMajorRepository memberRecommendedMajorRepository;
    @Autowired private final MemberRecommendedMajorService memberRecommendedMajorService;


    /* 학과별 지원 정보(경쟁률 구하기 위함) */
    @Override
    public Map getRateInfo(ApplyDto applyDto) {
        Map<String, Object> map = new LinkedHashMap<>();
        DualMajor dualMajor = dualMajorRepository.findByMajorName(applyDto.getName()).get();
        int applyNum = memberRecommendedMajorRepository.findMajorCount(applyDto.getName());//같은 학과 명으로 저장된 수(count) 조회
        String avgGpa = getAvgGpa(applyDto.getName()); //해당 학과 지원한 학생 평균 학점 구하기
        map.put("id", Long.toString(dualMajor.getId())); //해당 학과 id
        map.put("name", dualMajor.getMajorName()); //해당 학과 명
        if(dualMajor.getTotalNum().equals("융합")){ //융합전공은 정원 정보를 알 수 없어서 지원 정원과 지원자 수 모두 false로 설정
            map.put("applyNum", false); //해당 학과에 지원한 학생 수
            map.put("totalNum", false); //해당 학과 이중전공 정원
        }
        else {
            map.put("applyNum", Integer.toString(applyNum)); //해당 학과에 지원한 학생 수
            map.put("totalNum", dualMajor.getTotalNum()); //해당 학과 이중전공 정원
        }
        map.put("avgGpa", avgGpa); //해당 학과 지원한 학생들의 평균 학점
        return map;
    }
     //학과별 지원한 학생들의 평균 학점 구하기
    private String getAvgGpa(String name) {
        List<MemberRecommendedMajor> list = memberRecommendedMajorRepository.findByMajorName(name);
        if(list.size()==0){ //해당 학과에 지원한 학생이 0명이면 평균 학점 0
            return "0";
        }
        double index = 0;
        for(int i=0;i<list.size();i++){
            index += memberService.findById(list.get(i).getMember().getId()).getGpa(); //지원 정보에 저장된 회원 객체를 통해 회원 테이블 참조
        }
        return String.format("%.2f",index/list.size());
    }

    /* 지원정보 전달 받아서 MemberRecommendedMajor에 지원 정보 저장하기 */
    @Override
    @Transactional
    public boolean postApply(ApplyDto applyDto) throws Exception{
        return memberRecommendedMajorService.saveResult(applyDto.getStdNum(), applyDto.getName()); //학번, 학과명
    }

    @Override
    @Transactional
    public boolean deleteApply(ApplyDto applyDto) throws Exception {
        Member member = memberService.find(applyDto.getStdNum() + "@hufs.ac.kr");
        memberRecommendedMajorRepository.deleteByMajorNameAndMemberId(applyDto.getName(), member.getId());
        return true;
    }

    //사용자의 지원 정보 가져오기
    @Override
    public Map getApplyInfo(ApplyDto applyDto)  throws Exception{
        Map<String, Object> map = new LinkedHashMap<>();
        System.out.println("stdNum in getApplyInfo"+applyDto.getStdNum());
        Member member = memberService.find(applyDto.getStdNum() + "@hufs.ac.kr");//이메일로 회원 조회
        System.out.println("member name in getApplyInfo"+member.getName());
        System.out.println("member id in getApplyInfo"+member.getId());
        //문제??발생
        MemberRecommendedMajor memberRecommendedMajor = memberRecommendedMajorRepository.findByMemberId(member.getId()).get();
        System.out.println("majorname founded"+memberRecommendedMajor.getMajorName());
        System.out.println("memberid founded"+memberRecommendedMajor.getMember().getId());
              /*  .orElseThrow(
                ()-> new Exception("not exists data")); //해당 회원으로 저장된 지원 정보가 없으면 exception 반환*/
        LocalDateTime currentTime = LocalDateTime.now();
        map.put("stdNum",member.getStdNum()); //회원 학번
        map.put("apply",true); //지원 여부
        map.put("majorName",memberRecommendedMajor.getMajorName()); //지원한 학과 명
        map.put("gpa", Double.toString(member.getGpa())); //회원 학점
        map.put("change",validateApplyPossibility(memberRecommendedMajor.getApplyDate(), currentTime)); //이중전공 지원 수정 여부
        return map;
    }

    /* ApplyInfo에서 재지원 가능 여부 확인 */
    private boolean validateApplyPossibility(LocalDateTime applyDate, LocalDateTime currentTime) {
        Duration duration = Duration.between(applyDate, currentTime);
        long seconds = duration.getSeconds();
        long diff = seconds / 3600;
        System.out.println("diff : "+diff);
        if (diff>= 6) { //지원한 시간과 현재 시간의 차이가 6h 이상이면 재지원 가능
            return true;
        }
        else{
            return false;
        }
    }
}
