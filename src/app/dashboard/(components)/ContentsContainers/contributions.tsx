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
interface TabsInfo {
  name: string;
  counts: number;
  data: any[];
}
interface contributionTabs {
  contributions: TabsInfo[];
}
const Contributions = ({ contributions }: contributionTabs) => {
  const router=useRouter();
  const [selectedTableRow, setSelectedTableRow] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [activeTab, setActiveTab] = useState("Pending contributions");
  const [activeData, setActiveData] = useState<any[]>([]);
  const [searchValue, setSearchValues] = useState("");
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
  const handleViewSingleContribution=(id:number)=>{
    router.push(`/dashboard/contributions/${id}`);
  }
  useEffect(() => {
    if (searchValue == "" && Array.isArray(contributions)) {
      setActiveData(contributions[0].data);
    }
  }, [searchValue, contributions]);
  return (
    <div className="mt-2 w-full">
      <div className="py-4 flex flex-row gap-2 mb-2">
        <SearchInput
          type="text"
          placeholder="Search contribution..."
          value={""}
          changeHandler={async (e: ChangeEvent<HTMLInputElement>) => {}}
        />
        <FilterButton
          className="w-full"
          icon={<MdOutlineSettingsInputComposite />}
          btnText="Filter"
        />
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
    </div>
  );
};
export default Contributions;
