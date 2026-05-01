import { Navigate } from "react-router-dom";
import { getSession, ROLE_HOME } from "@/lib/auth";

const AppHome = () => {
  const session = getSession();
  if (!session) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[session.role]} replace />;
};

export default AppHome;
