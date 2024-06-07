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
    <div className="min-h-screen max-h-fit">
      <div className="max-w-screen-xl px-12">
        <NavBar />
        {Allmembers.length > 0 ? (
          <div className="w-full pb-5">
            <div className="mb-6">
              <h1 className="text-blue-1 text2xl font-semibold mb-3">
                Members
              </h1>

            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-3">
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
          <div className="h-[40vh] w-screen flex justify-center items-center text-sm flex-col gap-3 max-w-full">
            <TbDatabaseX className="text-4xl text-blue-300" />
            <p className="text-gray-700 font-light">
              Members are not found. They will be recorded.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Members;
