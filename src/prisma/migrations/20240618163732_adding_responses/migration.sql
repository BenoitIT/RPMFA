-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "responded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "response" TEXT NOT NULL DEFAULT '';
