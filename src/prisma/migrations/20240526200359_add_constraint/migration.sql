/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Announcement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subject]` on the table `Announcement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Announcement_id_key" ON "Announcement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_subject_key" ON "Announcement"("subject");
