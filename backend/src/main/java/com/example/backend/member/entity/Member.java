package com.example.backend.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "member")
public class Member {
    @Id
    private String loginId;

    private String name;
    private String password;
    private String email;
    private String phone;
    private String gender;

    @Column(updatable = false, insertable = false)
    private LocalDateTime insertedAt;
}
