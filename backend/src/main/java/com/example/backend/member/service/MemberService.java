package com.example.backend.member.service;

import com.example.backend.member.dto.MemberDto;
import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.dto.MemberLoginForm;
import com.example.backend.member.dto.MemberUpdateForm;
import com.example.backend.member.entity.Auth;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.AuthRepository;
import com.example.backend.member.repository.MemberRepository;
import com.example.backend.member.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtEncoder jwtEncoder;
    private final PasswordEncoder passwordEncoder;
    private final AuthRepository authRepository;
    private final ReservationRepository reservationRepository;

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

    public String login(MemberLoginForm loginForm) {
        // 해당 email의 데이터 있는 지
        Optional<Member> db = memberRepository.findById(loginForm.getLoginId());
        if (db.isPresent()) {
            // 있으면 패스워드 맞는지
            if (db.get().getPassword().equals(loginForm.getPassword())) {
                List<Auth> authList = authRepository.findByMember(db.get());

                String authListStirng = authList.stream()
                        .map(auth -> auth.getId().getAuthName())
                        .collect(Collectors.joining(" "));

                // token 만들어서 리턴
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .subject(loginForm.getLoginId())
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 365))
                        .claim("scp", authListStirng)
                        .build();

                return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
            }

        }

        throw new RuntimeException("아이디 또는 패스워드가 일치하지 않습니다.");
    }

    public MemberDto getByLoginId(String loginId) {
        Member member = memberRepository.findById(loginId).get();

        MemberDto memberDto = new MemberDto();
        memberDto.setLoginId(member.getLoginId());
        memberDto.setName(member.getName());
        memberDto.setEmail(member.getEmail());
        memberDto.setPhone(member.getPhone());
        memberDto.setGender(member.getGender());

        return memberDto;
    }

    public void update(MemberUpdateForm form) {
        Member member = memberRepository.findById(form.getLoginId()).get();

        if (form.getPassword() != null && !form.getPassword().isBlank()) {
            // 암호화 넣을거면 passwordEncoder.encode() 사용
            member.setPassword(form.getPassword());
        }
        if (form.getName() != null && !form.getName().isBlank()) {
            member.setName(form.getName());
        }
        if (form.getPhone() != null && !form.getPhone().isBlank()) {
            member.setPhone(form.getPhone());
        }
        if (form.getEmail() != null && !form.getEmail().isBlank()) {
            member.setEmail(form.getEmail());
        }
        if (form.getGender() != null && !form.getGender().isBlank()) {
            member.setGender(form.getGender());
        }

        memberRepository.save(member);
    }

    public void deleteMember(String memberLoginId) {
        // 1) 본인 존재 확인
        Member member = memberRepository.findById(memberLoginId)
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다."));

        // 2) 자식(예약 등) 선삭제 — 하드 삭제 전략
        reservationRepository.deleteByMember_LoginId(memberLoginId);

        // 3) 회원 삭제
        memberRepository.delete(member);
    }
}