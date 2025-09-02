package com.example.backend.member.controller;

import com.example.backend.member.dto.DepartmentDto;
import com.example.backend.member.dto.DoctorDto;
import com.example.backend.member.entity.Department;
import com.example.backend.member.entity.Doctor;
import com.example.backend.member.entity.Reservation;
import com.example.backend.member.repository.DepartmentRepository;
import com.example.backend.member.repository.DoctorRepository;
import com.example.backend.member.repository.ReservationRepository;
import com.example.backend.member.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReservationController {
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;

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
                               @RequestParam String dateTime, // "2025-09-02T10:00"
                               @RequestParam String memo
    ) {
        LocalDateTime reservationDateTime = LocalDateTime.parse(dateTime);
        return reservationService.createReservation(doctorId, memberId, reservationDateTime, memo);
    }

    @GetMapping("/available")
    public Map<String, Object> getAvailableTimes(
            @RequestParam Integer doctorId,
            @RequestParam String date // "2025-09-05"
    ) {
        LocalDate localDate = LocalDate.parse(date);

        // 예약된 시간 목록 (LocalTime)
        List<LocalTime> reservedTimes = reservationService.getReservedTimes(doctorId, localDate);

        // 문자열 변환: HH:mm
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        List<String> reservedTimeStrings = reservedTimes.stream()
                .map(t -> t.format(formatter))
                .toList();

        // 병원 기본 예약 가능 시간  점심시간 1시간 제외
        List<String> allTimeSlots = List.of("09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00");

        // 예약 불가능한 시간 제외
        List<String> availableTimes = allTimeSlots.stream()
                .filter(t -> !reservedTimeStrings.contains(t))
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("date", localDate);
        response.put("doctorId", doctorId);
        response.put("availableTimes", availableTimes);
        response.put("reservedTimes", reservedTimeStrings);

        return response;
    }

    @GetMapping("/check")
    public List<Reservation> getReservations(@RequestParam(required = false) String memberId) {
        return reservationRepository.findByMemberLoginId(memberId);
    }
}
