package com.example.backend.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "member_login_id", nullable = false)
    private Member member;

    @Column(length = 255)
    private String memo;

    private LocalDateTime reservationDateTime;

    private String status = "BOOKED";


    private LocalDateTime createdAt = LocalDateTime.now();
}
