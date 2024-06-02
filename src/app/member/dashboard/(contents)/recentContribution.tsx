"use client";
import { useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import Table from "@/app/(components)/tables/table";
import {
  memberContributionTableColumns,
} from "@/app/dashboard/(components)/ContentsContainers/columns";
interface memberContribution
  {
    id: number;
    created_at: string;
    contributionAmount: string;
    depositReceiptNumber: string;
}
interface memberContributions{
  contributions:memberContribution[]
}

const Contribution = ({ contributions}:memberContributions) => {
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
    <div className="mt-6 w-full">
      <Table
        data={contributions}
        columns={memberContributionTableColumns}
        onSelectingRow={handleSelectedRows}
        selectAllRow={handleAllRowsSelection}
        isSelectAll={allSelected}
        selectedRow={selectedTableRow}
      />
    </div>
  );
};
export default Contribution;
