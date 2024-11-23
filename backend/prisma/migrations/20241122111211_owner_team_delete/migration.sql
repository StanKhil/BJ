/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_ownerId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "ownerId";
