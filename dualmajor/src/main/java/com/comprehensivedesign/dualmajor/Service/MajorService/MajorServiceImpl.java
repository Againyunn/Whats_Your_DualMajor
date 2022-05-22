package com.comprehensivedesign.dualmajor.Service.MajorService;


import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.FirstMajor;
import com.comprehensivedesign.dualmajor.domain.sector.MemberSector;
import com.comprehensivedesign.dualmajor.dto.DualMajorName;
import com.comprehensivedesign.dualmajor.dto.MajorList;
import com.comprehensivedesign.dualmajor.repository.MemberSectorRepository;
import com.comprehensivedesign.dualmajor.repository.major.DualMajorRepository;
import com.comprehensivedesign.dualmajor.repository.major.FirstMajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MajorServiceImpl implements MajorService{
    @Autowired private final FirstMajorRepository firstMajorRepository;
    @Autowired private final DualMajorRepository dualMajorRepository;
    @Autowired private final MemberSectorRepository memberSectorRepository;

    /* 제1전공 리스트 */
    @Override
    public Map viewFirstMajorList() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("firstMajor", firstMajorRepository.viewFirstMajorList());
        return map;
    }
    /* 제2전공 리스트*/
    @Override
    public Map viewDualMajorList() {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("dualMajor", dualMajorRepository.viewDualMajorList());
        return map;
    }

    @Override
    public FirstMajor findFirstMajorById(Long firstMajorId) throws Exception{
        return firstMajorRepository.findById(firstMajorId).orElseThrow(()->new Exception("not exist first major"));
    }
    @Override
    public DualMajor findDualMajorById(Long dualMajorId) throws Exception{
        return dualMajorRepository.findById(dualMajorId).orElseThrow(()->new Exception("not exist dual major"));
    }

    /*추천된 섹터에 해당하는 이중전공 찾기*/
    @Override
    public Map<Long, List> findDualMajor(Long memberId) throws Exception {
        List<MemberSector> memberSectors = memberSectorRepository.findByMemberId(memberId).orElseThrow(()->new Exception("not exists member sector"));
        Map<Long, List> map = new HashMap<>();
        for (int i = 0; i < memberSectors.size(); i++) {
            List<DualMajorName> dualMajorNames = dualMajorRepository.findMajorNameBySectorId(memberSectors.get(i).getSector().getId());
            List<String> temp = new ArrayList<>(); //이중전공명만 따로 담기 위한 리스트
            for (int j = 0; j < dualMajorNames.size(); j++) { //회원에게 추천된 섹터 내의 이중전공들 대상으로 이중전공 명만 따로 뽑아내기
                temp.add(dualMajorNames.get(j).getMajorName());
                map.put(memberSectors.get(i).getSector().getId(), temp);
            }
        }
        return map;
    }
}
