import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { DashboardLayout } from "./components/DashboardLayout";
import { Account } from "./pages/Account";
import { Settings } from "./pages/Settings";
const Router = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default withAuthenticator(Router, {
  socialProviders: ["google"],
});
