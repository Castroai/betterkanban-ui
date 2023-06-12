import { useSearchParams, Navigate } from "react-router-dom";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import { httpService } from "../../services/httpService";

export const Invite = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const tenantid = searchParams.get("tenant");
  const email = searchParams.get("email");
  const secret = searchParams.get("secret");
  const [form, setForm] = useState({
    email: email || "",
    password: "",
  });

  const urlIsValid = () => {
    if (tenantid && email && secret) {
      return true;
    }
    return false;
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await httpService.post("/complete-invite", {
      email: email,
      tenantid: tenantid,
      secret: secret,
      password: form.password,
    });
    console.log(data);
  };
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, password: e.target.value }));
  };
  if (urlIsValid()) {
    return (
      <div>
        <div className="flex flex-1 justify-center items-center h-screen bg-light-secondary">
          <form
            className="w-full md:w-1/3 md:bg-light-primary h-auto p-5 flex justify-center flex-col gap-5 rounded-md "
            onSubmit={submitHandler}
          >
            <div>You've been invited</div>
            <div>
              <Input
                label="Email"
                placeholder="Johndoe@email.com"
                type="email"
                required
                value={form.email}
                name="email"
                id="email"
                disabled
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
              Join the team
            </Button>
            <hr />
          </form>
        </div>
      </div>
    );
  }
  return <Navigate to={"/"} replace={true} />;
};
