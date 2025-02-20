/*
  Warnings:

  - You are about to drop the column `buyerId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventUserId` on the `ParticipantEvent` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionStatus` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParticipantEvent" DROP CONSTRAINT "ParticipantEvent_eventUserId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "buyerId";

-- AlterTable
ALTER TABLE "ParticipantEvent" DROP COLUMN "eventUserId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeSubscriptionId",
DROP COLUMN "stripeSubscriptionStatus";
