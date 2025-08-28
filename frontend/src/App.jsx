import { BrowserRouter, Route, Routes } from "react-router";
import React from "react";
import { MemberAdd } from "./feature/Member/MemberAdd.jsx";
import { MemberLogin } from "./feature/Member/MemberLogin.jsx";
import { AuthenticationContextProvider } from "./AuthenticationContextProvider.jsx";

function App() {
  return (
    <AuthenticationContextProvider>
      <BrowserRouter>
        <Routes path="/">
          <Route path="signup" element={<MemberAdd />} />
          <Route path="login" element={<MemberLogin />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationContextProvider>
  );
}

export default App;
