package com.example.backend.member.dto;

import com.example.backend.member.entity.Doctor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private Integer id;
    private String name;
    private String position;
    private String ThumbnailUrl;

    public DoctorDto(Doctor doctor) {
        this.id = doctor.getId();
        this.name = doctor.getName();
        this.position = doctor.getPosition();
        this.ThumbnailUrl = doctor.getThumbnailUrl();
    }

}
