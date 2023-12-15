/*
  Warnings:

  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `OrderFood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "OrderFood" ADD COLUMN     "quantity" INTEGER NOT NULL;
