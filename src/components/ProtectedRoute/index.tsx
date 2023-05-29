import { Outlet } from "react-router-dom";
import { DashboardLayout } from "../DashboardLayout";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Login from "../../pages/Login";
const ProtectedRoute = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  return route == "authenticated" ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Login />
  );
};

export default ProtectedRoute;
