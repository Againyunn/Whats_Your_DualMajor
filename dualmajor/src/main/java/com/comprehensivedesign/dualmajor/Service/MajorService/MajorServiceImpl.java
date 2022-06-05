package com.comprehensivedesign.dualmajor.Service.MajorService;


import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.FirstMajor;
import com.comprehensivedesign.dualmajor.domain.secondSection.MajorDetail;
import com.comprehensivedesign.dualmajor.domain.sector.MemberSector;
import com.comprehensivedesign.dualmajor.dto.DualMajorName;
import com.comprehensivedesign.dualmajor.dto.FinalResult;
import com.comprehensivedesign.dualmajor.dto.MajorList;
import com.comprehensivedesign.dualmajor.repository.MemberSectorRepository;
import com.comprehensivedesign.dualmajor.repository.major.DualMajorRepository;
import com.comprehensivedesign.dualmajor.repository.major.FirstMajorRepository;
import com.comprehensivedesign.dualmajor.repository.secondSection.MajorDetailRepository;
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
    @Autowired private final MajorDetailRepository majorDetailRepository;

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
    public Map<Long, List> findDualMajor(String testKey) throws Exception {
        List<MemberSector> memberSectors = memberSectorRepository.findByTestKey(testKey).orElseThrow(()->new Exception("not exists member sector"));
        Map<Long, List> map = new HashMap<>();
        for (int i = 0; i < memberSectors.size(); i++) {
            List<DualMajorName> dualMajorNames = dualMajorRepository.findMajorNameBySectorId(memberSectors.get(i).getSector().getId());
            List<String> temp = new ArrayList<>(); //이중전공명만 따로 담기 위한 리스트
            for (int j = 0; j < dualMajorNames.size(); j++) { //회원에게 추천된 섹터 내의 이중전공들 대상으로 이중전공 명만 따로 뽑아내기
                temp.add(dualMajorNames.get(j).getMajorName());
                if(j!=dualMajorNames.size()-1){temp.add(", ");}
                map.put(memberSectors.get(i).getSector().getId(), temp);
            }
        }
        return map;
    }

    @Override
    public Map viewMajorDetail(String departmentName) {
        MajorDetail major = majorDetailRepository.findByMajorName(departmentName);
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("departmentName", major.getMajorName());
        result.put("campus", major.getCampus());
        result.put("intro", major.getInformation());
        result.put("degree", major.getDegree());
        result.put("career", major.getCareer());
        result.put("curriculum",major.getCurriculum());
        result.put("certification",major.getCertification());
        result.put("webPage", major.getWebpage());
        result.put("phoneNum", major.getPhoneNum());
        return result;
    }

    /*캠퍼스별 전공 목록*/
    @Override
    public List viewMajorByCampus(String campus) {
        //Map<String, Object> map = new LinkedHashMap<>();
        return dualMajorRepository.viewMajorListByCampus(campus);
    }


}
