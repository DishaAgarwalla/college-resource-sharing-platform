import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const role = localStorage.getItem("role");

  if (role !== "ADMIN") {

    alert("Access Denied");

    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;