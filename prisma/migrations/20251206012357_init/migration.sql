-- CreateTable
CREATE TABLE "SalaryEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT,
    "age" INTEGER NOT NULL,
    "jobCategoryCode" TEXT NOT NULL,
    "jobSubCategory" TEXT,
    "annualIncome" INTEGER NOT NULL,
    "industryCode" TEXT,
    "surveyVersion" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SalaryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyResponse" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "satisfaction" INTEGER,
    "selfAvgGuess" INTEGER,
    "extraAnswers" JSONB,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SnapshotResult" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "zScore" DOUBLE PRECISION NOT NULL,
    "percentile" DOUBLE PRECISION NOT NULL,
    "sampleSize" INTEGER NOT NULL,
    "histogram" JSONB NOT NULL,
    "scoreVersion" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SnapshotResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SalaryEntry_jobCategoryCode_age_idx" ON "SalaryEntry"("jobCategoryCode", "age");

-- CreateIndex
CREATE INDEX "SalaryEntry_jobCategoryCode_jobSubCategory_idx" ON "SalaryEntry"("jobCategoryCode", "jobSubCategory");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyResponse_entryId_key" ON "SurveyResponse"("entryId");

-- CreateIndex
CREATE UNIQUE INDEX "SnapshotResult_entryId_key" ON "SnapshotResult"("entryId");

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "SalaryEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnapshotResult" ADD CONSTRAINT "SnapshotResult_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "SalaryEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
