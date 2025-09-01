package com.example.backend.member.service;

import com.example.backend.member.entity.Doctor;
import com.example.backend.member.entity.Member;
import com.example.backend.member.entity.Reservation;
import com.example.backend.member.repository.DoctorRepository;
import com.example.backend.member.repository.MemberRepository;
import com.example.backend.member.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final DoctorRepository doctorRepository;
    private final MemberRepository memberRepository;

    public Reservation createReservation(Integer doctorId, String memberId, LocalDateTime reservationDateTime) {
        boolean exists = reservationRepository.existsByDoctorIdAndReservationDateTime(doctorId, reservationDateTime);
        if (exists) {
            throw new RuntimeException("예약 불가능한 시간입니다.");
        }
        Doctor doctor = doctorRepository.findById(doctorId).get();
        Member member = memberRepository.findById(String.valueOf(memberId)).get();

        Reservation reservation = new Reservation();
        reservation.setDoctor(doctor);
        reservation.setMember(member);
        reservation.setReservationDateTime(reservationDateTime);
        return reservationRepository.save(reservation);
    }

    public List<LocalTime> getReservedTimes(Integer doctorId, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        List<Reservation> reservations = reservationRepository
                .findByDoctorIdAndReservationDateTimeBetween(doctorId, startOfDay, endOfDay);

        // 이미 예약된 시간대만 추출
        return reservations.stream()
                .map(r -> r.getReservationDateTime().toLocalTime())
                .toList();
    }
}
