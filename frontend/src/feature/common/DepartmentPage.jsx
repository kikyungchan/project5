import "../common/css/Department.css";
import { useState } from "react";
import { departmentKeywords } from "./departmentKeyords.js";
import axios from "axios";
import { departmentMapping } from "./departmentMapping.js";
import { doctorExtraInfo } from "./doctorExtraInfo.js";

export default function DepartmentPage() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(Object.keys(departmentKeywords));
  const [selectedDept, setSelectedDept] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSearch = () => {
    let found = null;
    for (const [dept, keywords] of Object.entries(departmentKeywords)) {
      if (keywords.some((k) => query.includes(k))) {
        found = dept;
        break;
      }
    }
    setFiltered(found ? [found] : []);
    setSelectedDept(null);
    setDoctors([]);
  };

  const handleReset = () => {
    setQuery("");
    setFiltered(Object.keys(departmentKeywords));
    setSelectedDept(null);
    setDoctors([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectDept = async (dept) => {
    setSelectedDept(dept);
    try {
      const res = await axios.get("/api/doctors", {
        params: { deptId: departmentMapping[dept] }, // mapping 필요
      });
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      setDoctors([]);
    }
  };

  // 카드 클릭 → 선택된 의사 상태 저장
  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <h2 className="page-title">진료과 / 의료진</h2>

        {/* 검색 필터 */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="진료과 또는 질병명을 입력해주세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={handleSearch}>
            검색
          </button>
          <button className="reset-btn" onClick={handleReset}>
            초기화
          </button>
        </div>

        {/* 검색 결과 */}
        <div className="department-grid">
          {filtered.length > 0 ? (
            filtered.map((dept) => (
              <button key={dept} onClick={() => handleSelectDept(dept)}>
                {dept}
              </button>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>

        {/* 의사 카드 목록 */}
        {selectedDept && (
          <div className="doctor-list">
            <h3>
              {selectedDept} 소속 의료진 ({doctors.length})
            </h3>
            <div className="doctor-grid">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="doctor-card"
                  onClick={() => handleSelectDoctor(doc)}
                  data-bs-toggle="modal"
                  data-bs-target="#doctorModal"
                >
                  <img
                    src={
                      doc.thumbnailUrl && doc.thumbnailUrl.trim() !== ""
                        ? doc.thumbnailUrl
                        : "../의사기본썸넬.jpg"
                    }
                    alt={doc.name}
                  />
                  <div className="doctor-name">{doc.name}</div>
                  <div className="doctor-position">{doc.position}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 우측 사이드메뉴 */}
      {/* 우측 사이드메뉴 */}
      <aside className="department-side">
        <div className="side-box">
          <h4>관련 콘텐츠</h4>
          <ul>
            <li>
              <a href="/children">어린이병원</a>
            </li>
            <li>
              <a href="/cancer">암병원</a>
            </li>
            <li>
              <a href="/center">주요의료센터</a>
            </li>
            <li>
              <a href="/clinic">클리닉</a>
            </li>
            <li>
              <a href="/record">의무기록 및 영상검사 사본발급</a>
            </li>
          </ul>
        </div>

        <div className="side-box">
          <h4>자주 찾는 서비스</h4>
          <ul>
            <li>
              <a href="/reservation">본원 진료예약</a>
            </li>
            <li>
              <a href="/guide">진료안내</a>
            </li>
            <li>
              <a href="/reservationcheck">외래예약확인</a>
            </li>
          </ul>
        </div>

        <div className="side-box">
          <h4>대표전화</h4>
          <div className="call-box">
            <strong>1234-1234</strong>
          </div>
        </div>
      </aside>

      {/* 의사 상세 모달 */}
      <div
        className="modal fade"
        id="doctorModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">의료진 정보</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="닫기"
              ></button>
            </div>
            <div className="modal-body">
              {selectedDoctor ? (
                <>
                  <div className="d-flex gap-3 align-items-center">
                    <img
                      src={
                        selectedDoctor.thumbnailUrl &&
                        selectedDoctor.thumbnailUrl.trim() !== ""
                          ? selectedDoctor.thumbnailUrl
                          : "../의사기본썸넬.jpg"
                      }
                      alt={selectedDoctor.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h4>{selectedDoctor.name}</h4>
                      <p>{selectedDoctor.position}</p>
                    </div>
                  </div>
                  <hr />
                  <h5>학력/경력</h5>
                  <p>
                    {doctorExtraInfo[selectedDoctor.id]?.education ||
                      "정보 없음"}
                  </p>
                  <p>
                    {doctorExtraInfo[selectedDoctor.id]?.career || "정보 없음"}
                  </p>
                  <hr />
                  <h5>논문</h5>
                  <p>
                    {doctorExtraInfo[selectedDoctor.id]?.papers ||
                      "등록된 논문 정보가 없습니다."}
                  </p>
                </>
              ) : (
                <p>의료진 정보를 불러오는 중입니다...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
