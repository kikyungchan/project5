import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Reservation.css";
import { AuthenticationContext } from "../common/AuthenticationContextProvider.jsx";

export default function ReservationPage() {
  const { user } = useContext(AuthenticationContext);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios.get("/api/departments").then((res) => setDepartments(res.data));
  }, []);

  useEffect(() => {
    if (selectedDept) {
      axios
        .get("/api/doctors", { params: { deptId: selectedDept.id } })
        .then((res) => setDoctors(res.data));
      setSelectedDoctor(null); // 진료과 바꿀 때 달력 초기화
    }
  }, [selectedDept]);

  return (
    <div className="reservation-container">
      <h2>인터넷 진료예약</h2>

      <div className="reservation-body">
        {/* 좌측: 진료과 + 의사목록 */}
        <div className="reservation-left">
          {/* 진료과 목록 */}
          <div className="dept-grid">
            {departments.map((dept) => (
              <button
                key={dept.id}
                className={`dept-btn ${selectedDept?.id === dept.id ? "active" : ""}`}
                onClick={() => setSelectedDept(dept)}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* 의사 목록 */}
          {selectedDept && (
            <div className="doctor-list">
              <h3>의료진 목록 ({doctors.length})</h3>
              <div className="doctor-grid">
                {doctors.map((doc) => (
                  <div key={doc.id} className="doctor-card">
                    <img
                      src={
                        doc.thumbnailUrl && doc.thumbnailUrl.trim() !== ""
                          ? doc.thumbnailUrl
                          : "../의사기본썸넬.jpg"
                      }
                      alt={doc.name}
                    />
                    <div>
                      <div className="doctor-name">{doc.name}</div>
                      <div className="doctor-position">{doc.position}</div>
                      <button
                        className="reserve-btn"
                        onClick={() => setSelectedDoctor(doc)}
                      >
                        선택
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 우측: 환자정보 + 달력 */}
        <div className="reservation-right">
          <div className="reservation-info">
            <h3>예약하실 정보확인</h3>
            <div className="info-row">
              <span>환자명 :</span>
              <b>{user ? user.name : "-"}</b>
            </div>
            <div className="info-row">
              <span>병원/진료과 :</span>
              <b>{selectedDept ? selectedDept.name : "-"}</b>
            </div>
            <div className="info-row">
              <span>의료진 :</span>
              <b>{selectedDoctor ? selectedDoctor.name : "-"}</b>
            </div>
            <div className="info-row">
              <span>진료일시 :</span>
              <b>{selectedDate ? selectedDate.toLocaleDateString() : "-"}</b>
            </div>
          </div>

          {/* 달력 */}
          {selectedDoctor && (
            <div className="calendar-section">
              <h4>진료 일정</h4>
              <Calendar
                formatDay={(locale, date) => date.getDate()}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
