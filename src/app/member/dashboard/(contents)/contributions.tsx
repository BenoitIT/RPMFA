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
import Button from "@/app/(components)/buttons/primaryBtn";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
interface memberContribution
  {
    id: number;
    created_at: string;
    contributionAmount: string;
    depositReceiptNumber: string;
    defaultcontribution:number;
}
interface memberContributions{
  contributions:memberContribution[]
}

const Contribution = ({ contributions}:memberContributions) => {
  const router = useRouter();
  const session:any=useSession();
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
  const handleViewSingleContribution=(id:number)=>{
    router.push(`/member/dashboard/contributions/${id}`);
  }
  return (
    <div className="mt-3 w-full bg-white pr-10 p-6">
      <div className="flex justify-between my-4 flex-col lg:flex-row">
        <h1 className="text-xl font-medium text-blue-1">Contributions</h1>
        {session?.data?.user?.role=="member" &&contributions.length>0&&contributions[0]?.defaultcontribution?(<h1 className="text-sm uppercase mt-1">ANNUAL CONTRIBUTION: <span className="font-bold">{new Intl.NumberFormat('en-US').format(contributions[0].defaultcontribution)} RWF</span></h1>):("")}
        <Button
          label="Add New Contribution"
          customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white  rounded font-medium h-fit -mt-1"
          Click={() => router.push("contributions/addnew")}
        />
      </div>
      <Table
        data={contributions}
        columns={memberContributionTableColumns}
        onSelectingRow={handleSelectedRows}
        selectAllRow={handleAllRowsSelection}
        isSelectAll={allSelected}
        selectedRow={selectedTableRow}
        handleView={handleViewSingleContribution}
      />
    </div>
  );
};
export default Contribution;
