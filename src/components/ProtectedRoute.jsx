import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Preserve intended destination so login can redirect back after success
    return <Navigate to="/oneid" state={{ from: location }} replace />;
  }

  return children;
}
