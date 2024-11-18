/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "createdAt",
ADD COLUMN     "timeStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
