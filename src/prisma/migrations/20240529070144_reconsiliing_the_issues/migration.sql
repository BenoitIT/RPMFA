/*
  Warnings:

  - A unique constraint covering the columns `[tinNumber]` on the table `Facility` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tinNumber` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "tinNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Facility_tinNumber_key" ON "Facility"("tinNumber");
