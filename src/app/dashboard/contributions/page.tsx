"use client";
import { PiGreaterThanLight } from "react-icons/pi";
import Contributions from "../(components)/ContentsContainers/contributions";
import Link from "next/link";
import SearchInput from "@/app/(components)/inputs/SearchInput";
import {
  HandleContrDataSearch,
  HandleContrDataYearFilter,
} from "@/app/utilities/contributionSearch";
import { ChangeEvent, useEffect, useState } from "react";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import MonthOrYear from "../(components)/inputs/input";
import Loader from "../(components)/ContentsContainers/loader";
import { exportTableToExcel } from "@/app/utilities/exportContibutions";

const Page = () => {
  const [openInitContributionModal, setInitContribution] = useState(false);
  const [currentYearInfo, setCurrentYearInfo] = useState<any>(null);
  const currentYear = new Date().getFullYear();
  const [contributions, setContributions] = useState<any[]>([]);
  const [allContributions, setAllContributions] = useState<any[]>([]);
  const [year, setYear] = useState(currentYear);
  const [searchValue, setSearchValues] = useState("");
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`/api/contribution?year=${year}`, {
          cache: "no-store",
        });
        const data = await response.json();
        if (data?.status == 200) {
          setContributions(data?.pendingData);
          setAllContributions(data?.pendingData);
        }
      } catch (err) {
        return;
      }
    };
    fetchContributions();
  }, [year]);
  useEffect(() => {
    if (searchValue === "") {
      setContributions(allContributions);
    } else {
      dataSearchingTrigger();
    }
  }, [searchValue, allContributions]);

  const dataSearchingTrigger = () => {
    if (Array.isArray(allContributions)) {
      HandleContrDataSearch(searchValue, allContributions, setContributions);
    }
  };

  const years = Array.from(
    { length: 60 },
    (_, index) => new Date().getFullYear() - 30 + index
  );

  const handleYearChange = (event: any) => {
    setYear(event.target.value);
    if (Array.isArray(allContributions)) {
      HandleContrDataYearFilter(
        event.target.value,
        allContributions,
        setContributions
      );
    }
  };

  useEffect(() => {
    const checkCurrentYearContributionStatus = async () => {
      const response = await fetch(
        `/api/contribution/initializeContribution/${currentYear}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      if (data.status == 200) {
        return setCurrentYearInfo(data.currentYear);
      } else {
        return;
      }
    };
    checkCurrentYearContributionStatus();
  }, [currentYear]);

  const handleInitContribution = () => {
    setInitContribution(true);
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
        <p className="text-blue-700 hover:cursor-pointer">Contributions</p>
      </h3>
      <div className="py-4 flex flex-col lg:flex-row md:justify-between mb-2 w-full gap-2">
        <div className="flex flex-row gap-2 w-full">
          <SearchInput
            type="text"
            placeholder="Search contribution..."
            value={searchValue}
            changeHandler={(e: ChangeEvent<HTMLInputElement>) => {
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
                onChange={handleYearChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start lg:justify-end gap-2">
          <button
            className="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[150px] text-sm rounded-md font-normal disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleInitContribution}
            disabled={
              currentYear == currentYearInfo?.year &&
              currentYearInfo?.initialized
            }
          >
            Send Reminder
          </button>
          <button
            className="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[100px] text-sm rounded-md font-normal disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => exportTableToExcel(contributions)}
          >
            Export
          </button>
        </div>
      </div>
      {Array.isArray(contributions) ? (
        <Contributions
          contributions={contributions}
          openInitContributionModal={openInitContributionModal}
          setInitContribution={setInitContribution}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Page;
