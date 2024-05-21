import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchInputProps {
  type: string;
  value: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  type,
  value,
  placeholder,
  changeHandler,
}: SearchInputProps) => {
  return (
    <div className={`flex gap-5 h-10 items-center`}>
      <div className="flex gap-2 bg-gray-1 px-2 rounded-md md:w-[40vw] border border-gray-150">
        <input
          type={type}
          value={value}
          onChange={changeHandler}
          className="bg-gray-1 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
          placeholder={placeholder}
        />
        <button className="">
          <FaMagnifyingGlass className="font-light" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
