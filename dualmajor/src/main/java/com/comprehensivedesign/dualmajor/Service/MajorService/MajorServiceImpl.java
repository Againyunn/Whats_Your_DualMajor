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
        Optional<FirstMajor> firstMajor = firstMajorRepository.findById(firstMajorId);
        if (firstMajor.isEmpty()) {
            throw new Exception("not exists FirstMajor");
        }
        return firstMajor.get();
    }

    @Override
    public DualMajor findDualMajorById(Long dualMajorId) throws Exception{
        Optional<DualMajor> dualMajor = dualMajorRepository.findById(dualMajorId);
        if (dualMajor.isEmpty()) {
            throw new Exception("not exists DualMajor");
        }
        return dualMajor.get();
    }
}
