import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ProtectedRoute component - prevents unauthorized access to pages
// Only logged in users with correct role can see protected pages
export default function ProtectedRoute({ children, roles }) {
  // Get current user's authentication status and role
  const { isAuthenticated, user } = useAuth();

  // If user not logged in, send them to login page
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // If user role is not in allowed roles list, redirect to their dashboard
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  // If all checks pass, show the protected page
  return children;
}
