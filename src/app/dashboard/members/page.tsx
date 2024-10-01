"use client";
import { PiGreaterThanLight } from "react-icons/pi";
import AllMembers from "../(components)/ContentsContainers/allmembers";
import Link from "next/link";
import SearchInput from "@/app/(components)/inputs/SearchInput";
import { ChangeEvent, useEffect, useState } from "react";
import { HandleDataSearch } from "@/app/utilities/applicationManipulators";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import Loader from "../(components)/ContentsContainers/loader";
import MonthOrYear from "../(components)/inputs/input";

const Page = () => {
  const currentYear = new Date().getFullYear();
  const [searchValue, setSearchValues] = useState("");
  const [Allmembers, setActiveData] = useState<any[]>();
  const [filteredData, setFilteredData] = useState<any[]>();
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    const handleFetchData = async () => {
      const response = await fetch(`/api/members?year=${year}`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (response.status === 200) {
        const members = data.members?.map((member: any) => ({
          id: member?.id,
          facilityName: member?.facilityName?.toLowerCase(),
          category: member.facilityCategory,
          email: member.user?.email,
          phone: member.user?.phone,
          status: member?.status,
        }));
        setActiveData(members);
        setFilteredData(members);
      }
    };
    handleFetchData();
  }, [year]);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredData(Allmembers);
    } else {
      dataSearchingTrigger();
    }
  }, [searchValue]);

  const dataSearchingTrigger = () => {
    if (Array.isArray(Allmembers)) {
      HandleDataSearch(searchValue, Allmembers, setFilteredData);
    }
  };
  const years = Array.from(
    { length: 60 },
    (_, index) => new Date().getFullYear() - 30 + index
  );
  const handYearChange = (event: any) => {
    setYear(event.target.value);
  };

  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1">
        <Link
          href="/dashboard"
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Home
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <p className="text-blue-700 hover:cursor-pointer">Members</p>
      </h3>
      {Array.isArray(Allmembers) ? (
        <>
          <div className="py-4 flex lg:flex-row gap-2 mb-2 flex-col justify-between">
            <SearchInput
              type="text"
              placeholder="Search a member..."
              value={searchValue}
              changeHandler={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setSearchValues(e.target.value);
              }}
              searchData={dataSearchingTrigger}
            />
            <div className="flex gap-2">
              <FilterButton
                className={`block text-sm`}
                icon={<MdOutlineSettingsInputComposite />}
                btnText="Filter"
              />
              <div className={"w-fit mt-2"}>
                <MonthOrYear
                  label="Year"
                  value={year}
                  options={years}
                  onChange={handYearChange}
                />
              </div>
            </div>
          </div>
          {Array.isArray(filteredData) && (
            <AllMembers Allmembers={filteredData} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Page;
