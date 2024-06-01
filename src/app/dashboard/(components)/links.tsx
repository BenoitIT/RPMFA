import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiHouseLine, PiChartLineUpBold } from "react-icons/pi";
import { FaRegEnvelope } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { CiSettings } from "react-icons/ci";
import { PiFolderSimpleUserFill } from "react-icons/pi";
import { PiCertificate } from "react-icons/pi";
import { MdOutlineContactSupport } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

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
    icon: <PiFolderSimpleUserFill />,
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
export const adminHomeMenu = {
  name: "Dashboard",
  path: "/dashboard",
  icon: <RxDashboard />,
};
export const memberHomeMenu = {
  name: "Dashboard",
  path: "/member/dashboard",
  icon: <RxDashboard />,
};
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
export const memberProfileAndSupportLinks = [
  {
    name: "Settings",
    path: "/member/dashboard/profile",
    icon: <CiSettings />,
  },
  {
    name: "Support",
    path: "#support",
    icon: <MdOutlineContactSupport />,
  },
];
export const membersDashboardLinks = [
  {
    name: "Applications",
    path: "/member/dashboard/applications",
    icon: <PiFolderSimpleUserFill />,
  },
  {
    name: "Certificates",
    path: "/member/dashboard/certificates",
    icon: <PiCertificate />,
  },
  {
    name: "Contibutions",
    path: "/member/dashboard/contributions",
    icon: <PiHouseLine />,
  },
  {
    name: "Announcements",
    path: "/member/dashboard/announcements",
    icon: <TfiAnnouncement />,
  },
];
