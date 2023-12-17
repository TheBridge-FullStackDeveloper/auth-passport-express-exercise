-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorUserName_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorUserName_fkey" FOREIGN KEY ("authorUserName") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
