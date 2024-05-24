"use client";
import { ChangeEvent, useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import Table from "@/app/(components)/tables/table";

import { ApplicationTableColumns } from "./columns";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import SearchInput from "@/app/(components)/inputs/SearchInput";
import TabsNavigation from "../tabs/TabManager";
import { application } from "@/app/interfaces/applications";
import ApplicationApproveModal from "./modals/appApprove";
interface pageProps{
  applications:application[];
  tabs:{name:string,counts:number,data:any[]}[]
}
const Applications = ({applications,tabs}:pageProps) => {
  const [selectedTableRow, setSelectedTableRow] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [activeTab, setActiveTab] = useState("New Applicants");
  const [activeData,setActiveData]=useState(applications);
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
  return (
    <div className="mt-2 w-full">
      <div className="py-4 flex flex-row gap-2 mb-2">
        <SearchInput
          type="text"
          placeholder="Search application..."
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
        tabs={tabs}
        setActiveData={setActiveData}
        setActiveTab={setActiveTab}
      />
      <Table
        data={activeData}
        columns={ApplicationTableColumns}
        onSelectingRow={handleSelectedRows}
        selectAllRow={handleAllRowsSelection}
        isSelectAll={allSelected}
        handleView={() => {}}
        selectedRow={selectedTableRow}
      />
      {/* <ApplicationApproveModal/> */}
    </div>
  );
};
export default Applications;
