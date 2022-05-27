package com.comprehensivedesign.dualmajor.Service.MemberRecommendedMajor;

import com.comprehensivedesign.dualmajor.dto.MemberDto;

public interface MemberRecommendedMajorService {

    public boolean saveResult(MemberDto memberDto, String testKey) throws  Exception;
}
