import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({isAdmin}) => {
  const { isAuthenticated, isLoading , user} = useSelector((state) => state.user);
  return (
    <div>
      {isLoading === false && isAuthenticated === false ? (
        <Navigate to="/login" />
      ) : isAdmin === true && user.user?.role !== 'admin' ? (
        <Navigate to="/" />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ProtectedRoute;
