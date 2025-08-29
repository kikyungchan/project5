import React, { useState } from "react";
import "./css/Header.css";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);

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

      {/* 네비게이션 전체를 hover 영역으로 묶음 */}
      <nav
        className="header-nav"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <ul className="header-menu">
          <li
            className="menu-item"
            onMouseEnter={() => setOpenMenu("guide")}
          >
            진료안내
          </li>
          <li><a href="/usage">이용안내</a></li>
          <li><a href="/health">건강정보</a></li>
          <li><a href="/customer">고객참여</a></li>
          <li><a href="/about">병원소개</a></li>
        </ul>

        {/* 🔽 hover 시 아래쪽에 나오는 전체 div */}
        {openMenu === "guide" && (
          <div className="submenu-bar">
            <ul>
              <li><a href="/reservation">인터넷 진료예약</a></li>
              <li><a href="/check">예약확인/취소</a></li>
              <li><a href="/dept">진료과/의료진</a></li>
              <li><a href="/emergency">응급의료센터</a></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
