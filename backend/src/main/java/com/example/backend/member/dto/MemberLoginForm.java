package com.example.backend.member.dto;

import lombok.Data;

@Data
public class MemberLoginForm {
    private String loginId;
    private String password;
}
