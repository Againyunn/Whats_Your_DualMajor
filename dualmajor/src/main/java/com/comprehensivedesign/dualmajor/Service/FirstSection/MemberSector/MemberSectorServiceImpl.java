package com.comprehensivedesign.dualmajor.Service.FirstSection.MemberSector;


import com.comprehensivedesign.dualmajor.domain.sector.MemberSector;
import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import com.comprehensivedesign.dualmajor.repository.MemberSectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberSectorServiceImpl implements MemberSectorService {

    @Autowired
    private final MemberSectorRepository memberSectorRepository;

    /*회원에게 추천된 섹터 반환*/
    @Override
    public List<Sector> findMemberSector(String testKey) throws Exception {
        List<MemberSector> memberSectors = memberSectorRepository.findByTestKey(testKey).orElseThrow(()->new Exception("not exists member sector"));
        List<Sector> sector = new ArrayList<>();
        for (int i = 0; i < memberSectors.size(); i++) { //회원에게 추천된 섹터 수 만큼 반복하며 섹터만 추출
            sector.add(memberSectors.get(i).getSector()); //MemberSector객체 내에서 sector만 추출하여 Sector 리스트에 담기
        }
        return sector;
    }

}
