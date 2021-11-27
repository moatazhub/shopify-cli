/*
  Warnings:

  - The primary key for the `shopsession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `shopsession` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `domain_id` to the `ShopSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `ShopSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shopsession` DROP PRIMARY KEY,
    ADD COLUMN `domain_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `session_id` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
