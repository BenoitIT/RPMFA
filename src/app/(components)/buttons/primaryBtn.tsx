"use client";
interface buttonProps {
  label: string;
  customStyle: string;
  Click: () => void;
}
const Button = ({ customStyle, label, Click }: buttonProps) => {
  return (
    <button
      className={`
       ${customStyle} 
       focus:outline-none  font-normal rounded lg:rounded-lg text-xs md:text-sm px-3 h-fit text-center
      `}
      onClick={Click}
    >
      {label}
    </button>
  );
};
export default Button;
