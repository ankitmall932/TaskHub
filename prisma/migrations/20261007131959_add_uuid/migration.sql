/*
  Warnings:

  - The primary key for the `spaces` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `spaces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `spaceId` on the `task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_spaceId_fkey";

-- AlterTable
ALTER TABLE "spaces" DROP CONSTRAINT "spaces_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "spaces_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "task" DROP CONSTRAINT "task_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "spaceId",
ADD COLUMN     "spaceId" UUID NOT NULL,
ADD CONSTRAINT "task_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
