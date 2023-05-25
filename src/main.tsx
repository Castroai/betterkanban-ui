import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthWrapper } from "./contexts/AuthContext/index.tsx";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthWrapper>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthWrapper>
  </React.StrictMode>
);
