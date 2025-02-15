-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_ticketId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "ticketId" DROP NOT NULL,
ALTER COLUMN "ticketId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
