import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  return (
    <div>
      {isLoading === false && isAuthenticated === false ? (
        <Navigate to="/login" />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ProtectedRoute;
