package com.example.backend.member.dto;

import com.example.backend.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MemberDto {
    private String loginId;
    private String name;
    private LocalDateTime insertedAt;

}
