import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Dashboard from "./Dashboard";
import Footer from "components/Footer/Footer";
import Frontend from "./Frontend";

export default function Index() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}
