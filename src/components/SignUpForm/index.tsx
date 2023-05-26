// import { useNavigate } from "react-router-dom";
import { withAuth } from "../../contexts/AuthContext";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

interface Props {
  setState: React.Dispatch<React.SetStateAction<"LOGIN" | "REGISTER">>;
}
export const SignUpForm = ({ setState }: Props) => {
  //   const navigate = useNavigate();
  const { handleLogin } = withAuth();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [validFields, setValidFields] = useState<{
    email: null | boolean;
    password: null | boolean;
    name: null | boolean;
  }>({
    email: null,
    password: null,
    name: null,
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
    const nameState = (): boolean | null => {
      const { name } = formState;
      if (name === "") {
        return null;
      } else if (name.length > 1) {
        return true;
      } else return false;
    };
    setValidFields(() => ({
      password: passwordState(),
      email: emailState(),
      name: nameState(),
    }));
  };

  const isFieldValid = useMemo(() => validator(), [formState]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((current) => ({ ...current, [name]: value }));
    isFieldValid;
  };

  const submitHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await handleLogin({
        email: formState.email,
        name: formState.name,
        password: formState.password,
      });
      alert("Register Sucessfully");
    } catch (error) {
      console.error(error);
    }
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
          name="name"
          label="Name"
          placeholder="John Smith"
          required
          type="text"
          value={formState.name}
          valid={validFields.name}
          onChange={changeHandler}
        />
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
        <div className="text-white">
          Already have an account ?
          <span
            onClick={() => {
              setState("LOGIN");
            }}
            className="font-bold underline cursor-pointer"
          >
            Signin
          </span>
        </div>
      </form>
    </div>
  );
};
