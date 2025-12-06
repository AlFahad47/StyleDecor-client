import React from "react";
import { Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h2>logo</h2>
      <div className="flex items-center">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
