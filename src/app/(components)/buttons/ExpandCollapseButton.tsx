import { ExpandCollapseProps } from "../../../../types";

const ExpandCollapseButton = ({
  expanded,
  handleExpand,
  expandIcon,
  collapseIcon,
  className,
}: ExpandCollapseProps) => {
  return (
    <button
      onClick={handleExpand}
      className={`${className} flex gap-1 p-1`}
    >
      {expanded ? expandIcon : collapseIcon}
    </button>
  );
};

export default ExpandCollapseButton;
