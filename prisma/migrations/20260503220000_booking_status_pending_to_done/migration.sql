-- Rename enum value to match Prisma schema (DONE replaces PENDING).
ALTER TYPE "BookingStatus" RENAME VALUE 'PENDING' TO 'DONE';
