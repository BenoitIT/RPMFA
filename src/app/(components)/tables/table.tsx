"use client";
import React, { useState } from "react";
import { BsTrash, BsEye, BsPencil, BsFile } from "react-icons/bs";
import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";
import { tableProps } from "@/app/interfaces/table";
import { Empty } from "antd";
import CheckBox from "../checkboxes/checkBox";
import Paginator from "../pagination/generalPaginator";

const Table = ({
  columns,
  data,
  handleEdit,
  onSelectingRow,
  selectedRow,
  handleDelete,
  handelCancel,
  isSelectAll,
  setCurrentDataLink,
  selectAllRow,
  handleView,
  paginationLinks,
}: tableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const lastPage = paginationLinks?.last
    ? parseInt(paginationLinks?.last.charAt(paginationLinks?.last.length - 1))
    : null;
  const NextPage = paginationLinks?.next
    ? parseInt(paginationLinks?.next.charAt(paginationLinks?.next.length - 1))
    : null;
  const currentPageLink = NextPage ? NextPage - 1 : lastPage;
  const totalPages = Math.ceil(data?.length / itemsPerPage || 1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paginationLinks
    ? data
    : data?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (setCurrentDataLink) {
      setCurrentDataLink(`?page=${pageNumber}`);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (setCurrentDataLink && currentPageLink) {
        setCurrentDataLink(`?page=${currentPageLink - 1}`);
      }
    }
  };
  const handleNextPage = () => {
    if (totalPages > currentPage) {
      setCurrentPage(currentPage + 1);
      if (setCurrentDataLink && NextPage) {
        setCurrentDataLink(`?page=${NextPage - 1}`);
      }
    }
  };

  return (
    <div className="w-full text-sm ">
      {data?.length < 1 ? (
        <div className="flex h-[50vh] bg-transparent w-full justify-center items-center">
          <div className="text-base text-gray-900">
            <Empty />
          </div>
        </div>
      ) : (
        <>
          <table className="w-full h-fit shadow-sm border border-gray-100">
          <tbody className="bg-white">
            <tr className="bg-white rounded">
              <th className={"py-3 pl-4"}>
                <div className="flex items-center h-5">
                  <CheckBox
                    onChange={() => selectAllRow(data)}
                    checked={isSelectAll}
                  />
                </div>
              </th>
              {columns?.map((column: any) => (
                <th
                  className={`md:py-3 xs:py-2 xs:px-1 text-left md:text-sm  xs:text-xs font-normal text-gray-700 capitalize ${column.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                  key={column.field}
                >
                  {column.header.length > 28
                    ? column.header.slice(0, 28) + "..."
                    : column.header}
                </th>
              ))}
            </tr>

              {currentItems?.map((data: any) => (
                <tr
                  key={data.id}
                  className="border-b shadow border-grey-500 hover:bg-grey-300 hover:cursor-pointer relative"
                  onClick={() => onSelectingRow(data.id)}
                >
                  <td className={"py-2 pl-4"}>
                    <div className="flex items-center h-5">
                      <CheckBox
                        onChange={() => onSelectingRow(data?.id)}
                        checked={selectedRow.includes(data?.id)}
                      />
                    </div>
                  </td>
                  {columns?.map((col: any) => (
                    <td
                      key={col.field}
                      className={`${
                        col.field === "image" || col.field === "logo"
                          ? " md:py-2 xs:py-2  font-normal h-[30px] pl-1"
                          : `  md:py-2 xs:py-1 text-left text-xs md:text-sm font-normal text-grey-800`
                      } ${col.field === "email" ? "" : "capitalize"} ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                    >
                      {col.field === "image" && (
                        <div className="flex items-center h-[30px] rounded-full">
                          {data[col.field] && data[col.field] !== null ? (
                            <Image
                              src={data[col.field]}
                              width={35}
                              height={30}
                              alt=""
                              className="rounded-full object-fill aspect-auto h-[30px]"
                            />
                          ) : (
                            <Image
                              src="/images/useravatar.png"
                              width={30}
                              height={30}
                              alt="profile"
                              className="rounded-full object-fill aspect-auto h-[30px]"
                            />
                          )}
                        </div>
                      )}
                      {col.field === "Action" ? (
                        <div className="flex gap-2">
                          {handleView && (
                            <button
                              onClick={() => {
                                handleView(data.id);
                              }}
                              className="text-gray-700 hover:cursor-pointer hover:text-blue-700 px-4 py-1 border border-gray-300 rounded"
                            >
                              <BsEye />
                            </button>
                          )}
                          {handleEdit ? (
                            <button
                              onClick={() => {
                                handleEdit(data.id);
                              }}
                              className="text-grey-900 hover:cursor-pointer hover:text-blue-900"
                            >
                              <BsPencil />
                            </button>
                          ) : (
                            ""
                          )}
                          {handelCancel ? (
                            <button
                              onClick={() => {
                                handelCancel(data.id);
                              }}
                              className="text-red-300 hover:cursor-pointer"
                            >
                              <LiaTimesSolid />
                            </button>
                          ) : (
                            ""
                          )}

                          {handleDelete && (
                            <button
                              onClick={() => handleDelete(data.id)}
                              className={`${"opacity-80 text-red-300 hover:cursor-pointer"}`}
                            >
                              <BsTrash />
                            </button>
                          )}
                        </div>
                      ) : col.field === "status" ? (
                        <button
                          className={`py-1 w-[80px] text-xs border rounded ${
                            data.status?.toLowerCase().includes("progress") ||
                            data.status?.toLowerCase().includes("pending") ||
                            data.status?.toLowerCase().includes("unpaid")
                              ? "border-yellow-100 font-medium  text-yellow-600 bg-yellow-100"
                              : ""
                          } ${
                            data.status?.toLowerCase() == "completed" ||
                            data.status?.toLowerCase() == "paid" ||
                            data.status?.toLowerCase() == "approved" ||
                            data.status?.toLowerCase() == "active"
                              ? "text-blue-400 bg-green-100 font-medium"
                              : ""
                          }${
                            data.status?.toLowerCase() === "canceled" ||
                            data.status?.toLowerCase() == "closed" ||
                            data.status?.toLowerCase() == "rejected"
                              ? "border-red-300 bg-red-400 text-white"
                              : ""
                          }`}
                        >
                          {data.status}
                        </button>
                      ) : col.field === "image" || col.field === "logo" ? (
                        ""
                      ) : data[col.field]?.length > 26 ? (
                        data[col.field]?.slice(0, 25) + "...."
                      ) : col.field === "document" ? (
                        <div className="flex gap-2  text-xs border border-grey-800 rounded bg-grey-50 text-grey-800 p-1 w-fit">
                          <BsFile />
                          <p className="truncate flex-1">{data[col.field]}h</p>
                        </div>
                      ) : (
                        data[col.field]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={
              data?.length > 0 ? "flex justify-end py-4 w-full" : "hidden"
            }
          >
            <Paginator
              activePage={currentPageLink ? currentPageLink : currentPage}
              totalPages={lastPage ? lastPage : totalPages}
              onPageChange={handlePageChange}
              onPreviousPageChange={handlePreviousPage}
              onNextPageChange={handleNextPage}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default Table;
