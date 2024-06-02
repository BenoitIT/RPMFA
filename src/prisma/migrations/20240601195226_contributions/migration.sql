-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "contributionAmount" INTEGER NOT NULL,
    "depositRecieptNumber" INTEGER NOT NULL,
    "depositReciept" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'pending',
    "facilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_id_key" ON "Contribution"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_depositRecieptNumber_key" ON "Contribution"("depositRecieptNumber");

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
