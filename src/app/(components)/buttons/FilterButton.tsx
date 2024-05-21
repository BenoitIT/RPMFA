import React from "react";
import { VscSettings } from "react-icons/vsc";

interface FilterButtonProps {
  icon?: React.ReactNode;
  btnText?: string;
  className?: string;
  onClick?: () => void;
}

const FilterButton = ({
  icon,
  btnText,
  onClick,
  className,
}: FilterButtonProps) => {
  return (
    <div className={className}>
      <button
        className="flex items-center gap-x-2 border border-gray-150 py-2 px-2 rounded-lg"
        onClick={onClick}
      >
        <span>{icon || <VscSettings />}</span>
        {btnText || "Filter buy"}
      </button>
    </div>
  );
};

export default FilterButton;
