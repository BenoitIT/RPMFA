export const HandleContrDataSearch = (
  value: string,
  data: any[],
  setFilteredData: (val: any[]) => void
) => {
  const filteredData = data.filter(
    (contribution) =>
      contribution?.status?.toLowerCase().includes(value.toLowerCase()) ||
      contribution?.paymentYear == value ||
      contribution?.amountDue?.toLowerCase().includes(value) ||
      contribution?.amountPaid?.toLowerCase().includes(value) ||
      contribution?.category?.toLowerCase().includes(value) ||
      contribution?.facilityName?.toLowerCase().includes(value)
  );

  if (filteredData.length > 0) {
    setFilteredData(filteredData);
  } else {
    setFilteredData([]);
  }
};
export const HandleContrDataYearFilter = (
  value: number,
  data: any[],
  setFilteredData: (val: any[]) => void
) => {
  const filteredData = data.filter(
    (contribution) => contribution?.paymentYear == value
  );
  if (filteredData.length > 0) {
    setFilteredData(filteredData);
  } else {
    setFilteredData([]);
  }
};
