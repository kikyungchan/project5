import React, { useState } from "react";
import "./css/Header.css";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
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
        <ul className="header-menu">
          <li
            className="menu-item"
            onMouseEnter={() => toggleMenu("guide")}
            onMouseLeave={() => toggleMenu(null)}
          >
            진료안내
            {openMenu === "guide" && (
              <div className="dropdown">
                <ul>
                  <li>
                    <a href="/reservation">인터넷 진료예약</a>
                  </li>
                  {/*  나중에 늘릴때 여기에 추가*/}
                </ul>
              </div>
            )}
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
