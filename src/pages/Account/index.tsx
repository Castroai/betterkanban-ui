import { FormEvent, useState } from "react";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { httpService } from "../../services/httpService";

export const Account = () => {
  const [invitedUser, setInvitedUser] = useState<string>("");
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await httpService.post("/invite", {
      invitedUser: invitedUser,
    });
    console.log(data);
  };
  return (
    <div className="flex w-full flex-col flex-1 gap-5">
      <div className="  w-full">Account Page</div>
      <hr />
      <div className="w-auto md:w-1/3 bg-light-secondary p-2 rounded-md">
        <div className="p-2 font-semibold">Add A User</div>
        <form className=" flex  flex-col gap-5" onSubmit={submitHandler}>
          <div>
            <Input
              label="Enter Email"
              type="email"
              placeholder="coworker@email.com"
              required
              value={invitedUser}
              onChange={(e) => setInvitedUser(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" variant="SECONDARY">
              Invite User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
