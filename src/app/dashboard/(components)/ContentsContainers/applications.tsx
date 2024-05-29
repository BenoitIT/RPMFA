"use client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import { useRouter } from "next/navigation";
import Table from "@/app/(components)/tables/table";
import { ApplicationTableColumns } from "./columns";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import SearchInput from "@/app/(components)/inputs/SearchInput";
import TabsNavigation from "../tabs/TabManager";
import { application } from "@/app/interfaces/applications";
import { HandleDataSearch } from "@/app/utilities/applicationManipulators";
interface pageProps {
  applications: application[];
  tabs: { name: string; counts: number; data: any[] }[];
}
const Applications = ({ applications, tabs }: pageProps) => {
  const router = useRouter();
  const [selectedTableRow, setSelectedTableRow] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [activeTab, setActiveTab] = useState("New Applicants");
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
  useEffect(() => {
    if (searchValue == "") {
      setActiveData(applications);
    }
  }, [searchValue,applications]);
  const handleViewApplication = (id: number) => {
    router.push(`/dashboard/applications/${id}`);
  };
  const dataSearchingTrigger = () => {
    HandleDataSearch(searchValue, applications, setActiveData);
  };
  return (
    <div className="mt-2 w-full">
      <div className="py-4 flex flex-row gap-2 mb-2">
        <SearchInput
          type="text"
          placeholder="Search application..."
          value={searchValue}
          changeHandler={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValues(e.target.value)
          }
          searchData={dataSearchingTrigger}
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
        handleView={handleViewApplication}
        selectedRow={selectedTableRow}
      />
    </div>
  );
};
export default Applications;
