package com.example.backend.member.dto;

import lombok.Data;

@Data
public class MemberUpdateForm {
    private String loginId;
    private String password;
    private String name;
    private String phone;
    private String email;
    private String gender;
}
