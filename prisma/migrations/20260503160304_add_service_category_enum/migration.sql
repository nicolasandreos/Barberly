-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('HAIR', 'BEARD', 'EYESBROWS', 'MASSAGE');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN "category" "ServiceCategory";

-- Backfill existing services with one valid category
UPDATE "Service"
SET "category" = CASE
  WHEN LOWER("name") LIKE '%barba%' THEN 'BEARD'::"ServiceCategory"
  WHEN LOWER("name") LIKE '%sobrancelha%' THEN 'EYESBROWS'::"ServiceCategory"
  WHEN LOWER("name") LIKE '%massagem%' THEN 'MASSAGE'::"ServiceCategory"
  ELSE 'HAIR'::"ServiceCategory"
END;

-- Make category required after backfill
ALTER TABLE "Service" ALTER COLUMN "category" SET NOT NULL;
