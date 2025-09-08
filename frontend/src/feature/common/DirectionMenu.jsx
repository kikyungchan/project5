import React from "react";
import { useNavigate } from "react-router";
import "./DirectionsMenu.css";
import {
  FaMapMarkerAlt,
  FaHospital,
  FaStethoscope,
  FaStore,
} from "react-icons/fa";

export default function DirectionsMenu() {
  const navigate = useNavigate();

  const menus = [
    {
      label: "오시는 길",
      icon: <FaMapMarkerAlt size={40} />,
      path: "/directions",
    },
    {
      label: "원내위치도",
      icon: <FaHospital size={40} />,
      path: "/hospitalmap",
    },
    {
      label: "진료과/검사실",
      icon: <FaStethoscope size={40} />,
      path: "/dept",
    },
    { label: "주변편의시설", icon: <FaStore size={40} />, path: "/facilities" },
  ];

  return (
    <div className="directions-menu">
      <h2 className="menu-title">오시는길</h2>
      <p className="menu-subtitle">병원으로 오시는 길을 알려드립니다.</p>

      {/* 아이콘 네 개 */}
      <div className="menu-grid">
        {menus.map((m) => (
          <div
            key={m.label}
            className="menu-item"
            onClick={() => navigate(m.path)}
          >
            <div className="menu-icon">{m.icon}</div>
            <div className="menu-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* 주소 + 지도 */}
      <div className="map-box">
        <p className="map-address mt-4">
          서울특별시 마포구 신촌로 176 <br />
          중앙빌딩 5층 중앙정보처리학원/중앙정보기술인재개발원 이대 신촌캠퍼스
        </p>

        {/* 카카오 지도 iframe */}
        <div className="map-iframe mt-4">
          <iframe
            title="이대 신촌캠퍼스 지도"
            src="https://map.kakao.com/link/map/이대 신촌캠퍼스,37.556632,126.946261"
            width="100%"
            height="550"
            style={{ border: "0" }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
