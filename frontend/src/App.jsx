import { BrowserRouter, Route, Routes } from "react-router";
import { MemberAdd } from "./feature/Member/MemberAdd.jsx";
import { MemberLogin } from "./feature/Member/MemberLogin.jsx";
import { MemberEdit } from "./feature/Member/MemberEdit.jsx";
import React from "react";
import Home from "./feature/common/Home.jsx";
import MyPage from "./feature/Member/MyPage.jsx";
import Header from "./feature/common/Header.jsx";
import Footer from "./feature/common/Footer.jsx";
import ReservationPage from "./feature/reservation/ReservationPage.jsx";
import ReservationCheck from "./feature/reservation/ReservationCheck.jsx";
import { AuthenticationContextProvider } from "./feature/common/AuthenticationContextProvider.jsx";

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
          <Route path="signup" element={<MemberAdd />} />
          <Route path="login" element={<MemberLogin />} />
          <Route path="edit" element={<MemberEdit />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthenticationContextProvider>
  );
}

export default App;
