-- CreateTable
CREATE TABLE "ContributingYearsMonitor" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "initialized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContributingYearsMonitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContributingYearsMonitor_id_key" ON "ContributingYearsMonitor"("id");
