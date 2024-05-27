"use client";

import { useState } from "react";
import SearchInput from "@/app/(components)/inputs/SearchInput";
import Footer from "@/app/(components)/navigations/Footer";
import NavBar from "@/app/(components)/navigations/NavBar";
import MemberDetatils from "@/app/(components)/cards/MemberDetails";
import { VscSettings } from "react-icons/vsc";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import { pageProps } from "@/app/dashboard/(components)/ContentsContainers/allmembers";
import { TbDatabaseX } from "react-icons/tb";

const Members = ({ Allmembers }: pageProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [expandedClinic, setExpandedClinic] = useState<number | null>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleExpand = (clinicId: number) => {
    setExpandedClinic(expandedClinic === clinicId ? null : clinicId);
  };
  return (
    <>
      <NavBar />
      {Allmembers.length > 0 ? (
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
            {Allmembers.map((member) => (
              <MemberDetatils
                key={member.id}
                expanded={expandedClinic === member}
                handleExpand={() => handleExpand(member)}
                fistName={member.firstName}
                lastName={member.lastName}
                facilitityName={member.facilitityName}
                email={member.email}
                phoneNumber={member.phone}
                category={member.category}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[40vh] w-screen flex justify-center items-center text-base flex-col gap-3">
          <TbDatabaseX className="text-4xl text-gray-800" />
          <p className="text-gray-700">
            Members are not found. They will be recorded.
          </p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Members;
