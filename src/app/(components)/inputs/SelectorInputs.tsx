"use client";
interface PrimaryInputProps {
  label: string;
  options: any[];
  value?: string;
  name: string;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
}
export const PrimarySelectorInput = ({
  label,
  name,
  options,
  changeHandler,
  required,
}: PrimaryInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex gap-4 mb-2 text-sm font-medium text-gray-900"
      >
        <span>{label}</span>
        <span
          className={
            required != null ? "hidden" : "text-red-400 text-xs mt-[2.5px]"
          }
        >
          Required
        </span>
      </label>

      <select
        name={name}
        className="bg-gray-1 outline-none text-gray-900 text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
        onChange={changeHandler}
      >
        {options.map((option: any, index: number) => (
          <option key={index} value={option?.name ? option?.name : option}>
            {option?.name ? option?.name : option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SecondarySelectorInput = ({
  label,
  name,
  options,
  changeHandler,
}: PrimaryInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>

      <select
        name={name}
        className="bg-gray-1 outline-none text-gray-900 text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
        onChange={changeHandler}
      >
        {options.map((option: any, index: number) => (
          <option key={index} value={option?.id}>
            {option?.name ? option?.name : option}
          </option>
        ))}
      </select>
    </div>
  );
};
