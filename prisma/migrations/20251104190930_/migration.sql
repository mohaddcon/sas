/*
  Warnings:

  - You are about to drop the column `productType` on the `Shipment` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "productType",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
