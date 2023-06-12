import { FormEvent, useEffect, useState } from "react";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { httpService } from "../../services/httpService";
import { Users } from "../../types";

export const Account = () => {
  const [invitedUser, setInvitedUser] = useState<string>("");
  const [allUsers, setAllUsers] = useState<Users>([]);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await httpService.post("/invite", {
      invitedUser: invitedUser,
    });
    console.log(data);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const { data } = await httpService.get("/users");
      setAllUsers(data);
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="flex w-full flex-col flex-1 gap-5">
      <div className="  w-full">Account Page</div>
      <hr />
      <div className="flex justify-evenly">
        <div className="w-auto bg-light-secondary p-2 rounded-md">
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
        <div className="w-auto">
          <div>Users in my tenant</div>
          <div className="flex flex-col gap-2">
            {allUsers &&
              allUsers.map((user, index) => {
                return (
                  <div
                    className="p-2 border-2 border-light-secondary flex"
                    key={index}
                  >
                    <p>{user.email}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
