/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssignmentJson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_batchId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentJson" DROP CONSTRAINT "AssignmentJson_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentJson" DROP CONSTRAINT "AssignmentJson_batchId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentJson" DROP CONSTRAINT "AssignmentJson_userId_fkey";

-- DropTable
DROP TABLE "Assignment";

-- DropTable
DROP TABLE "AssignmentJson";
