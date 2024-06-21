export const HandleContrDataSearch = (
    value: string,
    data: any[],
    setFilteredData: (val: any[]) => void
  ) => {
    const filteredData = data.filter(
      (contribution) =>
        contribution?.status?.toLowerCase().includes(value.toLowerCase()) ||
        contribution?.paymentYear?.toLowerCase().includes(value.toLowerCase()) ||
        contribution?.amountDue?.toLowerCase().includes(value) ||
        contribution?.amountPaid?.toLowerCase().includes(value) ||
        contribution?.category?.toLowerCase().includes(value) ||
        contribution?.facilityName?.toLowerCase().includes(value)
    );

    if (filteredData.length > 0) {
      return setFilteredData(filteredData);
    } else {
      return setFilteredData([]);
    }
  };
