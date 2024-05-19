export interface ExpandCollapseProps {
  expanded: boolean;
  handleExpand?: () => void;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
  className?: string;
} 