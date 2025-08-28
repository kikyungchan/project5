import React from "react";
import MainBanner from "../common/MainBanner";
import "./css/Home.css";

function Home() {
  return (
    <main className="home">
      <MainBanner />

      <section className="home-shortcuts">
        <div className="shortcut">
          <h3>진료예약</h3>
          <p>빠르고 쉽게 진료예약을 하실 수 있습니다.</p>
          <button>진료예약</button>
        </div>
        <div className="shortcut">
          <h3>진료과/센터</h3>
          <p>병원의 진료과 / 센터를 확인할 수 있습니다.</p>
          <button>진료과 보기</button>
        </div>
        <div className="shortcut">
          <h3>진료안내</h3>
          <p>대표전화 1588-5700</p>
          <button>안내보기</button>
        </div>
        <div className="shortcut">
          <h3>로그인</h3>
          <p>회원 및 비회원 로그인</p>
          <button>로그인</button>
        </div>
      </section>
    </main>
  );
}

export default Home;
