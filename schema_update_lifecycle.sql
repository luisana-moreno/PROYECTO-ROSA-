-- Asegurar estado 'En Recuperación' (ID 16 si es posible, o el siguiente disponible)
INSERT INTO TMAESTPOTRE (TMA_IDESTPO, TMA_NOMESTP)
VALUES (16, 'En Recuperación')
ON CONFLICT (TMA_IDESTPO) DO NOTHING;

-- Si ya existe con otro ID pero mismo nombre, no hacemos nada (el conflicto es por ID).
-- Si no existe el ID 16, se intenta insertar.
-- Nota: Si el ID 16 ya está ocupado por otra cosa, fallará o no hará nada si es conflicto de clave. 
-- Mejor usaremos un script seguro sin forzar ID si no es estrictamente necesario, 
-- pero el usuario mencionó "estado con id 16 es En Recuperacion". Intengamos forzarlo si está libre.

-- Agregar columnas a ttrrotacion
ALTER TABLE IF EXISTS public.ttrrotacion
    ADD COLUMN IF NOT EXISTS ttr_dias_duracion INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS ttr_fechafin_est DATE,
    ADD COLUMN IF NOT EXISTS ttr_fechafin_real DATE;
