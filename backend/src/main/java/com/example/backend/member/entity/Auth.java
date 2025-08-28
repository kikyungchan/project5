package com.example.backend.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "auth")
public class Auth {
    @EmbeddedId
    private AuthId id;

    @MapsId("login_id")
    @ManyToOne(optional = false)
    @JoinColumn(name = "login_id", nullable = false)
    private Member member;
}
