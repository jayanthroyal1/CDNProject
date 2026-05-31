import { Navigate } from "react-router-dom";

import { useAuth } from "../../shared/hooks/useAuth";

const RoleRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleRoute;
