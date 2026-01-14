-- Agregar columna fecha fin en tabla de mantenimiento histórico
ALTER TABLE IF EXISTS public.ttrmantepotre
    ADD COLUMN IF NOT EXISTS ttr_fechafin DATE;

-- Agregar columna fecha fin mantenimiento en tabla maestra de potreros (para consulta rápida)
ALTER TABLE IF EXISTS public.ttrpotreros
    ADD COLUMN IF NOT EXISTS ttr_fecfinmnt DATE;
