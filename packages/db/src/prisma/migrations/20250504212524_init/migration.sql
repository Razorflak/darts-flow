/*
  Warnings:

  - The values [ROUND_ROBIN,SINGLE_ELIMINATION,DOUBLE_ELIMINATION_UPPER_BRACKET,DOUBLE_ELIMINATION_LOWER_BRACKET,FINAL] on the enum `PhaseType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `phaseId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `round` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the `TeamInTournament` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[previousPhaseId]` on the table `Phase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nextPhaseId]` on the table `Phase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PhaseType_new" AS ENUM ('GROUP_STAGE', 'SINGLE_ELIMINATION_BRACKET');
ALTER TABLE "Phase" ALTER COLUMN "type" TYPE "PhaseType_new" USING ("type"::text::"PhaseType_new");
ALTER TYPE "PhaseType" RENAME TO "PhaseType_old";
ALTER TYPE "PhaseType_new" RENAME TO "PhaseType";
DROP TYPE "PhaseType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_phaseId_fkey";

-- DropForeignKey
ALTER TABLE "TeamInTournament" DROP CONSTRAINT "TeamInTournament_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamInTournament" DROP CONSTRAINT "TeamInTournament_tournamentId_fkey";

-- DropIndex
DROP INDEX "Match_phaseId_idx";

-- DropIndex
DROP INDEX "Phase_tournamentId_name_key";

-- DropIndex
DROP INDEX "Phase_tournamentId_order_idx";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "phaseId",
DROP COLUMN "round";

-- AlterTable
ALTER TABLE "Phase" DROP COLUMN "createdAt",
DROP COLUMN "order",
DROP COLUMN "updatedAt",
ADD COLUMN     "nextPhaseId" TEXT,
ADD COLUMN     "phaseParameters" JSONB,
ADD COLUMN     "previousPhaseId" TEXT,
ALTER COLUMN "type" SET DEFAULT 'GROUP_STAGE';

-- DropTable
DROP TABLE "TeamInTournament";

-- CreateTable
CREATE TABLE "TeamTournament" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "seed" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamTournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "name" TEXT,
    "roundNumber" INTEGER,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchRound" (
    "id" TEXT NOT NULL,
    "numRoundMatch" INTEGER NOT NULL,
    "roundId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "MatchRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundTeam" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,

    CONSTRAINT "RoundTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeamTournament_tournamentId_idx" ON "TeamTournament"("tournamentId");

-- CreateIndex
CREATE INDEX "TeamTournament_teamId_idx" ON "TeamTournament"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamTournament_tournamentId_teamId_key" ON "TeamTournament"("tournamentId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchRound_matchId_key" ON "MatchRound"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "RoundTeam_roundId_teamId_key" ON "RoundTeam"("roundId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Phase_previousPhaseId_key" ON "Phase"("previousPhaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Phase_nextPhaseId_key" ON "Phase"("nextPhaseId");

-- AddForeignKey
ALTER TABLE "TeamTournament" ADD CONSTRAINT "TeamTournament_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTournament" ADD CONSTRAINT "TeamTournament_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "PhaseToPreviousPhase" FOREIGN KEY ("previousPhaseId") REFERENCES "Phase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "PhaseToNextPhase" FOREIGN KEY ("nextPhaseId") REFERENCES "Phase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRound" ADD CONSTRAINT "MatchRound_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRound" ADD CONSTRAINT "MatchRound_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundTeam" ADD CONSTRAINT "RoundTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundTeam" ADD CONSTRAINT "RoundTeam_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
