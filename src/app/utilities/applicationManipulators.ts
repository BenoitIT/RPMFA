export const HandleDataSearch = (
  value: string,
  data: any[],
  setFilteredData: (val: any[]) => void
) => {
  const filteredData = data.filter(
    (applicant) =>
      applicant.facilityName?.toLowerCase().includes(value.toLowerCase()) ||
      applicant.category?.toLowerCase().includes(value.toLowerCase()) ||
      applicant.email?.toLowerCase().includes(value.toLowerCase()) ||
      applicant.phone?.toLowerCase().includes(value) ||
      applicant.lastName?.toLowerCase().includes(value) ||
      applicant.firstName?.toLowerCase().includes(value)
  );

  if (filteredData.length > 0) {
    return setFilteredData(filteredData);
  } else {
    return setFilteredData([]);
  }
};
