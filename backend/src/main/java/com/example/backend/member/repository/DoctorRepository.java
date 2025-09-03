package com.example.backend.member.repository;

import com.example.backend.member.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    List<Doctor> findByDepartmentId(Integer deptId);
//    List<Doctor> findByDepartmentId(Integer departmentId);

    Collection<Object> findByDepartmentName(String deptName);
}