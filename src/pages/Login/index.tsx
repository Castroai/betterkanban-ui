import { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, useLocation } from "react-router";
import "@aws-amplify/ui-react/styles.css";

const Login = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (route === "authenticated") {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <div className="flex items-center justify-center h-full">
      <Authenticator socialProviders={["google"]} />
    </div>
  );
};

export default Login;
