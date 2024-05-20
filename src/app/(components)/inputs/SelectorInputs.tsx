"use client";
interface PrimaryInputProps {
  label: string;
  options: string[];
  value?:string,
  name: string;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
export const PrimarySelectorInput = ({
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
        className="bg-green-50 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
        onChange={changeHandler}
      >
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
