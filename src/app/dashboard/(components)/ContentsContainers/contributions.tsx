"use client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  handleAllDataRowsSelection,
  handleSelectedRow,
} from "@/app/(components)/utilities/tableSelector";
import Table from "@/app/(components)/tables/table";
import { ContributionTableColumns } from "./columns";
import TabsNavigation from "../tabs/TabManager";
import { useRouter } from "next/navigation";
import InitializeAnnualContribs from "./modals/InitContribution";
interface TabsInfo {
  name: string;
  counts: number;
  data: any[];
}
interface contributionTabs {
  contributions: TabsInfo[];
}
const Contributions = ({ contributions }: contributionTabs) => {
  const router = useRouter();
  const [selectedTableRow, setSelectedTableRow] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [openInitContributionModal, setInitContribution] = useState(false);
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

  return (
    <div className="mt-2 w-full">
      <Table
        data={contributions}
        columns={ContributionTableColumns}
        onSelectingRow={handleSelectedRows}
        selectAllRow={handleAllRowsSelection}
        isSelectAll={allSelected}
        handleView={handleViewSingleContribution}
        selectedRow={selectedTableRow}
      />
      <InitializeAnnualContribs
        open={openInitContributionModal}
        setOpen={setInitContribution}
      />
    </div>
  );
};
export default Contributions;
