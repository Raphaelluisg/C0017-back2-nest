-- AlterTable
ALTER TABLE "User" ADD COLUMN     "psnId" TEXT;

-- CreateTable
CREATE TABLE "Psn" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "storyline" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Psn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Psn_id_key" ON "Psn"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_psnId_fkey" FOREIGN KEY ("psnId") REFERENCES "Psn"("id") ON DELETE SET NULL ON UPDATE CASCADE;
