import React from 'react'

interface SecondBtnProps {
  label?: string;
  customStyle?: string;
  onClick: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit";
}

const SecondBtn = ({label, customStyle, onClick, icon, type}:SecondBtnProps) => {
  return (
    <button
      data-collapse-toggle="navbar-cta"
      type={type}
      className={customStyle}
      aria-controls="navbar-cta"
      aria-expanded="false"
      onClick={onClick}
    >
      {icon} {" "} {label}
    </button>
  );
}

export default SecondBtn