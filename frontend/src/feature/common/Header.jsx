import React, { useContext, useEffect, useState } from "react";
import "./css/Header.css";
import { AuthenticationContext } from "./AuthenticationContextProvider.jsx";
import { useNavigate } from "react-router";

function Header() {
  const { user, logout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    console.log("현재 user 상태:", user);
  });
  const handleReservationClick = () => {
    if (user) {
      navigate("/reservation");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-top">
        <a href="/" className="logo">
          병원 로고
        </a>
        <div className="header-links">
          {user ? (
            <>
              <span>{user.name}님</span>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <a href="/login">로그인</a>
              <a href="/signup">회원가입</a>
            </>
          )}
        </div>
      </div>

      {/* 네비게이션 전체 hover 영역으로  */}
      <nav className="header-nav" onMouseLeave={() => setOpenMenu(null)}>
        <ul className="header-menu">
          <li className="menu-item" onMouseEnter={() => setOpenMenu("guide")}>
            진료안내
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

        {/* hover 시 나오는 div */}
        {openMenu === "guide" && (
          <div className="submenu-bar">
            <ul>
              <li>
                <button
                  onClick={handleReservationClick}
                  className="submenu-btn"
                >
                  인터넷 진료예약
                </button>
              </li>
              <li>
                <a href="/check">예약확인/취소</a>
              </li>
              <li>
                <a href="/dept">진료과/의료진</a>
              </li>
              <li>
                <a href="/emergency">응급의료센터</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
