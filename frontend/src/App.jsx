import { BrowserRouter, Route, Routes } from "react-router";
import { MemberAdd } from "./feature/member/MemberAdd.jsx";
import { MemberLogin } from "./feature/member/MemberLogin.jsx";
import { MemberEdit } from "./feature/member/MemberEdit.jsx";
import React from "react";
import Home from "./feature/common/Home.jsx";
import MyPage from "./feature/member/MyPage.jsx";
import Header from "./feature/common/Header.jsx";
import Footer from "./feature/common/Footer.jsx";
import ReservationPage from "./feature/reservation/ReservationPage.jsx";
import ReservationCheck from "./feature/reservation/ReservationCheck.jsx";
import { AuthenticationContextProvider } from "./feature/common/AuthenticationContextProvider.jsx";
import DepartmentPage from "./feature/department/DepartmentPage.jsx";
import Directions from "./feature/directions/Directions.jsx";
import HospitalMap from "./feature/directions/HospitalMap.jsx";
import HospitalIntro from "./feature/directions/HospitalIntro.jsx";

function App() {
  return (
    <AuthenticationContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="reservationcheck" element={<ReservationCheck />} />
          <Route path="dept" element={<DepartmentPage />} />
          <Route path="signup" element={<MemberAdd />} />
          <Route path="login" element={<MemberLogin />} />
          <Route path="edit" element={<MemberEdit />} />
          <Route path="map" element={<Directions />} />
          <Route path="infor" element={<HospitalMap />} />
          <Route path="intro" element={<HospitalIntro />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthenticationContextProvider>
  );
}

export default App;
