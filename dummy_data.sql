-- =====================================================
-- DUMMY DATA FOR TESTING - PROJECT ROSA
-- Respecting existing IDs for Razas, Colores, Etapas, Estados
-- =====================================================

BEGIN;

-- 1. LOTES (tmalotes)
INSERT INTO public.tmalotes (tma_nomlote) VALUES 
('Lote Producción A'),
('Lote Producción B'),
('Lote Seco'),
('Lote Mautas'),
('Lote Novillas');

-- 2. POTREROS (ttrpotreros)
-- Asumiendo tmaestpotre (1=Descanso, 2=Ocupado) y tmatipmante IDs genéricos
INSERT INTO public.tmaestpotre (tma_nomestp) VALUES ('Descanso'), ('Ocupado'), ('Mantenimiento') ON CONFLICT DO NOTHING;
INSERT INTO public.tmatipmante (tma_nomtipm) VALUES ('Limpieza'), ('Fertilización') ON CONFLICT DO NOTHING;

INSERT INTO public.ttrpotreros (ttr_codpotre, ttr_idestpot, ttr_descripc) VALUES 
('POT-001', 1, 'Potrero Entrada Norte'),
('POT-002', 2, 'Potrero Zona Baja'),
('POT-003', 1, 'Potrero El Samán'),
('POT-004', 3, 'Potrero La Laguna');

-- 3. EMPLEADOS (ttrempleado)
-- Necesitamos Cargos en tmaempleado primero
INSERT INTO public.tmaempleado (tma_nombrel) VALUES ('Veterinario'), ('Ordeñador'), ('Capataz') ON CONFLICT DO NOTHING;

INSERT INTO public.ttrempleado (ttr_nombrel, ttr_apellid, ttr_documen, ttr_telefon, ttr_idcargp, ttr_estado) VALUES 
('Juan', 'Pérez', '12345678', '04141234567', 1, 'ACTIVO'), -- Veterinario
('María', 'González', '87654321', '04129876543', 2, 'ACTIVO'), -- Ordeñador
('Carlos', 'Rodríguez', '11223344', '04241112233', 3, 'ACTIVO'); -- Capataz

-- 4. BOVINOS (ttrbovinoss)
-- Usando IDs de las imágenes:
-- Razas: 1-Holstein, 2-Carora, 4-Jersey, 19-Pardo Suizo, 20-Brahman, 22-Mestizo gir/holstein
-- Colores: 1-Negro y Blanco, 4-Marrón, 21-Blanco, 23-Rojo
-- Etapas: 1-Becerro, 5-Novilla, 6-Torete, 7-Vaca, 8-Toro
-- Estados: 3-Activo, 20-Vaca Seca, 17-En Tratamiento

INSERT INTO public.ttrbovinoss (ttr_numerobv, ttr_idrazabo, ttr_idcolorb, ttr_idetapav, ttr_idestadb, ttr_sexo, ttr_pesokilo, ttr_fecnacim, ttr_nombre) VALUES
-- Vacas Producción
(101, 1, 1, 7, 3, 'Hembra', 550.5, '2020-05-15', 'Lola'), -- Holstein, Negro y Blanco, Vaca, Activo
(102, 2, 21, 7, 3, 'Hembra', 520.0, '2021-02-20', 'Estrella'), -- Carora, Blanco, Vaca, Activo
(103, 4, 4, 7, 3, 'Hembra', 480.3, '2021-08-10', 'Canela'), -- Jersey, Marrón, Vaca, Activo
(104, 22, 1, 7, 20, 'Hembra', 530.0, '2020-11-05', 'Manchas'), -- Mestizo, Negro y Blanco, Vaca, Seca

-- Novillas y Mautas
(201, 19, 4, 5, 3, 'Hembra', 380.0, '2023-01-15', 'Princesa'), -- Pardo Suizo, Marrón, Novilla, Activo
(202, 1, 1, 3, 3, 'Hembra', 250.0, '2023-09-20', 'Panda'), -- Holstein, Negro y Blanco, Mauta, Activo

-- Toros y Toretes
(301, 20, 21, 8, 3, 'Macho', 750.0, '2019-06-30', 'Zeus'), -- Brahman, Blanco, Toro, Activo
(302, 2, 23, 6, 3, 'Macho', 400.0, '2023-03-12', 'Colorado'), -- Carora, Rojo, Torete, Activo

-- Becerros
(401, 1, 1, 1, 3, 'Hembra', 80.0, '2024-01-10', 'Lulú'), -- Holstein, Negro y Blanco, Becerro
(402, 20, 21, 1, 17, 'Macho', 85.0, '2024-01-15', 'Blanquito'); -- Brahman, Blanco, Becerro, En Tratamiento

-- 5. HISTORIAL LOTES (ttrhistbovlote)
INSERT INTO public.ttrhistbovlote (ttr_idbovino, ttr_idlote, ttr_fechaini) VALUES
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=101), 1, '2024-01-01'),
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=102), 1, '2024-01-01'),
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=103), 1, '2024-01-01'),
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=104), 3, '2024-01-01');

-- 6. PRODUCCIÓN DE LECHE (ttrprodlech)
-- Registros para las vacas activas
INSERT INTO public.ttrprodlech (ttr_idbovlec, ttr_idlote, ttr_fechapro, ttr_litrsprd) VALUES
-- Día 1
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=101), 1, CURRENT_DATE - 2, 12.5),
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=102), 1, CURRENT_DATE - 2, 10.0),
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=103), 1, CURRENT_DATE - 2, 14.2),
-- Día 2
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=101), 1, CURRENT_DATE - 1, 13.0),
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=102), 1, CURRENT_DATE - 1, 11.5),
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=103), 1, CURRENT_DATE - 1, 13.8);

-- 7. SANIDAD - PREÑEZ (ttrprenez)
-- Vaca Seca (104) preñada
INSERT INTO public.ttrprenez (ttr_idbovino, ttr_fechaini, ttr_fechaestp, ttr_estadopre, ttr_observa) VALUES
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=104), CURRENT_DATE - 200, CURRENT_DATE + 80, 'Confirmada', 'Preñez confirmada por palpación');

-- Novilla (201) inseminada recientemente
INSERT INTO public.ttrprenez (ttr_idbovino, ttr_fechaini, ttr_fechaestp, ttr_estadopre, ttr_observa) VALUES
((SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=201), CURRENT_DATE - 30, CURRENT_DATE + 250, 'Por Confirmar', 'Inseminación artificial exitosa');

-- 8. SANIDAD - VISITAS VETERINARIAS (ttrvisivete & ttrvisibovino)
-- Visita 1
WITH new_visit AS (
    INSERT INTO public.ttrvisivete (ttr_fechavis, ttr_veterina, ttr_motivovi, ttr_observa) 
    VALUES (CURRENT_DATE - 10, 'Dr. Juan Pérez', 'Chequeo General', 'Visita rutinaria mensual')
    RETURNING ttr_idvisvet
)
INSERT INTO public.ttrvisibovino (ttr_idvisvet, ttr_idbovino, ttr_diagnos, ttr_tratamie, ttr_estadore)
SELECT ttr_idvisvet, (SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=101), 'Sana', 'Vitaminas', 'Vacia' FROM new_visit
UNION ALL
SELECT ttr_idvisvet, (SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=402), 'Onfalitis leve', 'Curación local', NULL FROM new_visit;

-- Visita 2 (Hace 1 mes)
WITH new_visit_2 AS (
    INSERT INTO public.ttrvisivete (ttr_fechavis, ttr_veterina, ttr_motivovi, ttr_observa) 
    VALUES (CURRENT_DATE - 35, 'Dr. Juan Pérez', 'Palpación', 'Confirmación de preñez')
    RETURNING ttr_idvisvet
)
INSERT INTO public.ttrvisibovino (ttr_idvisvet, ttr_idbovino, ttr_diagnos, ttr_tratamie, ttr_estadore)
SELECT ttr_idvisvet, (SELECT ttr_idbovino FROM ttrbovinoss WHERE ttr_numerobv=201), 'Posible Preñez', NULL, 'Gestante' FROM new_visit_2;

COMMIT;
