/*
  Warnings:

  - Added the required column `realId` to the `All` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_All" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "realId" TEXT NOT NULL,
    "todo" TEXT NOT NULL,
    "real" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_All" ("createdAt", "id", "real", "status", "todo", "updatedAt") SELECT "createdAt", "id", "real", "status", "todo", "updatedAt" FROM "All";
DROP TABLE "All";
ALTER TABLE "new_All" RENAME TO "All";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
