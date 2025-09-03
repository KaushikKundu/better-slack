/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Server` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_serverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Server" DROP CONSTRAINT "Server_ownerId_fkey";

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "password",
ALTER COLUMN "createdAt" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."Message";

-- DropTable
DROP TABLE "public"."Room";

-- DropTable
DROP TABLE "public"."Server";
