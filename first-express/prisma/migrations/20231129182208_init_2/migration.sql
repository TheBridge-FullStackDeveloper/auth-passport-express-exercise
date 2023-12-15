/*
  Warnings:

  - You are about to drop the column `foodId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_foodId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "foodId";

-- CreateTable
CREATE TABLE "OrderFood" (
    "foodId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderFood_pkey" PRIMARY KEY ("foodId","orderId")
);

-- AddForeignKey
ALTER TABLE "OrderFood" ADD CONSTRAINT "OrderFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderFood" ADD CONSTRAINT "OrderFood_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
