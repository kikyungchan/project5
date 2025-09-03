import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Reservation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { doctorExtraInfo } from "../department/unit/doctorExtraInfo.js";
import { AuthenticationContext } from "../common/AuthenticationContextProvider.jsx";
import { Link, useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";

export default function ReservationPage() {
  const [selectedDoctorForInfo, setSelectedDoctorForInfo] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);
  const [memo, setMemo] = useState("");
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reservedTimes, setReservedTimes] = useState([]);
  // 샘플 시간 리스트 (09:00 ~ 16:00)
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0]; // yyyy-MM-dd
      axios
        .get("/api/available", {
          params: { doctorId: selectedDoctor.id, date: dateStr },
        })
        .then((res) => {
          setReservedTimes(res.data.reservedTimes); // ["09:00", "13:00"]
        });
    }
  }, [selectedDoctor, selectedDate]);
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

  function handleReservationButton() {
    const dateStr = selectedDate.toISOString().split("T")[0]; // yyyy-MM-dd
    const dateTime = `${dateStr}T${selectedTime}:00`; // "2025-09-05T09:00:00"
    axios
      .post("/api/reservation", null, {
        params: {
          doctorId: selectedDoctor.id,
          memberId: user.loginId,
          dateTime: dateTime,
          memo: memo,
        },
      })
      .then((res) => {
        alert("예약이 완료되었습니다.");
        setMemo("");
        return axios.get("/api/available", {
          params: { doctorId: selectedDoctor.id, date: dateStr },
        });
      })
      .then((res) => {
        setReservedTimes(res.data.reservedTimes);
        setSelectedTime(null); // 선택했던 시간 초기화
        navigate("/reservationcheck");
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("예약 중 오류가 발생했습니다.");
        }
      });
  }

  const handleShowDoctorInfo = (doc) => {
    setSelectedDoctorForInfo(doc);
  };

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">인터넷 진료예약</h2>

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
                    <div className="doctor-card-header">
                      <button
                        className="info-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#doctorInfoModal"
                        onClick={() => handleShowDoctorInfo(doc)}
                      >
                        <FiSearch size={19} />
                      </button>
                    </div>
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
                        className={`reserve-btn ${selectedDoctor?.id === doc.id ? "active" : ""}`}
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
            <div
              className="info-actions d-flex"
              style={{ justifyContent: "center" }}
            >
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  border: "1px solid white",
                  padding: "0.3rem",
                  width: "200px",
                  textAlign: "center",
                }}
                to={"/reservationcheck"}
              >
                최근예약확인
              </Link>
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
              {/* 시간 선택 */}
              {selectedDate && (
                <div className="time-section">
                  <h5>시간 선택</h5>
                  <div className="time-grid">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={`time-btn ${selectedTime === time ? "active" : ""}`}
                        disabled={reservedTimes.includes(time)}
                        data-bs-toggle="modal"
                        data-bs-target="#reservationModal"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="reservationModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">예약 시 주의사항</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="닫기"
              ></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-info">
                정확히 선택하기 어려운 경우 예약센터(1234-1234)로 문의 후 예약해
                주세요. <br />
                <span className="text-danger">
                  진료 분야가 맞지 않게 예약된 경우, 진료를 받을 수 없습니다.
                </span>
              </div>
              <p>
                <strong>{selectedDept?.name}</strong>/{" "}
                <strong>{selectedDoctor?.name}</strong>
              </p>
              <p>
                선택한 일시: {selectedDate?.toLocaleDateString()} {selectedTime}
              </p>
              <textarea
                placeholder="진단내용을 간략히 입력해주세요."
                maxLength={25}
                className="form-control"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                취소
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleReservationButton}
              >
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 의사 정보 모달 */}
      <div
        className="modal fade"
        id="doctorInfoModal"
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
              ></button>
            </div>
            <div className="modal-body">
              {selectedDoctorForInfo ? (
                <>
                  <div className="d-flex gap-3 align-items-center">
                    <img
                      src={
                        selectedDoctorForInfo.thumbnailUrl &&
                        selectedDoctorForInfo.thumbnailUrl.trim() !== ""
                          ? selectedDoctorForInfo.thumbnailUrl
                          : "../의사기본썸넬.jpg"
                      }
                      alt={selectedDoctorForInfo.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h4>{selectedDoctorForInfo.name}</h4>
                      <p>{selectedDoctorForInfo.position}</p>
                    </div>
                  </div>
                  <hr />
                  <h5>학력/경력</h5>
                  <p>
                    {doctorExtraInfo[selectedDoctorForInfo.id]?.education ||
                      "정보 없음"}
                  </p>
                  <p>
                    {doctorExtraInfo[selectedDoctorForInfo.id]?.career ||
                      "정보 없음"}
                  </p>
                  <hr />
                  <h5>논문</h5>
                  <p>
                    {doctorExtraInfo[selectedDoctorForInfo.id]?.papers ||
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
