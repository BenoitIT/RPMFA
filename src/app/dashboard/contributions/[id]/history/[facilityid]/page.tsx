"use client";
import Link from "next/link";
import { PiGreaterThanLight } from "react-icons/pi";
import { convertTimestamp } from "@/app/utilities/timeConverters";
import { extractYear } from "@/app/utilities/timeParser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ContributionHistories from "@/app/dashboard/(components)/ContentsContainers/contributionHistory";
import Loader from "@/app/dashboard/(components)/ContentsContainers/loader";

const Page = () => {
  const params: any = useParams();
  const facilityId = params?.facilityid;
  const contrId = params?.id;
  const [contributionInfo, setContributionInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/contribution/facilities/${facilityId}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        const contributions = data.contributions.map((contribution?: any) => ({
          id: contribution?.id,
          contributionAmount:
            "RWF" +
            " " +
            new Intl.NumberFormat("en-US").format(
              contribution?.contributionAmount
            ),
          depositReceiptNumber: contribution?.depositRecieptNumber,
          status: contribution?.status,
          defaultcontribution: contribution?.facility?.defaultContribution,
          amountDue:
            "RWF" +
            " " +
            new Intl.NumberFormat("en-US").format(
              contribution?.unpaidContribution
            ),
          unpaidContribution: contribution?.unpaidContribution,
          created_at: convertTimestamp(contribution?.createdAt),
          contributionPeriod: contribution?.contributionPeriod,
          paymentYear: extractYear(contribution?.YearOfContributionStart),
        }));
        setContributionInfo(contributions);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [facilityId]);

  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1">
        <Link
          href="/dashboard"
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Home
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <Link
          href="/dashboard/contributions"
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Contributions
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <Link
          href={`/dashboard/contributions/${contrId}`}
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Contribution Details
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <Link href="" className="hover:text-blue-700 hover:cursor-pointer">
          Contribution History
        </Link>
      </h3>
      <div className=" p-6 h-full -ml-4">
        {loading ? (
          <Loader />
        ) : (
          <ContributionHistories contributions={contributionInfo} />
        )}
      </div>
    </div>
  );
};
export default Page;
