package com.example.backend.member.dto;

import com.example.backend.member.entity.Department;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentDto {
    private Integer id;
    private String name;

    public DepartmentDto(Department department) {
        this.id = department.getId();
        this.name = department.getName();
    }
}
