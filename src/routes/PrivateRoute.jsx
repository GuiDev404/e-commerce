import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const PrivateRoute = ({ authStatus }) => {

  return authStatus
    ? <Dashboard />
    : <Navigate to="/auth/login" state={{ visitedPrivatePath: location.pathname }} />;
};

export default PrivateRoute;
