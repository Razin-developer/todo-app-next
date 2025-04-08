/*
  Warnings:

  - Added the required column `status` to the `All` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Month` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Other` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Week` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Year` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_All" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "todo" TEXT NOT NULL,
    "real" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_All" ("createdAt", "id", "real", "todo", "updatedAt") SELECT "createdAt", "id", "real", "todo", "updatedAt" FROM "All";
DROP TABLE "All";
ALTER TABLE "new_All" RENAME TO "All";
CREATE TABLE "new_Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "todo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Day" ("createdAt", "id", "todo", "updatedAt") SELECT "createdAt", "id", "todo", "updatedAt" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
CREATE TABLE "new_Month" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "todo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Month" ("createdAt", "id", "todo", "updatedAt") SELECT "createdAt", "id", "todo", "updatedAt" FROM "Month";
DROP TABLE "Month";
ALTER TABLE "new_Month" RENAME TO "Month";
CREATE TABLE "new_Other" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "todo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Other" ("createdAt", "id", "todo", "updatedAt") SELECT "createdAt", "id", "todo", "updatedAt" FROM "Other";
DROP TABLE "Other";
ALTER TABLE "new_Other" RENAME TO "Other";
CREATE TABLE "new_Week" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "todo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Week" ("createdAt", "id", "todo", "updatedAt") SELECT "createdAt", "id", "todo", "updatedAt" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
CREATE TABLE "new_Year" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "todo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Year" ("createdAt", "id", "todo", "updatedAt") SELECT "createdAt", "id", "todo", "updatedAt" FROM "Year";
DROP TABLE "Year";
ALTER TABLE "new_Year" RENAME TO "Year";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
