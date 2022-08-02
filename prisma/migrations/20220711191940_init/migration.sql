-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "commentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "score" DECIMAL NOT NULL DEFAULT 0,
    "authorId" INTEGER NOT NULL,
    "replyId" INTEGER,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Comment" ("commentId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("authorId", "commentId", "content", "createdAt", "replyId", "score") SELECT "authorId", "commentId", "content", "createdAt", "replyId", "score" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
