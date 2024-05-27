export interface ExpandCollapseProps {
  expanded: boolean;
  handleExpand?: () => void;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
  className?: string;
  fistName:string;
  lastName:string;
  facilitityName:string;
  email:string;
  phoneNumber:string;
  category:string;
}

export interface SidebarMenuLinkProps {
  path: string;
  name: string;
  icon: JSX.Element;
  onclick?: () => void;
  className?: string;
}

export interface DashboardCardProps {
  title: string;
  value: number;
}
