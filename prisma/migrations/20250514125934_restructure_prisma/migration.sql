-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_batchId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentJson" DROP CONSTRAINT "AssignmentJson_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentJson" DROP CONSTRAINT "AssignmentJson_batchId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentJson" DROP CONSTRAINT "AssignmentJson_userId_fkey";

-- CreateTable
CREATE TABLE "Assignments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JsonData" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "assignmentId" TEXT NOT NULL,

    CONSTRAINT "JsonData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentJson" ADD CONSTRAINT "AssignmentJson_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentJson" ADD CONSTRAINT "AssignmentJson_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentJson" ADD CONSTRAINT "AssignmentJson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JsonData" ADD CONSTRAINT "JsonData_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JsonData" ADD CONSTRAINT "JsonData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JsonData" ADD CONSTRAINT "JsonData_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
