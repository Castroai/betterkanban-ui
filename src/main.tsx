import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { AuthWrapper } from "./contexts/AuthContext/index.tsx";
import { Authenticator } from "@aws-amplify/ui-react";

import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router.tsx";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authenticator.Provider>
        <Router />
      </Authenticator.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
