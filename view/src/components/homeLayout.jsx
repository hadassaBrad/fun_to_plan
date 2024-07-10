
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import '../css/homeLayout.css'; 
function HomeLayout() {
  return (
    <div className="layout-container">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;
