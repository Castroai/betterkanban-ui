import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (user) {
    return <>{children}</>;
  } else
    return (
      <Navigate to="/login" replace={true} /> // Redirect to login if not authenticated
    );
};
