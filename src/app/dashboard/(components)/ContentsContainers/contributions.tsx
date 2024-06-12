"use client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import Table from "@/app/(components)/tables/table";
import { ContributionTableColumns } from "./columns";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import SearchInput from "@/app/(components)/inputs/SearchInput";
import TabsNavigation from "../tabs/TabManager";
import { useRouter } from "next/navigation";
import InitializeAnnualContribs from "./modals/InitContribution";
interface TabsInfo {
  name: string;
  counts: number;
  data: any[];
}
interface contributionTabs {
  contributions: TabsInfo[];
}
const Contributions = ({ contributions }: contributionTabs) => {
  const router = useRouter();
  const [selectedTableRow, setSelectedTableRow] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [activeTab, setActiveTab] = useState("Pending contributions");
  const [activeData, setActiveData] = useState<any[]>([]);
  const [searchValue, setSearchValues] = useState("");
  const [openInitContributionModal, setInitContribution] = useState(false);
  const [currentYearInfo, setCurrentYearInfo] = useState<any>(null);
  const currentYear = new Date().getFullYear();
  const handleSelectedRows = (id: number) => {
    handleSelectedRow(id, selectedTableRow, setSelectedTableRow);
  };
  const handleAllRowsSelection = (data: any) => {
    handleAllDataRowsSelection(
      data,
      setSelectedTableRow,
      selectedTableRow,
      setAllSelected
    );
  };
  const handleViewSingleContribution = (id: number) => {
    router.push(`/dashboard/contributions/${id}`);
  };
  const handleInitContribution = () => {
    setInitContribution(true);
  };
  useEffect(() => {
    if (searchValue == "" && Array.isArray(contributions)) {
      setActiveData(contributions[0].data);
    }
  }, [searchValue, contributions]);
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

  return (
    <div className="mt-2 w-full">
      <div className="py-4 flex flex-col lg:flex-row md:justify-between mb-2 w-full gap-2">
        <div className="flex flex-row gap-2 w-full">
          <SearchInput
            type="text"
            placeholder="Search contribution..."
            value={""}
            changeHandler={async (e: ChangeEvent<HTMLInputElement>) => {}}
          />
          <FilterButton
            className="w-full "
            icon={<MdOutlineSettingsInputComposite />}
            btnText="Filter"
          />
        </div>
        <div className="w-full flex justify-start lg:justify-end">
          <button
            className="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[200px] rounded-md font-nomal disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleInitContribution}
            disabled={
              (currentYear == currentYearInfo?.year &&
                currentYearInfo?.initialized) ||
              activeData.length < 1
            }
          >
            Init contributions
          </button>
        </div>
      </div>
      <TabsNavigation
        activeTab={activeTab}
        tabs={contributions}
        setActiveData={setActiveData}
        setActiveTab={setActiveTab}
      />
      <Table
        data={activeData}
        columns={ContributionTableColumns}
        onSelectingRow={handleSelectedRows}
        selectAllRow={handleAllRowsSelection}
        isSelectAll={allSelected}
        handleView={handleViewSingleContribution}
        selectedRow={selectedTableRow}
      />
      <InitializeAnnualContribs
        open={openInitContributionModal}
        setOpen={setInitContribution}
      />
    </div>
  );
};
export default Contributions;
