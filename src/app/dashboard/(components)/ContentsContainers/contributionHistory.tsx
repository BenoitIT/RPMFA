"use client";
import { useEffect, useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import Table from "@/app/(components)/tables/table";
import { ContributionTableColumns, memberContributionTableColumns } from "./columns";
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
const ContributionHistories = ({ contributions }: contributionTabs) => {
  const router = useRouter();
  const [selectedTableRow, setSelectedTableRow] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [activeData, setActiveData] = useState<any[]>([]);
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
  const handleViewSingleContribution = (id: number) => {
    router.push(`/dashboard/contributions/${id}`);
  };
  useEffect(() => {
    if (Array.isArray(contributions)) {
      setActiveData(contributions);
    }
  }, [contributions]);
  return (
    <div className="mt-2 w-full">
      <Table
        data={activeData}
        columns={memberContributionTableColumns}
        onSelectingRow={handleSelectedRows}
        selectAllRow={handleAllRowsSelection}
        isSelectAll={allSelected}
        handleView={handleViewSingleContribution}
        selectedRow={selectedTableRow}
      />
    </div>
  );
};
export default ContributionHistories;
