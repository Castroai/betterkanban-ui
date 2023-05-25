import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { withAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = withAuth();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [validFields, setValidFields] = useState<{
    email: null | boolean;
    password: null | boolean;
  }>({
    email: null,
    password: null,
  });

  const validator = () => {
    const emailState = (): boolean | null => {
      const emailFormat =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { email } = formState;
      if (email === "") {
        return null;
      } else if (
        String(formState.email).toLowerCase().match(emailFormat) !== null
      ) {
        return true;
      } else {
        return false;
      }
    };
    const passwordState = (): boolean | null => {
      const { password } = formState;
      if (password === "") {
        return null;
      } else if (password.length > 1) {
        return true;
      } else return false;
    };
    setValidFields(() => ({
      password: passwordState(),
      email: emailState(),
    }));
  };

  const isFieldValid = useMemo(() => validator(), [formState]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((current) => ({ ...current, [name]: value }));
    isFieldValid;
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
    navigate({
      pathname: "/",
    });
  };

  const isSubmitButtonDisabled = Object.values(validFields).some(
    (x) => x === false || x === null
  );

  return (
    <div className="container mx-auto flex justify-center items-center h-full">
      <form
        className="flex flex-col max-w-lg bg-gray-800 p-10 rounded-md  gap-5"
        onSubmit={submitHandler}
      >
        <Input
          name="email"
          label="Email"
          placeholder="someone@gmail.com"
          required
          type="email"
          value={formState.email}
          valid={validFields.email}
          onChange={changeHandler}
        />
        <Input
          name="password"
          label="Password"
          valid={validFields.password}
          placeholder="Enter Password"
          required
          type="password"
          value={formState.password}
          onChange={changeHandler}
        />
        <Button disabled={isSubmitButtonDisabled} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default LoginPage;
