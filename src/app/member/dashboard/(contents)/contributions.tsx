"use client";
import { useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import Table from "@/app/(components)/tables/table";
import {
  memberContributionDummyData,
  memberContributionTableColumns,
} from "@/app/dashboard/(components)/ContentsContainers/columns";
import Button from "@/app/(components)/buttons/primaryBtn";
import { useRouter } from "next/navigation";

const Contribution = () => {
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
  return (
    <div className="mt-3 w-full bg-white pr-10 p-6">
      <div className="flex justify-between my-4">
        <h1 className="text-xl font-medium text-blue-1">Contributions</h1>
        <Button
          label="Add New Contribution"
          customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white  rounded font-medium h-fit -mt-1"
          Click={() => router.push("contributions/addnew")}
        />
      </div>
      <Table
        data={memberContributionDummyData}
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
