import { withTheme } from "../../contexts/ThemeContext";
import { BsFillPeopleFill, BsGear, BsDoorClosed } from "react-icons/bs";
import { GrTask } from "react-icons/gr";
import type { IconType } from "react-icons";
import { SearchBar } from "../SearchBar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { usePreview } from "react-dnd-preview";
import { useAuth } from "../../contexts/AuthContext";

import { Auth } from "aws-amplify";
const NavItem = ({
  Icon,
  label,
  onClick,
  path,
}: {
  Icon: IconType;
  label?: string;
  onClick?: () => void;
  path: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <div
      className={`flex items-center gap-4 cursor-pointer ${
        isActive ? "bg-light-primary text-light-text rounded-md p-2" : ""
      } hover:bg-light-primary dark:hover:bg-dark-primary hover:rounded-md p-2 `}
      onClick={onClick}
    >
      <Icon /> {label}
    </div>
  );
};

export const DashboardLayout = () => {
  const { isDarkMode, setDarkToggle } = withTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    Auth.signOut();
    navigate("/");
  };

  const navItems = [
    {
      name: "Board",
      Icon: <GrTask />,
      path: "/dashboard",
    },
    {
      name: "Account",
      Icon: <BsFillPeopleFill />,
      path: "/dashboard/account",
    },
    {
      name: "Settings",
      Icon: <BsGear />,
      path: "/dashboard/settings",
    },
  ];
  const MyPreview = () => {
    const preview = usePreview();
    if (!preview.display) {
      return null;
    }
    const { itemType, style } = preview;
    return (
      <div className="item-list__item" style={style}>
        {/*@ts-ignore  */}
        {itemType}
      </div>
    );
  };

  return (
    <div className={`h-full flex ${isDarkMode ? "dark" : ""} `}>
      <div className="bg-light-secondary dark:bg-dark-secondary md:w-48 hidden p-4 justify-between md:flex flex-col items-start pt-10 pb-10 dark:text-dark-text text-light-text">
        <div className="flex flex-col gap-4 ">
          {navItems.map((item) => {
            return (
              <NavItem
                path={item.path}
                Icon={() => item.Icon}
                key={item.path}
                label={item.name}
                onClick={() => {
                  navigate(item.path, {
                    replace: true,
                  });
                }}
              />
            );
          })}
        </div>
        <div>
          <NavItem
            path="/logout"
            Icon={BsDoorClosed}
            label="logout"
            onClick={logOut}
          />
        </div>
      </div>

      <div className={` h-full w-full flex flex-col dark:text-dark-text`}>
        <div className="w-full p-4 flex bg-light-primary dark:bg-dark-primary justify-between ">
          {/* Search and toggle */}
          <div className=" flex items-center gap-4 justify-start  ">
            <SearchBar />
            <div
              className={`flex items-center ${isDarkMode ? "dark" : "light"}`}
            >
              <button
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                onClick={() => {
                  setDarkToggle(!isDarkMode);
                }}
              >
                {isDarkMode ? <BsBrightnessHighFill /> : <BsMoonFill />}
              </button>
            </div>
          </div>
          {/* Username */}
          <div>{user.attributes?.email}</div>
        </div>
        <div></div>
        <div className="p-4 bg-light-primary flex flex-1 dark:bg-dark-primary ">
          <DndProvider
            backend={TouchBackend}
            options={{
              enableMouseEvents: true,
              enableHoverOutsideTarget: true,
            }}
          >
            <MyPreview />
            <Outlet />
          </DndProvider>
        </div>
      </div>
    </div>
  );
};
