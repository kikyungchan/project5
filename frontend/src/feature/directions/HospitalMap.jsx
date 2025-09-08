import React, { useState } from "react";
import "./HospitalMap.css";

export default function HospitalMap() {
  // 기본은 1층
  const [selectedFloor, setSelectedFloor] = useState("1F");

  // 층별 이미지 매핑
  const floorImages = {
    B1: "../../../public/floor/지하1층.png",
    "1F": "../../../public/floor/1층.png",
    "2F": "../../../public/floor/2층.png",
    "3F": "../../../public/floor/3층.png",
    "4F": "../../../public/floor/4층.png",
    "5F": "../../../public/floor/5층.png",
    "6F": "../../../public/floor/6층.png",
    "7F": "../../../public/floor/7층.png",
    "8F": "../../../public/floor/8층.png",
  };

  return (
    <div className="map-container">
      <h2 className="map-title">원내 배치도</h2>

      <div className="map-body">
        {/* 좌측: 층별 이미지 */}
        <div className="map-left">
          <img
            src={floorImages[selectedFloor]}
            alt={`${selectedFloor} 배치도`}
            className="map-image"
          />
          <div className="floor-overlay">{selectedFloor}</div>
        </div>

        {/* 우측: 층 버튼 */}
        <div className="map-right">
          <h4>층별 선택</h4>
          <div className="floor-list">
            {Object.keys(floorImages).map((floor) => (
              <button
                key={floor}
                className={`floor-btn ${
                  selectedFloor === floor ? "active" : ""
                }`}
                onClick={() => setSelectedFloor(floor)}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
