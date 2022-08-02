-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "score" DECIMAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "replyId" INTEGER NOT NULL,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Comment" ("commentId") ON DELETE RESTRICT ON UPDATE CASCADE
);
