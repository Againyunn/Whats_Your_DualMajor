package com.comprehensivedesign.dualmajor.Service.MemberRecommendedMajor;

import com.comprehensivedesign.dualmajor.dto.MemberDto;
import com.comprehensivedesign.dualmajor.dto.SaveFinalResultDto;

public interface MemberRecommendedMajorService {

    public boolean saveResult(String user, String departmentName) throws  Exception;
}
