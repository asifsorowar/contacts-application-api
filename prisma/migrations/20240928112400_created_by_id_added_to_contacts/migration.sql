-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "createdById" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
