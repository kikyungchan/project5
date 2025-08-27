package com.example.backend.member.service;

import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.dto.MemberLoginForm;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void add(MemberForm memberForm) {
        Member member = new Member();
        member.setLoginId(memberForm.getLoginId());
        member.setPassword(memberForm.getPassword());
        member.setName(memberForm.getName());
        member.setPhone(memberForm.getPhone());
        member.setEmail(memberForm.getEmail());
        member.setGender(memberForm.getGender());
        memberRepository.save(member);

    }

    public void login(MemberLoginForm memberLoginForm) {
        Optional<Member> db = memberRepository.findById(memberLoginForm.getLoginId());
        if (db.isPresent()) {
            if (db.get().getPassword().equals(memberLoginForm.getPassword())) {
                
            }
        }
    }
}
