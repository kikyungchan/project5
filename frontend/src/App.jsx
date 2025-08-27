import { BrowserRouter, Route, Routes } from "react-router";
import React from "react";
import { MemberAdd } from "./MemberAdd.jsx";
import { MemberLogin } from "./MemberLogin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route path="signup" element={<MemberAdd />} />
        <Route path="login" element={<MemberLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
