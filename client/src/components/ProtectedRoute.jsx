import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role-based protection
  if (user.role === "user") {
    return <Navigate to="/cars" replace />;
  }

  return children;
}

export default ProtectedRoute;
