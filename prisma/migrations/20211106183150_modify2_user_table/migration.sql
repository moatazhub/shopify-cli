/*
  Warnings:

  - A unique constraint covering the columns `[shop_url]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `shop_url` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_shop_url_key` ON `User`(`shop_url`);
