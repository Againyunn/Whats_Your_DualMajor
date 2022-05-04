package com.comprehensivedesign.dualmajor.Service.MajorService;


import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.FirstMajor;
import com.comprehensivedesign.dualmajor.repository.DualMajorRepository;
import com.comprehensivedesign.dualmajor.repository.FirstMajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MajorServiceImpl implements MajorService{
    @Autowired private FirstMajorRepository firstMajorRepository;
    @Autowired private DualMajorRepository dualMajorRepository;

    @Override
    public FirstMajor findFirstMajorById(Long firstMajorId) throws Exception{
        return firstMajorRepository.findById(firstMajorId).orElseThrow(()->new Exception("not exist first major"));
    }
    @Override
    public DualMajor findDualMajorById(Long dualMajorId) throws Exception{
        return dualMajorRepository.findById(dualMajorId).orElseThrow(()->new Exception("not exist dual major"));
    }
}
