package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SecondSectionResponseRepository extends JpaRepository<SecondSectionResponse,Long> {

    Optional<SecondSectionResponse> findByMemberId(Long memberId);
}
