import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { DashboardLayout } from "./components/DashboardLayout";
const Router = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default withAuthenticator(Router, {
  socialProviders: ["google"],
});
