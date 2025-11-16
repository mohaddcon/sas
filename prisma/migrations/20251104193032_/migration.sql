/*
  Warnings:

  - You are about to drop the column `product` on the `Shipment` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "product",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
