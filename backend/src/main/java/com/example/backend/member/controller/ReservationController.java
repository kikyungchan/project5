package com.example.backend.member.controller;

import com.example.backend.member.dto.DepartmentDto;
import com.example.backend.member.dto.DoctorDto;
import com.example.backend.member.entity.Department;
import com.example.backend.member.entity.Doctor;
import com.example.backend.member.repository.DepartmentRepository;
import com.example.backend.member.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReservationController {
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;

    @GetMapping("/departments")
    public List<DepartmentDto> getDepartments() {
        List<Department> deptList = departmentRepository.findAll();
        List<DepartmentDto> result = new ArrayList<>();
        for (Department dept : deptList) {
            result.add(new DepartmentDto(dept));
        }
        return result;
    }

    @GetMapping("/doctors")
    public List<DoctorDto> getDoctors(@RequestParam Integer deptId) {
        List<Doctor> doctorList = doctorRepository.findByDepartmentId(deptId);
        List<DoctorDto> result = new ArrayList<>();
        for (Doctor doc : doctorList) {
            result.add(new DoctorDto(doc));
        }
        return result;
    }
}
