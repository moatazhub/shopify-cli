/*
  Warnings:

  - A unique constraint covering the columns `[shop]` on the table `ShopSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ShopSession_shop_key` ON `ShopSession`(`shop`);
