import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeWrapper } from "./contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router.tsx";
import { Amplify } from "aws-amplify";
import "./index.css";

import awsExports from "./aws-exports";
import { AuthWrapper } from "./contexts/AuthContext/index.tsx";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
const [localRedirectSignIn, productionRedirectSignIn] =
  awsExports.oauth.redirectSignIn.split(",");
const [localRedirectSignOut, productionRedirectSignOut] =
  awsExports.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsExports,
  oauth: {
    ...awsExports.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};
Amplify.configure(updatedAwsConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <ThemeWrapper>
          <Router />
        </ThemeWrapper>
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
