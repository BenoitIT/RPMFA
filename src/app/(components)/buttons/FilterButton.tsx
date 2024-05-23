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
        className="flex items-center gap-x-2 border border-gray-400 py-2 px-2 rounded-lg text-gray-500"
        onClick={onClick}
      >
        <span>{icon || <VscSettings />}</span>
        {btnText || "Filter by"}
      </button>
    </div>
  );
};

export default FilterButton;
