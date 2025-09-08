import React from "react";
import "./Directions.css";

export default function Directions() {
  return (
    <div className="directions-container">
      <h2 className="directions-title">오시는 길</h2>

      <div className="directions-body">
        {/* 좌측 지도 */}
        <div className="directions-left">
          <img
            style={{ width: "600px", height: "450px" }}
            src="../../../public/오시는길.jpg"
            alt="오시는 길 지도"
            className="directions-map"
          />
        </div>

        {/* 우측 정보 */}
        <div className="directions-right">
          <div className="info-box">
            <h4>주소</h4>
            <p>
              <b>중앙정보처리학원/중앙정보기술인재개발원 이대·신촌캠퍼스</b>
              <br />
              서울 마포구 신촌로 176 중앙빌딩 5층 (대흥동 12-20 중앙빌딩5층)
            </p>
          </div>

          <div className="info-box">
            <h4>지하철</h4>
            <p>
              <b>2호선 이대역</b>
              6번 출구 도보 1분 (출구에서 약 10m)
            </p>
          </div>

          <div className="info-box">
            <h4>버스</h4>
            <ul>
              <li>이대역 하차</li>
              <li>간선: 163, 472</li>
              <li>지선: 7017, 7020, 7611</li>
              <li>광역: 1100, 1200, 1300, 1500, 1601</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
