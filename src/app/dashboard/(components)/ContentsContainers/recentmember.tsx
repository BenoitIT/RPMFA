"use client";
import { useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import Table from "@/app/(components)/tables/table";
import { memberTableColumns, membersDummyData } from "./columns";

const RecentMembers = () => {
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
    <Table
      data={membersDummyData.slice(4)}
      columns={memberTableColumns}
      onSelectingRow={handleSelectedRows}
      selectAllRow={handleAllRowsSelection}
      isSelectAll={allSelected}
      handleView={() => {}}
      selectedRow={selectedTableRow}
    />
  );
};
export default RecentMembers;
