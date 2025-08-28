import React from "react";
import "./css/MainBanner.css";

function MainBanner() {
  return (
    <section className="main-banner">
      <div className="banner-text">
        <h2>우리 가족 건강을 지키는 최신 의학정보</h2>
        <p>힐링과 감동, 웃음까지 갖춘 병원TV를 만나보세요</p>
        <button className="banner-btn">유튜브로 영상 보기</button>
      </div>
    </section>
  );
}

export default MainBanner;
