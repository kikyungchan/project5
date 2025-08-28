import { BrowserRouter, Route, Routes } from "react-router";
import React from "react";
import { MemberAdd } from "./feature/Member/MemberAdd.jsx";
import { MemberLogin } from "./feature/Member/MemberLogin.jsx";
import { AuthenticationContextProvider } from "./feature/common/AuthenticationContextProvider.jsx";
import Header from "./feature/common/Header.jsx";
import Home from "./feature/common/Home.jsx";
import Footer from "./feature/common/Footer.jsx";

function App() {
  return (
    <AuthenticationContextProvider>
      <BrowserRouter>
        <Header />
        <Routes path="/" element={<Home />}>
          <Route path="signup" element={<MemberAdd />} />
          <Route path="login" element={<MemberLogin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthenticationContextProvider>
  );
}

export default App;
