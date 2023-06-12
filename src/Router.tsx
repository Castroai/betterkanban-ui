import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { DashboardLayout } from "./components/DashboardLayout";
import { Account } from "./pages/Account";
import { Settings } from "./pages/Settings";
import { PrivateRoute } from "./components/ProtectedRoute";
import { SignIn } from "./pages/Signin";
import { HomePage } from "./pages/Home";
import { Invite } from "./pages/Invite";
import { DataWrapper } from "./contexts/DataContext";
const Router = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DataWrapper>
              <DashboardLayout />
            </DataWrapper>
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/invite" element={<Invite />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
};

export default Router;
