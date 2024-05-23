export const handleSelectedRow = (
  id: number,
  selectedTableRow: any[],
  setSelectedTableRow: (data: any) => void
) => {
  if (selectedTableRow.includes(id)) {
    setSelectedTableRow((oldValues: any) => {
      return oldValues.filter((row: any) => row !== id);
    });
  } else {
    setSelectedTableRow([...selectedTableRow, id]);
  }
};

export const handleAllDataRowsSelection = (
  data: any,
  setSelectedTableRow: (data: any) => void,
  selectedTableRow: any[],
  setAllSelected: (data: boolean) => void
) => {
  const unSelectedBulk = data.map((row: any) => row.id);
  const EmptyValues: any | null = [];
  if (selectedTableRow.length === unSelectedBulk.length) {
    setSelectedTableRow([...EmptyValues]);
    setAllSelected(false);
  } else {
    setSelectedTableRow([...unSelectedBulk]);
    setAllSelected(true);
  }
};
