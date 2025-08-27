import { BrowserRouter, Route, Routes } from "react-router";
import React from "react";
import { MemberAdd } from "./MemberAdd.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route path="signup" element={<MemberAdd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
