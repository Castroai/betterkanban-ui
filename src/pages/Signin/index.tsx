import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

export const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ code: string } | undefined>();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      Auth.signIn(form.email, form.password).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      setErrors(error as { code: string });
      console.log("error signing in", error);
    }
  };

  return (
    <div className="flex items-center h-full bg-light-secondary justify-center flex-col">
      <form
        className="w-full md:w-1/3 md:bg-light-primary h-auto p-5 flex justify-center flex-col gap-5 rounded-md "
        onSubmit={submitHandler}
      >
        <div>Welcome Back</div>
        <div>
          <Input
            label="Email"
            placeholder="Johndoe@email.com"
            type="email"
            required
            value={form.email}
            name="email"
            id="email"
            onChange={changeHandler}
          />
        </div>
        <div>
          <Input
            label="Password"
            placeholder="Super Secure Password"
            type="password"
            required
            value={form.password}
            name="password"
            id="password"
            onChange={changeHandler}
          />
        </div>
        <Button variant="SECONDARY" type="submit">
          Sign in
        </Button>
        <div className="flex gap-2">
          <input type="checkbox" />
          Remember Me ?
        </div>
        <div className="flex justify-end">Forgot Password ?</div>
        <hr />
        <div>
          <GoogleLoginButton
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }
          />
        </div>
        <span className="text-center text-light-text underline cursor-pointer">
          Sign up instead
        </span>
      </form>
      <div className="text-red-500">
        {errors && errors.code === "NotAuthorizedException"
          ? "Invalid Username or password"
          : ""}
      </div>
    </div>
  );
};
