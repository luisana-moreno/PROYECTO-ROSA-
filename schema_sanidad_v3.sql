-- =====================================================
-- MIGRACIÓN: CONTROLES SANITARIOS POR LOTE
-- Sistema de Controles por Lote o Individual
-- =====================================================

BEGIN;

-- 1. Agregar columnas para soporte de lotes
ALTER TABLE ttrcontrolsanit
ADD COLUMN ttr_idlote INTEGER,
ADD COLUMN ttr_aplicacion VARCHAR(20) DEFAULT 'INDIVIDUAL';

-- 2. Agregar foreign key a lotes
ALTER TABLE ttrcontrolsanit
ADD CONSTRAINT fk_controlsanit_lote FOREIGN KEY (ttr_idlote)
    REFERENCES tmalotes (tma_idlote)
    ON UPDATE NO ACTION
    ON DELETE SET NULL;

-- 3. Validación: Aplicación por lote requiere ID de lote
-- Aplicación individual requiere ID de bovino
ALTER TABLE ttrcontrolsanit
ADD CONSTRAINT chk_aplicacion_valida CHECK (
  (ttr_aplicacion = 'LOTE' AND ttr_idlote IS NOT NULL) OR
  (ttr_aplicacion = 'INDIVIDUAL' AND ttr_idbovino IS NOT NULL)
);

-- 4. Índice para búsquedas por lote
CREATE INDEX IF NOT EXISTS idx_controlsanit_lote ON ttrcontrolsanit(ttr_idlote);
CREATE INDEX IF NOT EXISTS idx_controlsanit_aplicacion ON ttrcontrolsanit(ttr_aplicacion);

-- 5. Comentarios
COMMENT ON COLUMN ttrcontrolsanit.ttr_idlote IS 'ID del lote (solo para aplicación por lote)';
COMMENT ON COLUMN ttrcontrolsanit.ttr_aplicacion IS 'Tipo de aplicación: INDIVIDUAL o LOTE';

COMMIT;

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- \d+ ttrcontrolsanit
-- SELECT * FROM ttrcontrolsanit WHERE ttr_aplicacion = 'LOTE';
