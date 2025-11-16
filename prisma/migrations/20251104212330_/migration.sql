-- CreateTable
CREATE TABLE "_ProductTounit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductTounit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductTounit_B_index" ON "_ProductTounit"("B");

-- AddForeignKey
ALTER TABLE "_ProductTounit" ADD CONSTRAINT "_ProductTounit_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductTounit" ADD CONSTRAINT "_ProductTounit_B_fkey" FOREIGN KEY ("B") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
