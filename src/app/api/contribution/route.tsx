import prisma from "@/prisma/client";
import schema from "./validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { convertTimestamp } from "@/app/utilities/timeConverters";
import { extractYear } from "@/app/utilities/timeParser";
import { getRandomDate } from "@/app/utilities/rondomDateGenerator";
export const revalidate = 0;
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const isRecieptRegistered = await prisma.contribution.findFirst({
      where: {
        depositRecieptNumber: body.depositRecieptNumber,
      },
    });
    if (isRecieptRegistered) {
      return NextResponse.json({
        message: "Receipt with this number has already registred",
        status: 400,
      });
    }
    const verifiedMembership = await prisma.facility.findFirst({
      where: {
        status: "approved",
        contributionChecked: true,
        userId: body.userId,
      },
    });
    if (verifiedMembership) {
      const checkInitialContributionInfo = await prisma.contribution.findFirst({
        where: {
          facilityId: body.facilityId,
          userId: body.userId,
        },
        orderBy: {
          id: "desc",
        },
        take: 1,
      });
      if (
        checkInitialContributionInfo &&
        checkInitialContributionInfo.unpaidContribution > 0
      ) {
        let contributionBalance =
          checkInitialContributionInfo.unpaidContribution -
          body.contributionAmount;
        if (contributionBalance < 0) {
          const excessAmount = Math.abs(contributionBalance);
          const amountPaidForUnpaid = body.contributionAmount - excessAmount;
          const updatedContributionAmount =
            checkInitialContributionInfo.contributionAmount +
            amountPaidForUnpaid;

          const contribution = await prisma.contribution.update({
            where: {
              id: checkInitialContributionInfo.id,
            },
            data: {
              contributionAmount: updatedContributionAmount,
              depositRecieptNumber: body.depositRecieptNumber,
              depositReciept: [
                ...checkInitialContributionInfo.depositReciept,
                ...body.depositReciept,
              ],
              unpaidContribution: 0,
            },
          });
          const probableYearsTobeCovered =
            Math.floor(excessAmount / verifiedMembership.defaultContribution) >
            0
              ? Math.floor(
                  excessAmount / verifiedMembership.defaultContribution
                )
              : 1;
          const remainder =
            excessAmount % verifiedMembership.defaultContribution;
          if (
            probableYearsTobeCovered <= 1 &&
            remainder >= verifiedMembership.defaultContribution
          ) {
            const nextYear =
              extractYear(
                checkInitialContributionInfo.YearOfContributionStart
              ) + 1;
            await prisma.contribution.create({
              data: {
                contributionAmount: excessAmount,
                depositRecieptNumber: body.depositRecieptNumber + `(next year)`,
                facilityId: body.facilityId,
                depositReciept: body.depositReciept,
                YearOfContributionStart: getRandomDate(nextYear),
                userId: body.userId,
                unpaidContribution:
                  verifiedMembership.defaultContribution - excessAmount,
              },
            });
          }
          if (probableYearsTobeCovered == 1) {
            const nextYear = extractYear(
              checkInitialContributionInfo.YearOfContributionStart
            );
            await prisma.contribution.create({
              data: {
                contributionAmount:
                  verifiedMembership.defaultContribution - excessAmount,
                depositRecieptNumber: body.depositRecieptNumber,
                facilityId: body.facilityId,
                depositReciept: body.depositReciept,
                YearOfContributionStart: getRandomDate(nextYear),
                userId: body.userId,
                unpaidContribution:
                  verifiedMembership.defaultContribution -
                  body.contributionAmount,
              },
            });
          } else {
            for (let year = 1; year <= probableYearsTobeCovered; year++) {
              await prisma.contribution.create({
                data: {
                  contributionAmount: verifiedMembership.defaultContribution,
                  depositRecieptNumber: body.depositRecieptNumber + `(${year})`,
                  facilityId: body.facilityId,
                  depositReciept: body.depositReciept,
                  YearOfContributionStart: getRandomDate(
                    extractYear(
                      checkInitialContributionInfo.YearOfContributionStart
                    ) + year
                  ),
                  userId: body.userId,
                  unpaidContribution: 0,
                },
              });
            }
          }
          if (
            remainder > 0 &&
            remainder <= verifiedMembership.defaultContribution
          ) {
            const nextYear =
              extractYear(
                checkInitialContributionInfo?.YearOfContributionStart
              ) +
              probableYearsTobeCovered +
              1;
            await prisma.contribution.create({
              data: {
                contributionAmount: remainder,
                depositRecieptNumber: body.depositRecieptNumber + `(partial)`,
                facilityId: body.facilityId,
                depositReciept: body.depositReciept,
                YearOfContributionStart: getRandomDate(nextYear),
                userId: body.userId,
                unpaidContribution:
                  verifiedMembership.defaultContribution - remainder,
              },
            });
          }
          return NextResponse.json({
            status: 201,
            data: { currentContribution: contribution },
            message: `Your contribution is sent successfully. Unpaid contribution is settled and excess applied to next year.`,
          });
        } else {
          const amountBalance =
            body.contributionAmount +
            checkInitialContributionInfo.contributionAmount;
          const contribution = await prisma.contribution.update({
            where: {
              id: checkInitialContributionInfo.id,
            },
            data: {
              contributionAmount: amountBalance,
              depositRecieptNumber: body.depositRecieptNumber,
              depositReciept: [
                ...checkInitialContributionInfo.depositReciept,
                ...body.depositReciept,
              ],
              unpaidContribution: contributionBalance,
            },
          });

          await prisma.notification.create({
            data: {
              notification: `New membership contribution has been raised!`,
              senderId: body.userId,
              reciverId: 1,
            },
          });

          return NextResponse.json({
            status: 201,
            data: contribution,
            message:
              "Your contribution is sent successfully and unpaid contribution balance is changed",
          });
        }
      } else if (
        checkInitialContributionInfo &&
        extractYear(checkInitialContributionInfo?.YearOfContributionStart) >
          extractYear(body.YearOfContributionStart)
      ) {
        return NextResponse.json({
          status: 400,
          data: null,
          message: `We are no longer focusing on ${extractYear(
            body.YearOfContributionStart
          )}'s contributions. Correct Contributing Year`,
        });
      } else {
        let updatedUnPaidContributionBal: number;
        if (verifiedMembership.defaultContribution < body.contributionAmount) {
          const numberOfYearsPaidAtOnce = Math.floor(
            body.contributionAmount / verifiedMembership.defaultContribution
          );
          const remainder =
            body.contributionAmount % verifiedMembership.defaultContribution;
          for (
            let yearsCovered = 1;
            yearsCovered <= numberOfYearsPaidAtOnce;
            yearsCovered++
          ) {
            await prisma.contribution.create({
              data: {
                contributionAmount: verifiedMembership.defaultContribution,
                depositRecieptNumber:
                  body.depositRecieptNumber + `(${yearsCovered})`,
                facilityId: body.facilityId,
                depositReciept: body.depositReciept,
                YearOfContributionStart: getRandomDate(
                  extractYear(
                    checkInitialContributionInfo?.YearOfContributionStart
                  ) + yearsCovered
                ),
                userId: body.userId,
                unpaidContribution: 0,
              },
            });
          }
          if (remainder > 0) {
            const nextYear =
              extractYear(
                checkInitialContributionInfo?.YearOfContributionStart
              ) +
              numberOfYearsPaidAtOnce +
              1;
            await prisma.contribution.create({
              data: {
                contributionAmount: remainder,
                depositRecieptNumber: body.depositRecieptNumber + `(partial)`,
                facilityId: body.facilityId,
                depositReciept: body.depositReciept,
                YearOfContributionStart: getRandomDate(nextYear),
                userId: body.userId,
                unpaidContribution:
                  verifiedMembership.defaultContribution - remainder,
              },
            });
          }
          return NextResponse.json({
            status: 201,
            data: null,
            message: `You have sent contributions for ${numberOfYearsPaidAtOnce} year(s) ${
              remainder > 0
                ? `and an additional ${remainder} for the next year`
                : ""
            }.`,
          });
        }
        if (verifiedMembership.defaultContribution == body.contributionAmount) {
          updatedUnPaidContributionBal = 0;
        } else {
          updatedUnPaidContributionBal =
            verifiedMembership.defaultContribution - body.contributionAmount;
        }

        const contribution = await prisma.contribution.create({
          data: {
            contributionAmount: body.contributionAmount,
            depositRecieptNumber: body.depositRecieptNumber,
            facilityId: body.facilityId,
            depositReciept: body.depositReciept,
            YearOfContributionStart: getRandomDate(
              extractYear(
                checkInitialContributionInfo?.YearOfContributionStart
              ) + 1
            ),
            userId: body.userId,
            unpaidContribution: updatedUnPaidContributionBal,
          },
        });
        await prisma.notification.create({
          data: {
            notification: `New membership contribution has been sent!`,
            senderId: body.userId,
            reciverId: 1,
          },
        });
        return NextResponse.json({
          status: 201,
          data: contribution,
          message: "Your contribution is sent successfully",
        });
      }
    }
    {
      return NextResponse.json({
        status: 400,
        data: null,
        message: "You have not yet been verified to start contributing",
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const yearParam = Number(searchParams.get("year")!);

  try {
    const contributions = await prisma.contribution.findMany({
      where: {
        YearOfContributionStart: {
          gte: new Date(`${yearParam}-01-01T00:00:00.000Z`),
          lt: new Date(`${yearParam + 1}-01-01T00:00:00.000Z`),
        },
      },
      include: {
        user: true,
        facility: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const latestContributionsMap = new Map();

    for (const contribution of contributions) {
      const facilityId = contribution?.facility?.id;
      if (!latestContributionsMap.has(facilityId)) {
        latestContributionsMap.set(facilityId, contribution);
      }
    }
    const latestContributions = Array.from(latestContributionsMap.values());
    const pendingData = latestContributions.map((contribution: any) => ({
      id: contribution?.id,
      facilityName: contribution?.facility?.facilityName,
      category: contribution?.facility?.facilityCategory,
      amountPaid:
        "RWF" +
        " " +
        new Intl.NumberFormat("en-US").format(contribution?.contributionAmount),
      image: contribution?.user?.profileImage,
      amountDue:
        "RWF" +
        " " +
        new Intl.NumberFormat("en-US").format(contribution?.unpaidContribution),
      dueDate: convertTimestamp(contribution?.createdAt),
      status: contribution?.status,
      numberOfPeriod: contribution?.contributionPeriod,
      paymentYear: extractYear(contribution?.YearOfContributionStart),
    }));

    return NextResponse.json({ status: 200, pendingData });
  } catch (err) {
    return NextResponse.json({
      message: "unexpected issue occurs",
      status: 400,
    });
  }
};
