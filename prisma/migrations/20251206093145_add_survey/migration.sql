/*
  Warnings:

  - You are about to drop the column `satisfaction` on the `SurveyResponse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalaryEntry" ADD COLUMN     "jobSubCategoryOther" TEXT;

-- AlterTable
ALTER TABLE "SurveyResponse" DROP COLUMN "satisfaction",
ADD COLUMN     "isSatisfied" BOOLEAN;

-- CreateTable
CREATE TABLE "HighIncomeReasonResponse" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reasonCodes" TEXT[],
    "freeText" TEXT,

    CONSTRAINT "HighIncomeReasonResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HighIncomeReasonResponse_entryId_key" ON "HighIncomeReasonResponse"("entryId");

-- CreateIndex
CREATE INDEX "SalaryEntry_industryCode_jobCategoryCode_idx" ON "SalaryEntry"("industryCode", "jobCategoryCode");

-- AddForeignKey
ALTER TABLE "HighIncomeReasonResponse" ADD CONSTRAINT "HighIncomeReasonResponse_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "SalaryEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
