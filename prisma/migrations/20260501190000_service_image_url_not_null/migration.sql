-- Backfill imageUrl by service name, then enforce NOT NULL
UPDATE "Service"
SET "imageUrl" = CASE "name"
  WHEN 'Corte de Cabelo' THEN 'https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png'
  WHEN 'Barba' THEN 'https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png'
  WHEN 'Pézinho' THEN 'https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png'
  WHEN 'Sobrancelha' THEN 'https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png'
  WHEN 'Massagem' THEN 'https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png'
  WHEN 'Hidratação' THEN 'https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png'
  ELSE COALESCE("imageUrl", 'https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png')
END;

UPDATE "Service"
SET "imageUrl" = 'https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png'
WHERE "imageUrl" IS NULL OR TRIM("imageUrl") = '';

ALTER TABLE "Service" ALTER COLUMN "imageUrl" SET NOT NULL;
