package com.comprehensivedesign.dualmajor.Service.MajorService;

import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.FirstMajor;

public interface MajorService {
    FirstMajor findFirstMajorById(Long firstMajorId) throws Exception;
    DualMajor findDualMajorById(Long dualMajorId) throws Exception;

}
