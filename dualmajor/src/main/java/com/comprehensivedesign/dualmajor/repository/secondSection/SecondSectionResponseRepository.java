package com.comprehensivedesign.dualmajor.repository.secondSection;

import com.comprehensivedesign.dualmajor.domain.secondSection.SecondSectionResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
@Repository
public interface SecondSectionResponseRepository extends JpaRepository<SecondSectionResponse,Long> {

    Optional<SecondSectionResponse> findByTestKey(String testKey);
}
