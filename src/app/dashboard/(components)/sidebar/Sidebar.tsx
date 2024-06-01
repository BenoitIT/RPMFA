import SidebarElements from "./SidebarElements";
export interface SidebarMenu {
  name: string;
  path: string;
  icon: any;
}
export interface sideBarMenus {
  DashboardLinks: SidebarMenu[];
  SidebarFooterMenu: SidebarMenu[];
  HomeMenu:SidebarMenu
}
const Sidebar = ({ DashboardLinks,HomeMenu,SidebarFooterMenu }: sideBarMenus) => {
  return (
    <SidebarElements
      className="border-r border-gray-200 h-screen"
      DashboardLinks={DashboardLinks}
      HomeMenu={HomeMenu}
      SidebarFooterMenu={SidebarFooterMenu}
    />
  );
};

export default Sidebar;
