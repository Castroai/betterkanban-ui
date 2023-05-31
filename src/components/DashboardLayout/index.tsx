import { withTheme } from "../../contexts/ThemeContext";
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
import { BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import { useEffect } from "react";
import { httpService } from "../../services/httpService";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
      className="flex items-center gap-4 cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:rounded-md p-1 "
      onClick={onClick}
    >
      <Icon /> {label}
    </div>
  );
};

export const DashboardLayout = () => {
  const { isDarkMode, setDarkToggle } = withTheme();
  const { signOut, user } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  const logOut = () => {
    signOut();
    navigate("/");
  };


  const fetchData = async () => {
    await httpService.get('/')
    console.log(`Authenticated to api successfully!`)
  }
  useEffect(() => {
    fetchData()

  }, [])
  return (
    <div className={`h-full flex ${isDarkMode ? "dark" : ""} `}>
      <div className="bg-light-secondary dark:bg-dark-secondary w-48 p-4 justify-between flex flex-col items-start pt-10 pb-10 dark:text-dark-text text-light-text">
        <div className="flex flex-col gap-4 ">
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

      <div className={` h-full w-full flex flex-col dark:text-dark-text`}>
        <div className="w-full p-4 flex bg-light-primary dark:bg-dark-primary justify-between ">
          {/* Search and toggle */}
          <div className=" flex items-center gap-4 justify-start  ">
            <SearchBar />
            <div className={`flex items-center ${isDarkMode ? "dark" : "light"}`}>
              <button
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                onClick={() => { setDarkToggle(!isDarkMode) }}
              >
                {isDarkMode ? <BsBrightnessHighFill /> : <BsMoonFill />}
              </button>
            </div>
          </div>
          {/* Username */}
          <div>
            {user.attributes?.email}</div>
        </div>
        <div>

        </div>
        <div className="p-4 bg-light-primary flex flex-1 dark:bg-dark-primary ">
          <DndProvider backend={HTML5Backend} >
            <Outlet />
          </DndProvider>
        </div>
      </div>
    </div>
  );
};


