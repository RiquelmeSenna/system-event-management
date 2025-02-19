-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_buyerId_fkey";

-- AlterTable
ALTER TABLE "ParticipantEvent" ADD COLUMN     "eventUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "ParticipantEvent" ADD CONSTRAINT "ParticipantEvent_eventUserId_fkey" FOREIGN KEY ("eventUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
