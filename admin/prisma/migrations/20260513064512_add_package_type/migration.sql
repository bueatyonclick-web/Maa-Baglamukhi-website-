-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PujaPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "duration" TEXT NOT NULL,
    "panditName" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT,
    "packageType" TEXT NOT NULL DEFAULT 'OFFLINE',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PujaPackage" ("category", "createdAt", "description", "duration", "id", "image", "isFeatured", "panditName", "price", "slug", "title") SELECT "category", "createdAt", "description", "duration", "id", "image", "isFeatured", "panditName", "price", "slug", "title" FROM "PujaPackage";
DROP TABLE "PujaPackage";
ALTER TABLE "new_PujaPackage" RENAME TO "PujaPackage";
CREATE UNIQUE INDEX "PujaPackage_slug_key" ON "PujaPackage"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
