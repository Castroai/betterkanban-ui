import { ReactNode } from "react";
import { withAuth } from "../../contexts/AuthContext";
import {
  GrProjects,
  GrNotification,
  GrSettingsOption,
  GrLogout,
} from "react-icons/gr";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import type { IconType } from "react-icons";
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
      className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 hover:rounded-md p-1 "
      onClick={onClick}
    >
      <Icon /> {label}
    </div>
  );
};

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { handleLogout } = withAuth();
  return (
    <div className="bg-gray-300 h-full flex">
      <div className="bg-white w-48 p-4 justify-between flex flex-col items-start pt-10 pb-10">
        <div className="flex flex-col gap-3 ">
          <NavItem Icon={GrProjects} label="Projects" />
          <NavItem Icon={BsFillPeopleFill} label="Clients" />
          <NavItem Icon={GrNotification} label="Notifications" />
          <NavItem Icon={TbBrandGoogleAnalytics} label="Analytics" />
          <NavItem Icon={GrSettingsOption} label="Settings" />
        </div>
        <div>
          <NavItem Icon={GrLogout} label="logout" onClick={handleLogout} />
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};
