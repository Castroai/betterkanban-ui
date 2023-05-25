import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
