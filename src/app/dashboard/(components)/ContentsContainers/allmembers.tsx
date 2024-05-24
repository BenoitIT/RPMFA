"use client";
import { ChangeEvent, useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import Table from "@/app/(components)/tables/table";
import { memberTableColumns, membersDummyData } from "./columns";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import SearchInput from "@/app/(components)/inputs/SearchInput";

const Allmembers = () => {
  const [selectedTableRow, setSelectedTableRow] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
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
          placeholder="Search members..."
          value={""}
          changeHandler={async (e: ChangeEvent<HTMLInputElement>) => {}}
        />
        <FilterButton
          className="w-full"
          icon={<MdOutlineSettingsInputComposite />}
          btnText="Filter"
        />
      </div>
      <Table
        data={membersDummyData}
        columns={memberTableColumns}
        onSelectingRow={handleSelectedRows}
        selectAllRow={handleAllRowsSelection}
        isSelectAll={allSelected}
        handleView={() => {}}
        selectedRow={selectedTableRow}
      />
    </div>
  );
};
export default Allmembers;
