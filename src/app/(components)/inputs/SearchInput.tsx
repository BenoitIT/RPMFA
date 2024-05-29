"use client";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchInputProps {
  type: string;
  value: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchData?: () => void;
}

const SearchInput = ({
  type,
  value,
  placeholder,
  changeHandler,
  searchData,
}: SearchInputProps) => {
  return (
    <div className={`flex gap-5 h-10 items-center`}>
      <div className="flex gap-2 bg-white px-2 rounded-md md:w-[40vw] border border-gray-400">
        <input
          type={type}
          value={value}
          onChange={changeHandler}
          className="bg-white outline-none text-gray-900 text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
          placeholder={placeholder}
        />
        <button
          className="block"
          onClick={() => {
            if (searchData) {
              searchData();
            }
          }}
        >
          <FaMagnifyingGlass className="font-light text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
