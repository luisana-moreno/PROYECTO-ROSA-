-- Migration to add Jornada and Observacion to Milk Production tables

-- Add columns to TTRPRODLOTE (Lote Production Header)
ALTER TABLE public.ttrprodlote
ADD COLUMN IF NOT EXISTS ttr_jornada character varying(20) DEFAULT 'AM',
ADD COLUMN IF NOT EXISTS ttr_observacion text;

-- Add columns to TTRPRODLECH (Individual Production Record)
ALTER TABLE public.ttrprodlech
ADD COLUMN IF NOT EXISTS ttr_observacion text;
