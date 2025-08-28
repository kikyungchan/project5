import React from "react";
import "./css/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <a href="/Home" className="logo">
          병원 로고
        </a>
        <div className="header-links">
          <a href="/login">로그인</a>
          <a href="/signup">회원가입</a>
        </div>
      </div>
      <nav className="header-nav">
        <ul>
          <li>진료안내</li>
          <li>이용안내</li>
          <li>건강정보</li>
          <li>고객참여</li>
          <li>병원소개</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
