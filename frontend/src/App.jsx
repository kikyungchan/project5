import { BrowserRouter, Route, Routes } from "react-router";
import React from "react";
import { MemberAdd } from "./feature/Member/MemberAdd.jsx";
import { MemberLogin } from "./feature/Member/MemberLogin.jsx";
import Header from "./feature/common/Header.jsx";
import Home from "./feature/common/Home.jsx";
import Footer from "./feature/common/Footer.jsx";
import { AuthenticationContextProvider } from "./feature/common/AuthenticationContextProvider.jsx";
import ReservationPage from "./feature/reservation/ReservationPage.jsx";
import MyPage from "./feature/Member/MyPage.jsx";
import ReservationCheck from "./feature/reservation/ReservationCheck.jsx";

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
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthenticationContextProvider>
  );
}

export default App;
