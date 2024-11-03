/*
  Warnings:

  - You are about to drop the column `active` on the `Tester` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[problemId]` on the table `Tester` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tester" DROP COLUMN "active";

-- CreateIndex
CREATE UNIQUE INDEX "Tester_problemId_key" ON "Tester"("problemId");
