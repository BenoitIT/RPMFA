-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" TEXT DEFAULT 'member';
