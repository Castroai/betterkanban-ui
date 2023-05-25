import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DashboardLayout } from "../DashboardLayout";

const ProtectedRoute = () => {
  const [cookies] = useCookies(["authToken"]);

  return cookies.authToken ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
