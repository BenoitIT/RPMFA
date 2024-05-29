"use client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import { useRouter } from "next/navigation";
import Table from "@/app/(components)/tables/table";
import { memberTableColumns } from "./columns";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import SearchInput from "@/app/(components)/inputs/SearchInput";
import { HandleDataSearch } from "@/app/utilities/applicationManipulators";
export interface pageProps {
  Allmembers: any[];
}
const AllMembers = ({ Allmembers }: pageProps) => {
  const router = useRouter();
  const [selectedTableRow, setSelectedTableRow] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
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
  const handleViewApplication = (id: number) => {
    router.push(`/dashboard/members/${id}`);
  };
  useEffect(() => {
    if (searchValue == "") {
      setActiveData(Allmembers);
    }
  }, [searchValue,Allmembers]);
  const dataSearchingTrigger = () => {
    alert(searchValue)
    HandleDataSearch(searchValue, Allmembers, setActiveData);
  };
  return (
    <div className="mt-2 w-full">
      <div className="py-4 flex flex-row gap-2 mb-2">
        <SearchInput
          type="text"
          placeholder="Search a member..."
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
      <Table
        data={activeData}
        columns={memberTableColumns}
        onSelectingRow={handleSelectedRows}
        selectAllRow={handleAllRowsSelection}
        isSelectAll={allSelected}
        handleView={handleViewApplication}
        selectedRow={selectedTableRow}
      />
    </div>
  );
};
export default AllMembers;
