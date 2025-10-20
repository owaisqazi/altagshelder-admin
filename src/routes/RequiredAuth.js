/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

const RequiredAuth = ({ children }) => {
  let auth = localStorage.getItem("token");
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
export default RequiredAuth;
