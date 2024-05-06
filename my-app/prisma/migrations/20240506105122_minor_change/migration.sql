/*
  Warnings:

  - Changed the type of `touser_id` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "touser_id",
ADD COLUMN     "touser_id" INTEGER NOT NULL;
