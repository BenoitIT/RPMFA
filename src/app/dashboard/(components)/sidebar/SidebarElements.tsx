"use client";
import { RxDashboard } from "react-icons/rx";
import { DashboardLinks, profileAndSupportLinks } from "../links";
import Link from "next/link";
import Image from "next/image";
import { SidebarMenuLinkProps } from "../../../../../types";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface SidebarElementsProps {
  className?: string;
  onclick?: () => void;
}

const SidebarElements = ({ className, onclick }: SidebarElementsProps) => {
  const currentPath = usePathname();

  return (
    <div className={`${className} w-full p-4`}>
      <div>
        <LogoSidebar />
        <SidebarMenuLink
          path={"/dashboard"}
          name={"Dashboard"}
          icon={<RxDashboard />}
          onclick={onclick}
          className={classNames(
            "flex gap-3 p-3 items-center mt-4",
            currentPath === "/dashboard"
              ? "bg-blue-1 text-white rounded-lg"
              : ""
          )}
        />
      </div>
      <div className="flex flex-col gap-2 justify-center border-y mt-10 py-4">
        {DashboardLinks.map((link, index) => (
          <SidebarMenuLink
            key={index}
            path={link.path}
            name={link.name}
            icon={link.icon}
            onclick={onclick}
            className={classNames(
              "flex gap-3 p-3 items-center",
              currentPath === link.path ? "bg-blue-1 text-white rounded-lg" : ""
            )}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 justify-center mt-14">
        {profileAndSupportLinks.map((link, index) => (
          <Link href={link.path} key={index} onClick={onclick}>
            <div
              className={classNames(
                "flex gap-2 p-3 items-center",
                currentPath === link.path
                  ? "bg-blue-1 text-white rounded-lg"
                  : ""
              )}
            >
              <span className="text-xl">{link.icon}</span>
              <p>{link.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarElements;

const SidebarMenuLink = ({
  path,
  name,
  icon,
  onclick,
  className,
}: SidebarMenuLinkProps) => {
  return (
    <Link href={path} onClick={onclick}>
      <div className={`${className} flex gap-3 p-3 items-center`}>
        <span className="text-xl">{icon}</span>
        <p>{name}</p>
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
          width={60}
          height={50}
        />
        <span className="text-xl font-bold text-blue-1">RPMFA</span>
      </Link>
    </div>
  );
};
