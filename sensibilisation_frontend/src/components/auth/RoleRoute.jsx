import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RoleRoute({ rolesAutorises }) {
  const { user } = useAuth();
  const autorise = user && rolesAutorises.includes(user.role);
  return autorise ? <Outlet /> : <Navigate to="/" replace />;
}
