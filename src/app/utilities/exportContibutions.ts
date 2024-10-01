import * as XLSX from "xlsx";

export function exportTableToExcel(pendingData: any[]) {
  const formattedData = pendingData.map((item: any) => ({
    "Facility Name": item?.facilityName,
    Category: item?.category,
    "Amount Paid": item?.amountPaid,
    "Due Date": item?.dueDate,
    "Amount Due": item?.amountDue,
    "Year Of Arrears": item?.numberOfPeriod,
    "Payment Year": item?.paymentYear,
    Status: item?.status,
  }));
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contributions");
  XLSX.writeFile(workbook, `${pendingData[0].paymentYear} Contributions.xls`);
}
