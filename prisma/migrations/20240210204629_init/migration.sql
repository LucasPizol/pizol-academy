/*
  Warnings:

  - You are about to drop the column `objectives` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Ability` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActivityToGuide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_activity_list` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Ability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guide` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Made the column `objectives` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToGuide" DROP CONSTRAINT "_ActivityToGuide_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToGuide" DROP CONSTRAINT "_ActivityToGuide_B_fkey";

-- DropForeignKey
ALTER TABLE "_activity_list" DROP CONSTRAINT "_activity_list_A_fkey";

-- DropForeignKey
ALTER TABLE "_activity_list" DROP CONSTRAINT "_activity_list_B_fkey";

-- AlterTable
ALTER TABLE "Ability" DROP COLUMN "objectives",
DROP COLUMN "resume",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "classId" INTEGER NOT NULL,
ADD COLUMN     "guide" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ALTER COLUMN "objectives" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyId";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Guide";

-- DropTable
DROP TABLE "_ActivityToGuide";

-- DropTable
DROP TABLE "_activity_list";

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "invite_code" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassHasUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "ClassHasUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasUser" ADD CONSTRAINT "ClassHasUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassHasUser" ADD CONSTRAINT "ClassHasUser_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
