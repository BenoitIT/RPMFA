import { RxDashboard } from "react-icons/rx";
import { DashboardLinks, profileAndSupportLinks } from "./links";
import Link from "next/link";
import Image from "next/image";
import { SidebarMenuLinkProps } from "../../../../types";

const Sidebar = () => {
  return (
    <div className="h-screen border-r-2 w-64 p-4 fixed left-0 top-0 max-sm:hidden">
      <div>
        <LogoSidebar />
        <div className="flex gap-3 flex-col mt-3">
          <div className="flex gap-3 items-center bg-blue-1 py-2 px-3 rounded-3xl text-white">
            <RxDashboard />
            <span className="text-xl font-semibold">Dashboard</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center border-y mt-14 py-4">
        {DashboardLinks.map((link, index) => (
          <SidebarMenuLink
            key={index}
            path={link.path}
            name={link.name}
            icon={link.icon}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 justify-center mt-14">
        {profileAndSupportLinks.map((link, index) => (
          <Link href={link.path} key={index}>
            <div className="flex">
              <div className="flex gap-2 p-3 items-center">
                <span className="text-2xl">{link.icon}</span>
                <p>{link.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

const SidebarMenuLink = ({ path, name, icon }: SidebarMenuLinkProps) => {
  return (
    <Link href={path}>
      <div className="flex">
        <div className="flex gap-2 p-3 items-center">
          <span className="text-2xl">{icon}</span>
          <p>{name}</p>
        </div>
      </div>
    </Link>
  );
};

const LogoSidebar = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex gap-1 items-center">
        <Image
          src={"/logo/logooo.png"}
          className="h-14"
          alt="rpmfa Logo"
          width={59}
          height={50}
          quality={100}
        />
        <span className="text-2xl font-bold text-blue-1">RPMFA</span>
      </Link>
    </div>
  );
};
