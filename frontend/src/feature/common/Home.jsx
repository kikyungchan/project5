import React, { useContext } from "react";
import MainBanner from "../common/MainBanner";
import "./css/Home.css";
import { useNavigate } from "react-router";
import { AuthenticationContext } from "./AuthenticationContextProvider.jsx";

function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthenticationContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  function handleReservation() {
    if (user) {
      navigate("/reservations");
    } else {
      alert("로그인이 필요한 시스템입니다.");
      navigate("/login");
    }
  }

  return (
    <main className="container">
      <MainBanner />

      <section className="home-shortcuts">
        <div className="shortcut">
          <h3>진료예약</h3>
          <p>빠르고 쉽게 진료예약을 하실 수 있습니다.</p>
          <button onClick={handleReservation}>진료예약</button>
        </div>
        <div className="shortcut">
          <h3>진료과/센터</h3>
          <p>병원의 진료과 / 센터를 확인할 수 있습니다.</p>
          <button onClick={() => navigate("/dept")}>진료과 보기</button>
        </div>
        <div className="shortcut">
          <h3>진료안내</h3>
          <p>대표전화 1588-5700</p>
          <button>안내보기</button>
        </div>
        {/* 여기만 로그인 여부에 따라 변경 */}
        {user ? (
          <div className="shortcut login-box">
            <div className="login-header">
              <strong>{user.name} 님</strong>
              <button onClick={handleLogout} className="logout-btn">
                로그아웃
              </button>
            </div>
            <p>
              오늘도 좋은 하루 보내시고 <b>건강을 기원</b>합니다.
            </p>
            <div className="action-buttons">
              <button onClick={() => navigate("/reservationcheck")}>
                예약확인/취소
              </button>
              <button onClick={() => navigate("/history")}>진료이력조회</button>
            </div>
          </div>
        ) : (
          <div className="shortcut">
            <h3>로그인</h3>
            <p>회원 및 비회원 로그인</p>
            <button onClick={() => navigate("/login")}>로그인</button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
