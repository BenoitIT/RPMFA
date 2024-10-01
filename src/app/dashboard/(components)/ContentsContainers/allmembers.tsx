"use client";
import { useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import { useRouter } from "next/navigation";
import Table from "@/app/(components)/tables/table";
import { memberTableColumns } from "./columns";
export interface pageProps {
  Allmembers: any[];
  filterHide?:boolean;
}
const AllMembers = ({ Allmembers}: pageProps) => {
  const router = useRouter();
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
  const handleViewApplication = (id: number) => {
    router.push(`/dashboard/members/${id}`);
  };


  return (
    <div className="mt-2 w-full">
      <Table
        data={Allmembers}
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
