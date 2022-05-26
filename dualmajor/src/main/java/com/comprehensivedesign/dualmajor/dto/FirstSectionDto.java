package com.comprehensivedesign.dualmajor.dto;

import com.comprehensivedesign.dualmajor.domain.sector.Sector;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class FirstSectionDto {

    private String sectorName;
    /*private String result1Type;
    private String result2Type;*/
    private String resultType;
    private String testKey;
    private List<Sector> sectors;
    private Map<Long, List> dualMajors;

    /*섹터 추천 결과 API*/
    public void setMemberSectorApi(List<Sector> sectors, Map<Long, List> dualMajors, String testKey) {
        this.sectors = sectors;
        this.dualMajors = dualMajors;
        this.testKey = testKey;
    }
    public Map getMemberSectorApi() throws Exception{
        /*api 만들기*/
        Map<String,Object> map = new LinkedHashMap<>();
        List<Map> list = new ArrayList<>();
        for (int i = 0; i < sectors.size(); i++) {
            Map<String,Object> index = new LinkedHashMap<>();
            index.put("academicName", sectors.get(i).getSectorName());
            index.put("departmentList", dualMajors.get(sectors.get(i).getId()));
            list.add(index);
        }
        map.put("testKey",testKey);
        map.put("list", list);
        return map;
    }
}
