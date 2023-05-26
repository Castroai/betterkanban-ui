import { useState } from "react";
import { LoginForm } from "../../components/LoginForm";
import { SignUpForm } from "../../components/SignUpForm";
const LoginPage = () => {
  const [state, setState] = useState<"LOGIN" | "REGISTER">("LOGIN");

  return (
    <div className="flex h-full justify-center items-center ">
      {state === "LOGIN" ? (
        <LoginForm setState={setState} />
      ) : (
        <SignUpForm setState={setState} />
      )}
    </div>
  );
};
export default LoginPage;
