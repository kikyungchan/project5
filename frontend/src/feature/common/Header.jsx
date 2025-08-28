import React from "react";
import "./css/Header.css";

function Header() {
  return (
    <header className="header container.nav">
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
        <ul className="header-menu">
          <li>
            <a href="/guide">진료안내</a>
          </li>
          <li>
            <a href="/usage">이용안내</a>
          </li>
          <li>
            <a href="/health">건강정보</a>
          </li>
          <li>
            <a href="/customer">고객참여</a>
          </li>
          <li>
            <a href="/about">병원소개</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
