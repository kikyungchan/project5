package com.example.backend.member.service;

import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.dto.MemberLoginForm;
import com.example.backend.member.entity.Auth;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.AuthRepository;
import com.example.backend.member.repository.MemberRepository;
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
//            if (passwordEncoder.matches(loginForm.getPassword(), db.get().getPassword())) {
                List<Auth> authList = authRepository.findByMember(db.get());
                // 고전적인 방법
//                String authListString = "";
//                for (Auth auth : authList) {
//                    authListString = authListString + " " + auth.getId().getAuthName();
//                }
//                authListString = authListString.trim();
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
}
