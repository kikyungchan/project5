import React, { useContext, useEffect, useState } from "react";
import "./ReservationCheck.css";
import { AuthenticationContext } from "../common/AuthenticationContextProvider.jsx";
import axios from "axios";

export default function ReservationCheck() {
  const { user } = useContext(AuthenticationContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/check", { params: { memberId: user?.loginId } })
      .then((res) => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch((err) => {});
  }, [user]);

  function handleCancel(id) {
    if (!window.confirm("정말 취소하시겠습니까?")) return;

    axios
      .delete(`/api/reservation/${id}`, { params: { memberId: user?.loginId } })
      .then(() => {
        setReservations((prev) => prev.filter((r) => r.id !== id)); // 화면 즉시 갱신
        alert("예약이 취소되었습니다.");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "취소 중 오류가 발생했습니다.");
      });
  }

  return (
    <div className="page-container">
      <h2 className="page-title">진료예약확인</h2>

      <div className="page-content">
        {/* 좌측 메인 컨텐츠 */}
        <div className="page-main">
          <hr />
          {loading ? (
            <p>불러오는 중...</p>
          ) : reservations.length === 0 ? (
            <p className="empty-text">조회 가능한 진료예약이 없습니다.</p>
          ) : (
            <table className="reservation-table">
              <thead>
                <tr>
                  <th>진료과</th>
                  <th>의료진</th>
                  <th>예약일시</th>
                  <th>메모</th>
                  <th>취소</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td>{r.doctor.department.name}</td>
                    <td>{r.doctor.name}</td>
                    <td>
                      {new Date(r.reservationDateTime).toLocaleString("ko-KR")}
                    </td>
                    <td>{r.memo || "-"}</td>
                    <td>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(r.id)}
                      >
                        취소
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <hr />
          {/* 안내 박스 */}
          <div className="notice-box">
            <h4>⚠ 주의</h4>
            <p>
              진료예약취소는 <b>진료일 이전(자정)</b>까지 가능합니다. (수납기록
              및 검사예약이 없는 진료만 변경/취소가 가능)
            </p>
            <p>
              예약 후, 해당 일정으로 타임으로의 <b>변경 요청은 불가</b>합니다.
            </p>
            <p>
              특정 진료과(방사선종양학과, 영상의학과, 마취통증의학과)의 예약이
              조회되지 않을 수 있습니다.
            </p>
            <p>
              예약이 조회되지 않을 경우에는
              <a href="tel:15885700"> 예약센터(1234-1234)</a>나 해당 진료과로
              문의해 주십시오.
            </p>
          </div>

          {/* 검사 예약 */}
          <h3 className="section-title">검사예약확인</h3>
          <hr />
          <p className="desc-text">
            <span className="text-danger">*</span>
            검사예약은 조회만 가능하며, 특정 검사는 조회가 되지 않을 수도
            있습니다.
          </p>
          <p className="empty-text">조회 가능한 검사예약이 없습니다.</p>
          <hr />

          {/* 준비사항 */}
          <h3 className="section-title">준비사항</h3>
          <p className="desc-text">
            <b>요양급여의뢰서(진료의뢰서)를 반드시 지참하십시오.</b>
          </p>
          <p>
            본원은 2단계 요양급여를 제공하는 상급종합병원입니다.
            <br />
            <span style={{ color: "#1B64DAFF" }}>건강보험 환자</span>
            는 1단계 요양급여를 제공하는 의료기관에서 발급한 요양급여의뢰서를
            제출해야 합니다.
            <br />
            <span style={{ color: "#1B64DAFF" }}>의료급여 환자</span>는 2차, 3차
            의료급여기관에서 발급한 의뢰서를 제출해야 요양급여를 받을 수
            있습니다.
          </p>
          <p>
            단,{" "}
            <span style={{ color: "#1B64DAFF" }}>
              재활의학과·가정의학과·본인·혈우병환자
            </span>
            는 의뢰서 없이 진료 가능합니다.
            <br />
            작업치료·운동치료 등 재활치료가 필요한 경우에도 요양급여의뢰서가
            필요합니다.
          </p>

          {/* 이용안내 */}
          <h3 className="section-title">이용안내</h3>

          <h4 className="sub-title">1. 진료비 수납</h4>
          <p>
            진료·검사·치료 당일 받으신 후 가까운 수납창구에 방문해 주시면
            됩니다.
            <br />
            진료예약확인서에 표시된 경우는 수납/미수납 중 확인 가능합니다.
          </p>

          <h4 className="sub-title">2. 진료예약 취소</h4>
          <p>
            수납이력이 없는 진료만 취소 가능합니다.
            <br />
            예약은 진료일 전 자정(12시)까지 취소가 가능하며,
            예약센터(1234-1234)에 문의 바랍니다.
            <br />
            당일 예약/취소 횟수는 제한될 수 있습니다.
          </p>

          <h4 className="sub-title">
            3. 동일 여러 진료과에서 진료를 보는 경우
          </h4>
          <p>
            최소 30분~1시간 이상 간격을 두고 예약해 주시기 바랍니다.
            <br />
            진료과간 이동 시간이나 검사 시간이 겹칠 수 있으므로 담당 진료과와
            협의해 주십시오.
          </p>
        </div>

        {/* 우측 사이드 */}
        <aside className="page-side">
          <div className="side-box">
            <h4>관련 콘텐츠</h4>
            <ul>
              <li>
                <a href="/history">진료이력조회</a>
              </li>
              <li>
                <a href="/guide">진료안내</a>
              </li>
              <li>
                <a href="/reserve-info">예약안내</a>
              </li>
              <li>
                <a href="/map">오시는길</a>
              </li>
              <li>
                <a href="/clinic-map">원내위치도</a>
              </li>
            </ul>
          </div>

          <div className="side-box">
            <h4>자주 찾는 서비스</h4>
            <p>
              <a href="/reservation">본원 진료예약</a>
              <br />
              <a href="/reservationcheck">외래예약확인</a>
            </p>
          </div>

          <div className="side-box">
            <h4>대표전화</h4>
            <div className="call-box">
              <strong>1234-1234</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
