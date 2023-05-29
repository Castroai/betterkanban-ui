import { Outlet, Navigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "../DashboardLayout";
import { useAuthenticator } from "@aws-amplify/ui-react";
const ProtectedRoute = () => {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  return route == "authenticated" ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
