"use client";
interface buttonProps {
  label: string;
  customStyle: string;
  icon:any;
  Click: () => void;
}
const ButtonIconified = ({ customStyle, label, Click,icon }: buttonProps) => {
  return (
    <button
      className={`
       ${customStyle}
       focus:outline-none  font-normal rounded lg:rounded-lg text-xs md:text-sm px-3 h-fit text-center
      `}
      onClick={Click}
    >
      <div className="flex gap-2"><span className="mt-1">{icon}</span><span>{label}</span></div>
    </button>
  );
};
export default ButtonIconified;
