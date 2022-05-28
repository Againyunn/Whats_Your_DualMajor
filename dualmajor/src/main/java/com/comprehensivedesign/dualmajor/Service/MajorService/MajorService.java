package com.comprehensivedesign.dualmajor.Service.MajorService;

import com.comprehensivedesign.dualmajor.domain.DualMajor;
import com.comprehensivedesign.dualmajor.domain.FirstMajor;

import java.util.List;
import java.util.Map;

public interface MajorService {
    Map viewFirstMajorList();
    Map viewDualMajorList();
    FirstMajor findFirstMajorById(Long firstMajorId) throws Exception;
    DualMajor findDualMajorById(Long dualMajorId) throws Exception;
    Map<Long, List> findDualMajor(String testKey) throws Exception;
    Map viewMajorDetail(String departmentName);
    List viewMajorByCampus(String campus);

}
