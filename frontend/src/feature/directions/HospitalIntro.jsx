import React from "react";
import "./HospitalIntro.css";
import {
  FaBook,
  FaFlask,
  FaStethoscope,
  FaHospitalUser,
  FaVials,
  FaHeartbeat,
} from "react-icons/fa";

export default function HospitalIntro() {
  return (
    <div className="hospital-intro">
      {/* 병원개요 */}
      <section className="overview-section">
        <h2 className="intro-section-title">병원개요</h2>
        <h3 className="overview-subtitle">
          서울대학교병원의 어제 오늘 그리고 미래
        </h3>
        <p className="overview-text">
          서울대학교병원은 지난 139년간 국가중앙병원의 소임을 충실히 수행하며
          대한민국 의료를 선도해왔습니다. 1885년 제중원으로 출발하여 1946년 국립
          서울대학교 의과대학 부속병원, 1978년 특수법인 서울대학교병원으로
          개편되었습니다. 오늘날 어린이병원, 암병원, 분당서울대학교병원,
          서울특별시보라매병원, 강남센터, 국립교통재활병원, SKSH 등 우수한 의료
          네트워크를 구축하여 최고의 의료 서비스를 제공하고 있습니다.
        </p>
      </section>
      {/* 설립목적 */}
      <section className="purpose-section mt-5">
        <h2 className="section-title">설립목적</h2>
        <div className="purpose-diagram">
          <div className="circle education">교육</div>
          <div className="circle research">연구</div>
          <div className="circle care">진료</div>
        </div>
        <p className="purpose-text">
          서울대학교병원은 교육법에 의한 의학, 간호학 및 약학 등에 관한 교육,
          연구와 진료를 통하여 의학발전을 도모하고 국민보건향상에 기여함을
          목적으로 한다.
        </p>
      </section>

      {/* 기능 */}
      <section className="function-section">
        <h2 className="section-title">기능</h2>
        <div className="function-grid">
          <div className="function-item">
            <FaBook size={40} className="icon" />
            <p>서울대학교 의학, 간호학 및 약학 등 학생의 임상교육</p>
          </div>
          <div className="function-item">
            <FaHospitalUser size={40} className="icon" />
            <p>전공의 수련 및 의료요원 훈련</p>
          </div>
          <div className="function-item">
            <FaFlask size={40} className="icon" />
            <p>의학, 간호학, 약학 등의 연구</p>
          </div>
          <div className="function-item">
            <FaVials size={40} className="icon" />
            <p>임상연구</p>
          </div>
          <div className="function-item">
            <FaStethoscope size={40} className="icon" />
            <p>진료사업</p>
          </div>
          <div className="function-item">
            <FaHeartbeat size={40} className="icon" />
            <p>국민보건향상에 관한 사업전개</p>
          </div>
        </div>
      </section>
    </div>
  );
}
