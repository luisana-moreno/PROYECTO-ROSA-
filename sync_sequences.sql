-- =====================================================
-- SCRIPT PARA SINCRONIZAR SECUENCIAS (AUTOINCREMENTALES)
-- Ejecutar después de insertar datos manualmente con IDs específicos
-- =====================================================

-- 1. BOVINOS
SELECT setval(pg_get_serial_sequence('ttrbovinoss', 'ttr_idbovino'), COALESCE(MAX(ttr_idbovino), 1)) FROM ttrbovinoss;

-- 2. EMPLEADOS
SELECT setval(pg_get_serial_sequence('ttrempleado', 'ttr_idemplo'), COALESCE(MAX(ttr_idemplo), 1)) FROM ttrempleado;

-- 3. LOTES
SELECT setval(pg_get_serial_sequence('tmalotes', 'tma_idlote'), COALESCE(MAX(tma_idlote), 1)) FROM tmalotes;

-- 4. POTREROS
SELECT setval(pg_get_serial_sequence('ttrpotreros', 'ttr_idpotrer'), COALESCE(MAX(ttr_idpotrer), 1)) FROM ttrpotreros;

-- 5. USUARIOS
SELECT setval(pg_get_serial_sequence('ttrusuarioo', 'ttr_idusuar'), COALESCE(MAX(ttr_idusuar), 1)) FROM ttrusuarioo;

-- 6. PRODUCCIÓN LECHE INDIVIDUAL
SELECT setval(pg_get_serial_sequence('ttrprodlech', 'ttr_idprodlc'), COALESCE(MAX(ttr_idprodlc), 1)) FROM ttrprodlech;

-- 7. PRODUCCIÓN LECHE LOTE
SELECT setval(pg_get_serial_sequence('ttrprodLOTE', 'ttr_idprolot'), COALESCE(MAX(ttr_idprolot), 1)) FROM ttrprodLOTE;

-- 8. PREÑEZ
SELECT setval(pg_get_serial_sequence('ttrprenez', 'ttr_idprenez'), COALESCE(MAX(ttr_idprenez), 1)) FROM ttrprenez;

-- 9. VISITAS VETERINARIAS
SELECT setval(pg_get_serial_sequence('ttrvisivete', 'ttr_idvisvet'), COALESCE(MAX(ttr_idvisvet), 1)) FROM ttrvisivete;

-- 10. DETALLE VISITAS
SELECT setval(pg_get_serial_sequence('ttrvisibovino', 'ttr_idvisbov'), COALESCE(MAX(ttr_idvisbov), 1)) FROM ttrvisibovino;

-- 11. FACTURAS
SELECT setval(pg_get_serial_sequence('ttrfacturas', 'ttr_idfactur'), COALESCE(MAX(ttr_idfactur), 1)) FROM ttrfacturas;

-- 12. CLIENTES
SELECT setval(pg_get_serial_sequence('ttrclienteee', 'ttr_idclient'), COALESCE(MAX(ttr_idclient), 1)) FROM ttrclienteee;

-- 13. INSUMOS
SELECT setval(pg_get_serial_sequence('ttrinsumoso', 'ttr_idinsumo'), COALESCE(MAX(ttr_idinsumo), 1)) FROM ttrinsumoso;

-- Tablas Maestras (Catálogos)
SELECT setval(pg_get_serial_sequence('tmarazabovi', 'tma_idrazab'), COALESCE(MAX(tma_idrazab), 1)) FROM tmarazabovi;
SELECT setval(pg_get_serial_sequence('tmacolbovin', 'tma_idcolbo'), COALESCE(MAX(tma_idcolbo), 1)) FROM tmacolbovin;
SELECT setval(pg_get_serial_sequence('tmaetabovin', 'tma_idetabo'), COALESCE(MAX(tma_idetabo), 1)) FROM tmaetabovin;
SELECT setval(pg_get_serial_sequence('tmaestbovin', 'tma_idestbo'), COALESCE(MAX(tma_idestbo), 1)) FROM tmaestbovin;
