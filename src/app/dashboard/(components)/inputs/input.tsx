import React from "react";
interface MonthDatePickerProps {
  value: string | number;
  label: string;
  onChange?: (value: any) => void;
  options: string[] | number[];
}
const MonthOrYear = ({
  value,
  onChange,
  options,
  label,
}: MonthDatePickerProps) => {
  return (
    <div className="flex  gap-2 w-full">
      <label className="text-black font-normal capitalize text-sm">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="bg-light text-gray border-none  px-2 rounded-md outline-none active:outline-none text-sm"
      >
        <option value="">Select {label}</option>
        <option value={value}>{value}</option>
        {options.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};
export default MonthOrYear;
