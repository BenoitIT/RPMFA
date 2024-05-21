"use client";

import { useState } from "react";
import SearchInput from "../(components)/inputs/SearchInput";
import Footer from "../(components)/navigations/Footer";
import NavBar from "../(components)/navigations/NavBar";
import MemberDetatils from "../(components)/cards/MemberDetails";
import { VscSettings } from "react-icons/vsc";
import FilterButton from "../(components)/buttons/FilterButton";

const Members = () => {
  const [searchValue, setSearchValue] = useState("");
  const [expandedClinic, setExpandedClinic] = useState<number | null>(null);
  const arrayOfClinics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleExpand = (clinicId: number) => {
    setExpandedClinic(expandedClinic === clinicId ? null : clinicId);
  };
  return (
    <>
      <NavBar />
      <div className="max-w-screen-xl mx-auto p-4 mb-5">
        <div className="mb-5">
          <h1 className="text-blue-1 text-2xl font-semibold mb-3">Members</h1>
          <div className="flex gap-3 max-sm:flex-col">
            <SearchInput
              type="text"
              value={searchValue}
              placeholder="Search members..."
              changeHandler={handleSearch}
            />
            <FilterButton
              className="w-full"
              icon={<VscSettings />}
              btnText="Filter by"
            />
          </div>
        </div>
        {/* Card */}
        <div className="grid grid-cols-3 min-xl:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 grid-flow-row gap-x-6 gap-y-8">
          {arrayOfClinics.map((clinic) => (
            <MemberDetatils
              key={clinic}
              expanded={expandedClinic === clinic}
              handleExpand={() => handleExpand(clinic)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Members;
