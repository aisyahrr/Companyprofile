import { Navigate, useLocation } from "react-router-dom";
import { getSession, Role } from "@/lib/auth";

export const ProtectedRoute = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Role[];
}) => {
  const location = useLocation();
  const session = getSession();
  if (!session) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (roles && !roles.includes(session.role)) {
    return <Navigate to="/app" replace />;
  }
  return <>{children}</>;
};
