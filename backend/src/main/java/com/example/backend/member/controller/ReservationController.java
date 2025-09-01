package com.example.backend.member.controller;

import com.example.backend.member.dto.DepartmentDto;
import com.example.backend.member.dto.DoctorDto;
import com.example.backend.member.entity.Department;
import com.example.backend.member.entity.Doctor;
import com.example.backend.member.entity.Reservation;
import com.example.backend.member.repository.DepartmentRepository;
import com.example.backend.member.repository.DoctorRepository;
import com.example.backend.member.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReservationController {
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final ReservationService reservationService;

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

    @PostMapping("/reservation")
    public Reservation reserve(@RequestParam Integer doctorId,
                               @RequestParam String memberId,
                               @RequestParam String dateTime // "2025-09-02T10:00"
    ) {
        LocalDateTime reservationDateTime = LocalDateTime.parse(dateTime);
        return reservationService.createReservation(doctorId, memberId, reservationDateTime);
    }
}
