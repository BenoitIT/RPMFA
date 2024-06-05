-- AlterTable
ALTER TABLE "Contribution" ADD COLUMN     "unpaidContribution" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "contributionChecked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "defaultContribution" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
