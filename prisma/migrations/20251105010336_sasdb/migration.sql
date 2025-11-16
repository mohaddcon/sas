/*
  Warnings:

  - Made the column `desc` on table `typeshiper` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "typeshiper" ALTER COLUMN "desc" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_CUSTOMER_id_fkey" FOREIGN KEY ("CUSTOMER_id") REFERENCES "CUSTOMER"("id") ON DELETE CASCADE ON UPDATE CASCADE;
