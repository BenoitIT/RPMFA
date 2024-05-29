"use client";
interface buttonProps {
  label: string;
  customStyle: string;
  Click?: () => void;
  type?: "button" | "submit" | "reset";
}
const Button = ({ customStyle, label, Click, type }: buttonProps) => {
  return (
    <button
      type={type ? type : "button"}
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
