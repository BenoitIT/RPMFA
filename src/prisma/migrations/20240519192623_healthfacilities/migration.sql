-- CreateTable
CREATE TABLE "Facility" (
    "id" SERIAL NOT NULL,
    "facilityName" TEXT NOT NULL,
    "facilityCategory" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "cell" TEXT NOT NULL,
    "plotNumber" TEXT NOT NULL,
    "documents" TEXT[],

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Facility_facilityName_key" ON "Facility"("facilityName");
