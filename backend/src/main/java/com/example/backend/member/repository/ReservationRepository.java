package com.example.backend.member.repository;

import com.example.backend.member.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    boolean existsByDoctorIdAndReservationDateTime(Integer doctorId, LocalDateTime reservationDateTime);
}