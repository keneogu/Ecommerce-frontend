import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const Layout = () => {
  return (
    <div className="grid">
      <div className="w-44 bg-slate-800 text-white fixed h-screen">
        <Sidebar />
      </div>
      <div className="ml-44">
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Layout;
