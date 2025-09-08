import React, { useContext, useState } from "react";
import "./css/Header.css";
import { AuthenticationContext } from "./AuthenticationContextProvider.jsx";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Header() {
  const { user, logout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="header">
      <div className="header-top">
        <img
          className="header-logo"
          onClick={() => navigate("/")}
          src="/기경찬병원로고.png"
          alt="병원 로고"
        />

        <div className="header-links">
          {user ? (
            <>
              <span
                style={{ cursor: "pointer" }}
                className="header-mypage"
                onClick={() => navigate("/mypage")}
              >
                마이페이지
              </span>
              <button
                className="header-links-style"
                onClick={() => {
                  logout();
                  toast.warning("로그아웃 되었습니다", { autoClose: 3000 });
                  navigate("/login");
                }}
              >
                로그아웃
              </button>
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
          <li
            className="menu-item"
            style={{
              fontSize: "22px",
              fontWeight: "bold",
            }}
            onMouseEnter={() => setOpenMenu("guide")}
          >
            진료안내
          </li>
          <li>
            <li
              className="menu-item"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
              }}
              onMouseEnter={() => setOpenMenu("useHelp")}
            >
              이용안내
            </li>
          </li>
          <li>
            <a href="/health">건강정보</a>
          </li>
          <li>
            <a href="/customer">고객참여</a>
          </li>
          <li>
            <a href="/intro">병원소개</a>
          </li>
        </ul>

        {/* 진료안내 hover시*/}
        {openMenu === "guide" && (
          <div className="submenu-bar">
            <ul>
              <li>
                {user ? (
                  <a href="/reservation">인터넷 진료예약</a>
                ) : (
                  <a href="/login">인터넷 진료예약</a>
                )}
              </li>
              <li>
                <a href="/reservationcheck">예약확인/취소</a>
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
        {/* 이용안내 hover시*/}
        {openMenu === "useHelp" && (
          <div className="submenu-bar">
            <ul>
              <li>
                <a href="/map">오시는길</a>
              </li>
              <li>
                <a href="/infor">원내위치도</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
