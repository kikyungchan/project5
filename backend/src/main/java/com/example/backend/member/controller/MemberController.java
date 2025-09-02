package com.example.backend.member.controller;

import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.dto.MemberLoginForm;
import com.example.backend.member.dto.MemberUpdateForm;
import com.example.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody MemberForm memberForm) {
        System.out.println(memberForm);
        try {

            memberService.add(memberForm);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "회원 가입 되었습니다.")));

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginForm memberLoginForm) {
        String token = memberService.login(memberLoginForm);
        return ResponseEntity.ok().body(Map.of("token", token,
                "message",
                Map.of("type", "success",
                        "text", "로그인 되었습니다.")));
    }

    @GetMapping(params = "loginId")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public ResponseEntity<?> getMemberByLoginId(String loginId, Authentication authentication) {
        if (authentication.getName().equals(loginId) ||
            authentication.getAuthorities().contains(new SimpleGrantedAuthority("SCOPE_admin"))) {
            return ResponseEntity.ok().body(memberService.getByLoginId(loginId));
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @PutMapping("/update")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public ResponseEntity<?> updateMember(@RequestBody MemberUpdateForm form, Authentication authentication) {
        if (!authentication.getName().equals(form.getLoginId()) &&
            !authentication.getAuthorities().contains(new SimpleGrantedAuthority("SCOPE_admin"))) {
            return ResponseEntity.status(403).build();
        }

        try {
            memberService.update(form);
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success", "text", "회원 정보가 수정되었습니다.")
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", e.getMessage())
            ));
        }
    }
}
