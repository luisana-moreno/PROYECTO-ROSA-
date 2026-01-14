DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'ttrclienteee'
        AND column_name = 'ttr_activo'
    ) THEN
        ALTER TABLE "ttrclienteee" ADD COLUMN "ttr_activo" BOOLEAN DEFAULT TRUE;
    END IF;
END $$;
