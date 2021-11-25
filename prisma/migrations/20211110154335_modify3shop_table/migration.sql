/*
  Warnings:

  - A unique constraint covering the columns `[shop_url]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ShopSession_shop_key` ON `shopsession`;

-- CreateIndex
CREATE UNIQUE INDEX `User_shop_url_key` ON `User`(`shop_url`);
