-- Ensure every row has a description, then enforce NOT NULL
UPDATE "Service"
SET "description" = CASE "name"
  WHEN 'Corte de Cabelo' THEN 'Estilo personalizado com as últimas tendências.'
  WHEN 'Barba' THEN 'Modelagem completa para destacar sua masculinidade.'
  WHEN 'Pézinho' THEN 'Acabamento perfeito para um visual renovado.'
  WHEN 'Sobrancelha' THEN 'Expressão acentuada com modelagem precisa.'
  WHEN 'Massagem' THEN 'Relaxe com uma massagem revigorante.'
  WHEN 'Hidratação' THEN 'Hidratação profunda para cabelo e barba.'
  ELSE COALESCE("description", 'Serviço profissional oferecido pela nossa equipe.')
END;

UPDATE "Service"
SET "description" = 'Serviço profissional oferecido pela nossa equipe.'
WHERE "description" IS NULL;

ALTER TABLE "Service" ALTER COLUMN "description" SET NOT NULL;
