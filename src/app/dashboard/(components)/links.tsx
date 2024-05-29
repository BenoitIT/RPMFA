import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiHouseLine, PiChartLineUpBold } from "react-icons/pi";
import { FaRegEnvelope } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { CiSettings } from "react-icons/ci";
import { MdOutlineContactSupport } from "react-icons/md";

export const DashboardLinks = [
  {
    name: "Members",
    path: "/dashboard/members",
    icon: <HiOutlineUserGroup />,
  },
  {
    name: "Contributions",
    path: "/dashboard/contributions",
    icon: <PiHouseLine />,
  },
  {
    name: "Applications",
    path: "/dashboard/applications",
    icon: <FaRegEnvelope />,
  },
  {
    name: "Announcements",
    path: "/dashboard/announcements",
    icon: <TfiAnnouncement />,
  },
  {
    name: "Performance",
    path: "/dashboard/performance",
    icon: <PiChartLineUpBold />,
  },
];

export const profileAndSupportLinks = [
  {
    name: "Settings",
    path: "/dashboard/profile",
    icon: <CiSettings />,
  },
  {
    name: "Support",
    path: "#support",
    icon: <MdOutlineContactSupport />,
  },
];
