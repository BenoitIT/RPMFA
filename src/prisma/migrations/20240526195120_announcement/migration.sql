-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "announcementbody" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
