"use client";

import { useCallback, useEffect, useState } from "react";
import Footer from "@/app/(components)/navigations/Footer";
import NavBar from "@/app/(components)/navigations/NavBar";
import MemberDetatils from "@/app/(components)/cards/MemberDetails";
import { pageProps } from "@/app/dashboard/(components)/ContentsContainers/allmembers";
import { TbDatabaseX } from "react-icons/tb";
import Paginator from "@/app/(components)/pagination/generalPaginator";
import { useRouter, useSearchParams } from "next/navigation";

const Members = ({ Allmembers }: pageProps) => {
  const [expandedClinic, setExpandedClinic] = useState<number | null>(null);
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const activePage = searchParams?.get("page");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(Allmembers?.length / itemsPerPage || 1);
  const lastPage = null;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Allmembers?.slice(indexOfFirstItem, indexOfLastItem);
  const handleExpand = (clinicId: number) => {
    setExpandedClinic(expandedClinic === clinicId ? null : clinicId);
  };
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
        `?${createQueryString("page", ((Number(currentPage) + Number(1))).toString())}`
      );
    }
  };
  useEffect(() => {
    if (activePage) {
      setCurrentPage(activePage);
    }
  }, [activePage]);
  return (
    <div className="min-h-screen max-h-fit">
      <div className="w-[100vw]">
        <NavBar />
        {Allmembers.length > 0 ? (
          <div className="w-full p-5 min-h-[66vh]">
            <div className="mb-6">
              <h1 className="text-blue-1 text2xl font-semibold mb-3 text-center">
                Members
              </h1>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-3">
              {currentItems.map((member) => (
                <MemberDetatils
                  key={member.id}
                  expanded={expandedClinic === member}
                  handleExpand={() => handleExpand(member)}
                  fistName={member.firstName}
                  lastName={member.lastName}
                  facilitityName={member.facilitityName}
                  email={member.email}
                  phoneNumber={member.phone}
                  category={member.category}
                />
              ))}
            </div>
            <div
              className={
                totalPages > 1 ? "w-full flex justify-end my-3 ml-4" : "hidden"
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
          <div className="h-[66vh] w-[] flex justify-center items-center text-sm flex-col gap-3">
            <TbDatabaseX className="text-4xl text-blue-300" />
            <p className="text-gray-700 font-light">
              Members are not found. They will be recorded.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Members;
