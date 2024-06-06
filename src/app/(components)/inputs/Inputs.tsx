"use client";
interface PrimaryInputProps {
  label: string;
  type: string;
  name?: string;
  value?: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?:boolean;
}
export const PrimaryInput = ({
  label,
  type,
  name,
  changeHandler,
  placeholder,
  value,
  required
}: PrimaryInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex mb-2 text-sm font-medium text-gray-900 gap-4"
      >
        <span>{label}</span><span className={required!=null?"hidden":"text-red-400 text-xs mt-[2.5px]"}>Required</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={name}
        onChange={changeHandler}
        className="bg-gray-1 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
        placeholder={placeholder}
      />
      <p
        className={
          value && value.length < 1 ? "text-sm text-red-400" : "hidden"
        }
      >
        {label} is required
      </p>
    </div>
  );
};
