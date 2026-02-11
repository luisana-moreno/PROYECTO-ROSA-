-- =====================================================
-- SCRIPT PARA BORRADO DE DATOS (LIMPIEZA) - PROJECT ROSA
-- Borra datos de tablas transaccionales (ttr_) excepto usuarios.
-- Reinicia los contadores (IDENTITY) automáticamente.
-- Mantiene tablas maestras (tma_) y configuración.
-- =====================================================

BEGIN;

-- TRUNCATE COMPLETO CON CASCADE PARA LIMPIAR REFERENCIAS
-- Se listan todas las tablas ttr_ excepto ttrusuarioo
TRUNCATE TABLE 
    public.ttrdetfactura,
    public.ttrfacturas,
    public.ttrvisibovino,
    public.ttrvisivete,
    public.ttrtratprenez,
    public.ttrprenez,
    public.ttrvacunacion,
    public.ttrplanvacun,
    public.ttrregmedbovinos,
    public.ttrregmedic,
    public.ttrprodlech,
    public.ttrprodLOTE,
    public.ttrhistbovlote,
    public.ttrbovlotpotr,
    public.ttrrotacion,
    public.ttrmantepotre,
    public.ttrpotreros,
    public.ttrpaginsum,
    public.ttrnominass,
    public.ttrasistenc,
    public.ttregresoss,
    public.ttrmovimien,
    public.ttrinsumoso,
    public.ttrclienteee,
    public.ttrempleado, -- Si consideras empleados como datos maestros, quita esta línea.
    public.ttrbovinoss,
    public.ttrlotpotr
RESTART IDENTITY CASCADE;

COMMIT;

-- Nota:
-- RESTART IDENTITY: Reinicia las secuencias autoincrementables a 1.
-- CASCADE: Borra también datos en otras tablas que tengan claves foráneas apuntando a estas (aunque aquí ya están casi todas incluidas).
