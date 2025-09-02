import React, { useContext, useEffect, useState } from "react";
import "./MyPage.css";
import { useNavigate } from "react-router";
import { AuthenticationContext } from "../common/AuthenticationContextProvider.jsx";
import axios from "axios";

export default function MyPage() {
  const { user } = useContext(AuthenticationContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/check", { params: { memberId: user?.loginId } })
      .then((res) => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">마이페이지</h2>

      <div className="mypage-content">
        {/* 좌측 메인 카드 영역 */}
        <div className="mypage-main">
          {/* 진료예약확인 */}
          <div className="mypage-card">
            <div className="card-header">
              <span>진료예약확인</span>
              <button
                className="card-toggle"
                onClick={() => navigate("/reservationcheck")}
              >
                ＋
              </button>
            </div>
            <div className="card-body">
              {" "}
              {loading ? (
                <p>불러오는 중...</p>
              ) : reservations.length === 0 ? (
                <p>조회 가능한 진료예약이 없습니다.</p>
              ) : (
                <table className="reservation-table">
                  <thead>
                    <tr>
                      <th>진료과</th>
                      <th>의료진</th>
                      <th>예약일시</th>
                      <th>메모</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r.id}>
                        <td>{r.doctor.department.name}</td>
                        <td>{r.doctor.name}</td>
                        <td>
                          {new Date(r.reservationDateTime).toLocaleString(
                            "ko-KR",
                          )}
                        </td>
                        <td>{r.memo || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* 최근 진료이력조회 */}
          <div className="mypage-card">
            <div className="card-header">
              <span>최근 진료이력조회</span>
              <button className="card-toggle">＋</button>
            </div>
            <div className="card-body">
              최근 1년간 수진이력이 존재하지 않습니다.
            </div>
          </div>

          {/* 회원정보수정 */}
          <div className="mypage-card">
            <div className="card-header">
              <span>회원정보수정</span>
            </div>
            <div className="card-body">
              회원정보 수정 및 비밀번호 변경은 아래 버튼을 눌러주세요.
              <br />
              <button onClick={() => navigate("/edit")} className="edit-btn">
                회원정보 수정
              </button>
            </div>
          </div>

          {/* 회원탈퇴 */}
          <div className="mypage-card">
            <div className="card-header">
              <span>회원탈퇴</span>
            </div>
            <div className="card-body">
              회원 탈퇴를 원하시는 경우 아래 버튼을 눌러주세요.
              <br />
              <button className="exit-btn">회원탈퇴</button>
            </div>
          </div>
        </div>

        {/* 우측 사이드 메뉴 */}
        <aside className="mypage-side">
          <div className="side-box">
            <h4>관련 콘텐츠</h4>
            <ul>
              <li>
                <a href="/cancel">진료예약취소</a>
              </li>
              <li>
                <a href="/receipt">회원정보보수정</a>
              </li>
              <li>
                <a href="/reservationcheck">외래예약확인</a>
              </li>
            </ul>
          </div>

          <div className="side-box">
            <h4>자주 찾는 서비스</h4>
            <p>
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="/reservation"
              >
                본원 진료예약
              </a>
              <br />
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="/reservationcheck"
              >
                외래예약확인
              </a>
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
