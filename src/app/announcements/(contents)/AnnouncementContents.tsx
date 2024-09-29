"use client";

import FilterButton from "@/app/(components)/buttons/FilterButton";
import AnnouncementCard from "@/app/(components)/cards/AnnouncementCard";
import Paginator from "@/app/(components)/pagination/generalPaginator";
import { AnnouncmentProps } from "@/app/dashboard/(components)/ContentsContainers/anouncements";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { TbDatabaseX } from "react-icons/tb";

const AnnouncementContents = ({ announcements }: AnnouncmentProps) => {
  const [activeAnnouncements, setActiveAnnouncements] = useState(announcements);
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(activeAnnouncements.length / itemsPerPage || 1);
  const lastPage = null;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeAnnouncements?.slice(indexOfFirstItem, indexOfLastItem);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handlePageChange = (pageNumber: number) => {
    router.push(`?${createQueryString("page", pageNumber.toString())}`);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      router.push(
        `?${createQueryString("page", (currentPage - 1).toString())}`
      );
    }
  };
  const handleNextPage = () => {
    if (totalPages > currentPage) {
      router.push(
        `?${createQueryString(
          "page",
          (Number(currentPage) + Number(1)).toString()
        )}`
      );
    }
  };
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
  return (
    <>
      {Array.isArray(activeAnnouncements) && activeAnnouncements.length > 0 ? (
        <div className="w-full mx-auto min-h-[66vh] px-6 lg:px-12 xl:px-14 mt-[100px]">
          <div className="flex justify-between my-8 gap-y-3 max-sm:flex-col">
            <h1 className="text-xl font-medium text-blue-1">
              Announcements
            </h1>
          </div>
          <div className="grid gap-8 my-6 border border-gray-150 p-2 lg:px-2 max-sm:p-1 rounded-md">
            {currentItems.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                title={announcement.subject}
                body={announcement.announcementbody}
                announcementId={announcement.id}
                time={announcement.createdAt}
              />
            ))}
          </div>
          <div
              className={
                totalPages > 1 ? "w-full flex justify-end my-3 ml-4 px-2 lg:px-12" : "hidden"
              }
            >
              <Paginator
                activePage={currentPage}
                totalPages={lastPage ? lastPage : totalPages}
                onPageChange={handlePageChange}
                onPreviousPageChange={handlePreviousPage}
                onNextPageChange={handleNextPage}
              />
            </div>
        </div>
      ) : (
        <div className="min-h-[74vh] w-[100vw] flex justify-center items-center text-sm flex-col gap-3">
          <TbDatabaseX className="text-4xl text-blue-300" />
          <p className="text-gray-700 font-light">There is no announcement for now.</p>
        </div>
      )}
    </>
  );
};

export default AnnouncementContents;
