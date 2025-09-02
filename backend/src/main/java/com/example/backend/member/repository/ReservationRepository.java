package com.example.backend.member.repository;

import com.example.backend.member.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    boolean existsByDoctorIdAndReservationDateTime(Integer doctorId, LocalDateTime reservationDateTime);

    //    특정 의사+특정 날짜 모든 예약 조회
    List<Reservation> findByDoctorIdAndReservationDateTimeBetween(
            Integer doctorId,
            LocalDateTime startOfDay,
            LocalDateTime endOfDay
    );

    List<Reservation> findByMemberLoginId(String memberId);
}