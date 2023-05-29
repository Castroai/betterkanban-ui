import { withTheme } from "../../contexts/ThemeContext";
import { ReactNode } from "react";
import {
  BsFillPeopleFill,
  BsDashCircle,
  BsBell,
  BsGear,
  BsDoorClosed,
} from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import type { IconType } from "react-icons";
import { SearchBar } from "../SearchBar";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Outlet, useNavigate } from "react-router-dom";
const NavItem = ({
  Icon,
  label,
  onClick,
}: {
  Icon: IconType;
  label?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:rounded-md p-1 "
      onClick={onClick}
    >
      <Icon /> {label}
    </div>
  );
};

export const DashboardLayout = () => {
  const { darkToggle, setDarkToggle } = withTheme();
  const { signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  const logOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <div className={`h-full flex ${darkToggle ? "dark" : ""}`}>
      <div className="bg-light-secondary dark:bg-dark-secondary w-48 p-4 justify-between flex flex-col items-start pt-10 pb-10 dark:text-dark-text text-light-text">
        <div className="flex flex-col gap-3 ">
          <NavItem Icon={BsDashCircle} label="Projects" />
          <NavItem Icon={BsFillPeopleFill} label="Clients" />
          <NavItem Icon={BsBell} label="Notifications" />
          <NavItem Icon={TbBrandGoogleAnalytics} label="Analytics" />
          <NavItem Icon={BsGear} label="Settings" />
        </div>
        <div>
          <NavItem Icon={BsDoorClosed} label="logout" onClick={logOut} />
        </div>
      </div>

      <div className={` h-full w-full flex flex-col`}>
        <div className="w-full p-4 flex bg-light-primary dark:bg-dark-primary ">
          <div className="w-1/3  ">
            <SearchBar />
          </div>
          <button onClick={() => setDarkToggle(!darkToggle)}>Toggle</button>
        </div>
        <div className="pl-4 bg-light-primary flex flex-1 dark:bg-dark-primary dark:text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
