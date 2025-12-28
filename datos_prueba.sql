-- =====================================================
-- DATOS DE PRUEBA FICTICIOS PARA SISTEMA DE GESTIÓN GANADERA
-- =====================================================
-- Este archivo contiene datos de prueba para todas las tablas
-- EXCEPTO las tablas de usuarios (ttrusuarioo, tmarolusuar)
-- =====================================================

BEGIN;

-- =====================================================
-- 1. TABLAS MAESTRAS (CATÁLOGOS)
-- =====================================================

-- Razas de Bovinos
INSERT INTO public.tmarazabovi (tma_nomraza) VALUES 
    ('Holstein'),
    ('Jersey'),
    ('Pardo Suizo'),
    ('Brahman'),
    ('Carora'),
    ('Mestizo')
ON CONFLICT DO NOTHING;

-- Colores de Bovinos
INSERT INTO public.tmacolbovin (tma_nomcolb) VALUES 
    ('Blanco y Negro'),
    ('Marrón'),
    ('Beige'),
    ('Gris'),
    ('Blanco'),
    ('Negro'),
    ('Rojo')
ON CONFLICT DO NOTHING;

-- Etapas de Bovinos
INSERT INTO public.tmaetabovin (tma_nometab) VALUES 
    ('Ternero'),
    ('Novillo'),
    ('Vaca'),
    ('Toro'),
    ('Vaquilla')
ON CONFLICT DO NOTHING;

-- Estados de Bovinos
INSERT INTO public.tmaestbovin (tma_nomestb) VALUES 
    ('Activo'),
    ('Vendido'),
    ('Muerto'),
    ('En Tratamiento'),
    ('En Cuarentena')
ON CONFLICT DO NOTHING;

-- Cargos de Empleados
INSERT INTO public.tmaempleado (tma_nombrel) VALUES 
    ('Veterinario'),
    ('Ordeñador'),
    ('Encargado de Potreros'),
    ('Administrador de Finca'),
    ('Operario General')
ON CONFLICT DO NOTHING;

-- Lotes
INSERT INTO public.tmalotes (tma_nomlote) VALUES 
    ('Lote A - Producción Alta'),
    ('Lote B - Producción Media'),
    ('Lote C - Secas'),
    ('Lote D - Novillas'),
    ('Lote E - Terneros')
ON CONFLICT DO NOTHING;

-- Categorías de Insumos
INSERT INTO public.tmacatinsum (tma_nomcati) VALUES 
    ('Medicamentos'),
    ('Vacunas'),
    ('Alimentos'),
    ('Suplementos'),
    ('Equipos'),
    ('Productos de Limpieza')
ON CONFLICT DO NOTHING;

-- Tipos de Movimiento de Inventario
INSERT INTO public.tmatipmovim (tma_nomtipm) VALUES 
    ('Entrada'),
    ('Salida'),
    ('Ajuste Positivo'),
    ('Ajuste Negativo'),
    ('Devolución')
ON CONFLICT DO NOTHING;

-- Tipos de Pago
INSERT INTO public.tmatippagos (tma_nomtipp) VALUES 
    ('Efectivo'),
    ('Transferencia'),
    ('Cheque'),
    ('Pago Móvil'),
    ('Tarjeta de Débito'),
    ('Tarjeta de Crédito')
ON CONFLICT DO NOTHING;

-- Tipos de Venta
INSERT INTO public.tmatipventa (tma_nomtipv) VALUES 
    ('Contado'),
    ('Crédito 15 días'),
    ('Crédito 30 días'),
    ('Crédito 60 días')
ON CONFLICT DO NOTHING;

-- Estados de Factura
INSERT INTO public.tmaestfactu (tma_nomestf) VALUES 
    ('Pendiente'),
    ('Pagada'),
    ('Vencida'),
    ('Cancelada'),
    ('Parcialmente Pagada')
ON CONFLICT DO NOTHING;

-- Tipos de Comprobante
INSERT INTO public.tmatipcomp (tma_nomtipc) VALUES 
    ('Factura'),
    ('Nota de Entrega'),
    ('Recibo'),
    ('Guía de Despacho')
ON CONFLICT DO NOTHING;

-- Estados de Potrero
INSERT INTO public.tmaestpotre (tma_nomestp) VALUES 
    ('Disponible'),
    ('Ocupado'),
    ('En Mantenimiento'),
    ('En Descanso')
ON CONFLICT DO NOTHING;

-- Tipos de Mantenimiento de Potrero
INSERT INTO public.tmatipmante (tma_nomtipm) VALUES 
    ('Riego'),
    ('Fumigación'),
    ('Fertilización'),
    ('Reparación de Cercas'),
    ('Limpieza')
ON CONFLICT DO NOTHING;

-- Tratamientos
INSERT INTO public.tmatratamen (tma_nomtrat) VALUES 
    ('Antibiótico'),
    ('Antiparasitario'),
    ('Vitaminas'),
    ('Calcio'),
    ('Suero'),
    ('Mastitis')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 2. EMPLEADOS
-- =====================================================

INSERT INTO public.ttrempleado (ttr_nombrel, ttr_apellid, ttr_documen, ttr_fecnaci, ttr_telefon, ttr_direcci, ttr_feccont, ttr_idcargp, ttr_feccrea, ttr_fecupda) VALUES 
    ('Carlos', 'Rodríguez', '12345678', '1985-03-15', '04121234567', 'Calle Principal, Barquisimeto', '2020-01-15', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('María', 'González', '23456789', '1990-07-22', '04149876543', 'Av. Libertador, Barquisimeto', '2021-03-10', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('José', 'Pérez', '34567890', '1988-11-05', '04167654321', 'Urbanización El Recreo, Barquisimeto', '2019-06-20', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Ana', 'Martínez', '45678901', '1992-02-18', '04245678901', 'Sector La Ruezga, Barquisimeto', '2022-01-05', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Luis', 'Hernández', '56789012', '1987-09-30', '04261234567', 'Barrio Unión, Barquisimeto', '2020-08-12', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (ttr_documen) DO NOTHING;

-- =====================================================
-- 3. CLIENTES
-- =====================================================

INSERT INTO public.ttrclienteee (ttr_nomcompa, ttr_nombrecl, ttr_apellido, ttr_documecl, ttr_telefono, ttr_direccio, ttr_correocl) VALUES 
    ('Lácteos El Valle C.A.', 'Pedro', 'Ramírez', '11111111', '04121111111', 'Zona Industrial, Barquisimeto', 'pedro.ramirez@lacteoselvalle.com'),
    ('Distribuidora La Granja', 'Carmen', 'Silva', '22222222', '04142222222', 'Centro Comercial Trinitarias, Barquisimeto', 'carmen.silva@lagranja.com'),
    ('Quesería Artesanal Los Andes', 'Roberto', 'Díaz', '33333333', '04163333333', 'Carrera 20, Barquisimeto', 'roberto.diaz@queseriandes.com'),
    ('Supermercados La Canasta', 'Elena', 'Torres', '44444444', '04244444444', 'Av. Venezuela, Barquisimeto', 'elena.torres@lacanasta.com'),
    ('Panadería y Pastelería Don Pan', 'Miguel', 'Vargas', '55555555', '04265555555', 'Calle 50, Barquisimeto', 'miguel.vargas@donpan.com')
ON CONFLICT (ttr_documecl) DO NOTHING;

-- =====================================================
-- 4. BOVINOS
-- =====================================================

INSERT INTO public.ttrbovinoss (ttr_numerobv, ttr_idrazabo, ttr_fecnacim, ttr_idcolorb, ttr_pesokilo, ttr_idetapav, ttr_idestadb) VALUES 
    (1001, 1, '2020-03-15', 1, 550.5, 3, 1),  -- Holstein, Vaca
    (1002, 1, '2019-08-22', 1, 580.0, 3, 1),  -- Holstein, Vaca
    (1003, 2, '2021-01-10', 2, 420.3, 3, 1),  -- Jersey, Vaca
    (1004, 3, '2020-11-05', 3, 510.8, 3, 1),  -- Pardo Suizo, Vaca
    (1005, 1, '2022-05-18', 1, 380.2, 5, 1),  -- Holstein, Vaquilla
    (1006, 4, '2019-06-30', 4, 650.0, 4, 1),  -- Brahman, Toro
    (1007, 5, '2021-09-12', 5, 490.5, 3, 1),  -- Carora, Vaca
    (1008, 6, '2023-02-20', 6, 150.0, 1, 1),  -- Mestizo, Ternero
    (1009, 1, '2020-07-08', 1, 560.0, 3, 1),  -- Holstein, Vaca
    (1010, 2, '2021-04-25', 2, 430.0, 3, 1),  -- Jersey, Vaca
    (1011, 1, '2022-11-15', 1, 320.0, 2, 1),  -- Holstein, Novillo
    (1012, 3, '2020-12-03', 3, 520.0, 3, 1),  -- Pardo Suizo, Vaca
    (1013, 1, '2023-01-08', 1, 140.0, 1, 1),  -- Holstein, Ternero
    (1014, 5, '2021-06-20', 5, 480.0, 3, 1),  -- Carora, Vaca
    (1015, 1, '2020-09-14', 1, 570.0, 3, 1)   -- Holstein, Vaca
ON CONFLICT (ttr_numerobv) DO NOTHING;

-- =====================================================
-- 5. POTREROS
-- =====================================================

INSERT INTO public.ttrpotreros (ttr_codpotre, ttr_idestpot, ttr_idtipman, ttr_fechamnt, ttr_descripc) VALUES 
    ('POT-A1', 2, 1, '2024-12-01', 'Potrero principal con sistema de riego automático'),
    ('POT-A2', 2, 2, '2024-11-15', 'Potrero secundario, fumigado recientemente'),
    ('POT-B1', 1, NULL, NULL, 'Potrero en descanso, listo para rotación'),
    ('POT-B2', 3, 4, '2024-12-20', 'Potrero en mantenimiento, reparación de cercas'),
    ('POT-C1', 2, 3, '2024-11-28', 'Potrero fertilizado, alta producción de pasto'),
    ('POT-C2', 1, NULL, NULL, 'Potrero disponible para lote de terneros')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 6. ASIGNACIÓN BOVINOS-LOTES-POTREROS
-- =====================================================

INSERT INTO public.ttrbovlotpotr (ttr_idbovino, ttr_idlote, ttr_idpotrer, ttr_fechaini, ttr_fechafin, ttr_fechcrea, ttr_fechupda) VALUES 
    (1, 1, 1, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, 1, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 1, 1, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 2, 2, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 2, 2, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 2, 2, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 1, 1, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 1, 1, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (12, 2, 2, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (14, 2, 2, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (15, 1, 1, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 5, 6, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (11, 4, 5, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (13, 5, 6, '2024-12-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 7. PRODUCCIÓN DE LECHE POR LOTE
-- =====================================================

INSERT INTO public.ttrprodlote (ttr_idlote, ttr_fechapro, ttr_totlitrs, ttr_jornada, ttr_observacion, ttr_fechcrea, ttr_fechupda) VALUES 
    (1, '2024-12-20', 285.5, 'AM', 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, '2024-12-20', 270.3, 'PM', 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, '2024-12-21', 290.0, 'AM', 'Incremento en producción', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, '2024-12-21', 275.8, 'PM', 'Producción estable', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '2024-12-20', 180.2, 'AM', 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '2024-12-20', 175.5, 'PM', 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '2024-12-21', 185.0, 'AM', 'Leve incremento', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '2024-12-21', 178.3, 'PM', 'Producción estable', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 8. PRODUCCIÓN DE LECHE INDIVIDUAL
-- =====================================================

INSERT INTO public.ttrprodlech (ttr_idbovlec, ttr_idlote, ttr_idprolot, ttr_fechapro, ttr_litrsprd, ttr_observacion, ttr_fechcrea, ttr_fechupda) VALUES 
    -- Producción del 2024-12-20 AM (Lote 1)
    (1, 1, 1, '2024-12-20', 38.5, 'Excelente producción', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, 1, '2024-12-20', 42.0, 'Producción alta', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 1, 1, '2024-12-20', 28.0, 'Producción normal para Jersey', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 1, 1, '2024-12-20', 40.5, 'Buena producción', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 1, 1, '2024-12-20', 30.0, 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (15, 1, 1, '2024-12-20', 41.0, 'Producción estable', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Producción del 2024-12-20 PM (Lote 1)
    (1, 1, 2, '2024-12-20', 36.0, 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, 2, '2024-12-20', 39.5, 'Buena producción', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 1, 2, '2024-12-20', 26.5, 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 1, 2, '2024-12-20', 38.0, 'Producción estable', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 1, 2, '2024-12-20', 28.8, 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (15, 1, 2, '2024-12-20', 39.0, 'Producción estable', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Producción del 2024-12-20 AM (Lote 2)
    (4, 2, 5, '2024-12-20', 35.2, 'Buena producción', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 2, 5, '2024-12-20', 32.0, 'Producción normal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 2, 5, '2024-12-20', 38.5, 'Excelente producción', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (12, 2, 5, '2024-12-20', 36.0, 'Producción estable', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (14, 2, 5, '2024-12-20', 38.5, 'Buena producción', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 9. INSUMOS
-- =====================================================

INSERT INTO public.ttrinsumoso (ttr_idcatein, ttr_nominsum, ttr_cantidad, ttr_fechaven) VALUES 
    (1, 'Antibiótico Penicilina 100ml', 50, '2025-06-30'),
    (1, 'Antiparasitario Ivermectina 500ml', 30, '2025-08-15'),
    (2, 'Vacuna Aftosa Triple (Dosis)', 200, '2025-12-31'),
    (2, 'Vacuna Brucelosis (Dosis)', 100, '2025-10-20'),
    (3, 'Concentrado Proteico 50kg', 100, '2025-03-30'),
    (3, 'Melaza 20L', 50, '2025-02-28'),
    (4, 'Suplemento Mineral 25kg', 80, '2026-01-15'),
    (4, 'Vitaminas ADE 100ml', 40, '2025-09-30'),
    (5, 'Ordeñadora Mecánica', 3, NULL),
    (6, 'Desinfectante Cloro 5L', 60, '2025-07-20')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 10. MOVIMIENTOS DE INVENTARIO
-- =====================================================

INSERT INTO public.ttrmovimien (ttr_idinsumo, ttr_idtipmov, ttr_cantimov, ttr_fechamov, ttr_fechcrea, ttr_fechupda) VALUES 
    (1, 1, 50, '2024-11-01 10:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 2, 5, '2024-11-15 14:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, 30, '2024-11-05 09:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 1, 200, '2024-10-20 11:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 2, 50, '2024-11-10 08:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 1, 100, '2024-12-01 07:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 2, 20, '2024-12-15 16:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 1, 80, '2024-11-25 10:30:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 11. ASISTENCIA DE EMPLEADOS
-- =====================================================

INSERT INTO public.ttrasistenc (ttr_idemplea, ttr_horaentr, ttr_horasali, ttr_horatrab, ttr_fechaasi, ttr_idtipasi) VALUES 
    (1, '07:00:00', '15:00:00', '08:00:00', '2024-12-20', 1),
    (2, '06:30:00', '14:30:00', '08:00:00', '2024-12-20', 1),
    (3, '07:00:00', '15:00:00', '08:00:00', '2024-12-20', 1),
    (4, '08:00:00', '16:00:00', '08:00:00', '2024-12-20', 1),
    (5, '06:00:00', '14:00:00', '08:00:00', '2024-12-20', 1),
    (1, '07:00:00', '15:00:00', '08:00:00', '2024-12-21', 1),
    (2, '06:30:00', '14:30:00', '08:00:00', '2024-12-21', 1),
    (3, NULL, NULL, NULL, '2024-12-21', 2),
    (4, '08:00:00', '16:00:00', '08:00:00', '2024-12-21', 1),
    (5, '06:00:00', '14:00:00', '08:00:00', '2024-12-21', 1)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 12. CONTROL DE SANIDAD - PLANES DE VACUNACIÓN
-- =====================================================

INSERT INTO public.ttrplanvacun (ttr_nomplan, ttr_idtipvac, ttr_fechaini, ttr_fechafin, ttr_intervalo, ttr_numdosis, ttr_descripcion, ttr_activo) VALUES 
    ('Plan Aftosa 2024-2025', 1, '2024-11-01', '2024-12-31', 180, 2, 'Campaña de vacunación contra Aftosa Triple', true),
    ('Plan Brucelosis Novillas 2024', 5, '2024-10-01', '2024-11-30', NULL, 1, 'Vacunación de novillas contra Brucelosis', true),
    ('Plan Rabia 2024', 6, '2024-09-01', '2024-10-31', NULL, 1, 'Campaña preventiva contra Rabia', false)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 13. VACUNACIONES APLICADAS
-- =====================================================

INSERT INTO public.ttrvacunacion (ttr_idbovino, ttr_idplanva, ttr_idtipvac, ttr_fechaapl, ttr_proxfech, ttr_numdosis, ttr_idempldo, ttr_lote, ttr_observa) VALUES 
    (1, 1, 1, '2024-11-05', '2025-05-05', 1, 1, 'LOTE-AFT-2024-001', 'Primera dosis aplicada correctamente'),
    (2, 1, 1, '2024-11-05', '2025-05-05', 1, 1, 'LOTE-AFT-2024-001', 'Primera dosis aplicada correctamente'),
    (3, 1, 1, '2024-11-05', '2025-05-05', 1, 1, 'LOTE-AFT-2024-001', 'Primera dosis aplicada correctamente'),
    (4, 1, 1, '2024-11-06', '2025-05-06', 1, 1, 'LOTE-AFT-2024-001', 'Primera dosis aplicada correctamente'),
    (5, 2, 5, '2024-10-15', NULL, 1, 1, 'LOTE-BRU-2024-002', 'Vacunación de vaquilla'),
    (7, 1, 1, '2024-11-06', '2025-05-06', 1, 1, 'LOTE-AFT-2024-001', 'Primera dosis aplicada correctamente'),
    (9, 1, 1, '2024-11-05', '2025-05-05', 1, 1, 'LOTE-AFT-2024-001', 'Primera dosis aplicada correctamente'),
    (10, 1, 1, '2024-11-05', '2025-05-05', 1, 1, 'LOTE-AFT-2024-001', 'Primera dosis aplicada correctamente')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 14. CONTROL DE PREÑEZ
-- =====================================================

INSERT INTO public.ttrprenez (ttr_idbovino, ttr_fechaini, ttr_fechaestp, ttr_fechareal, ttr_estadopre, ttr_observa) VALUES 
    (1, '2024-03-15', '2024-12-20', NULL, 'En proceso', 'Preñez confirmada por palpación'),
    (2, '2024-04-10', '2025-01-15', NULL, 'En proceso', 'Preñez confirmada por ultrasonido'),
    (3, '2024-02-20', '2024-11-25', '2024-11-28', 'Finalizada', 'Parto normal, ternero saludable'),
    (9, '2024-05-05', '2025-02-10', NULL, 'En proceso', 'Preñez confirmada'),
    (10, '2024-01-15', '2024-10-20', '2024-10-22', 'Finalizada', 'Parto asistido, ternero saludable')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 15. TRATAMIENTOS DE PREÑEZ
-- =====================================================

INSERT INTO public.ttrtratprenez (ttr_idprenez, ttr_idtratam, ttr_fechaapl, ttr_tipotrat, ttr_proxfech, ttr_dosisnum, ttr_observa) VALUES 
    (1, 4, '2024-11-15', 'Calcio', NULL, 1, 'Suplemento de calcio pre-parto'),
    (2, 5, '2024-12-01', 'Suero', NULL, 1, 'Hidratación preventiva'),
    (3, 6, '2024-11-30', 'Mastitis', NULL, 1, 'Tratamiento post-parto')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 16. VISITAS VETERINARIAS
-- =====================================================

INSERT INTO public.ttrvisivete (ttr_fechavis, ttr_proxfech, ttr_veterina, ttr_telefono, ttr_motivovi, ttr_observa) VALUES 
    ('2024-10-15', '2025-01-15', 'Dr. Alberto Méndez', '04121112233', 'Chequeo reproductivo trimestral', 'Revisión general del hato, todo en orden'),
    ('2024-11-20', '2025-02-20', 'Dra. Patricia Rojas', '04149998877', 'Control de vacunación', 'Aplicación de vacunas y revisión de registros'),
    ('2024-12-10', '2025-03-10', 'Dr. Alberto Méndez', '04121112233', 'Emergencia - Mastitis', 'Tratamiento de casos de mastitis en lote A')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 17. BOVINOS REVISADOS EN VISITAS
-- =====================================================

INSERT INTO public.ttrvisibovino (ttr_idvisvet, ttr_idbovino, ttr_diagnos, ttr_tratamie, ttr_estadore, ttr_observa) VALUES 
    (1, 1, 'Gestante confirmada', 'Suplemento vitamínico', 'Gestante', 'Buen estado general'),
    (1, 2, 'Gestante confirmada', 'Suplemento vitamínico', 'Gestante', 'Buen estado general'),
    (1, 3, 'Vacía', 'Ninguno', 'Vacía', 'Apta para inseminación'),
    (2, 1, 'Saludable', 'Vacuna Aftosa', 'Gestante', 'Vacunación completada'),
    (2, 2, 'Saludable', 'Vacuna Aftosa', 'Gestante', 'Vacunación completada'),
    (3, 1, 'Mastitis leve', 'Antibiótico', 'Post-parto', 'Tratamiento iniciado'),
    (3, 9, 'Saludable', 'Ninguno', 'Gestante', 'Buen estado')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 18. HISTORIAL DE BOVINOS EN LOTES
-- =====================================================

INSERT INTO public ttrhistbovlote (ttr_idbovino, ttr_idlote, ttr_fechaini, ttr_fechafin, ttr_motivo, ttr_observa) VALUES 
    (1, 3, '2024-09-01', '2024-11-30', 'Secado', 'Periodo de descanso antes del parto'),
    (1, 1, '2024-12-01', NULL, 'Ingreso a producción', 'Reintegrada al lote de alta producción'),
    (3, 1, '2024-01-15', '2024-10-15', 'Producción normal', 'Periodo de lactancia'),
    (3, 3, '2024-10-16', '2024-11-20', 'Secado pre-parto', 'Preparación para parto'),
    (5, 4, '2024-06-01', '2024-11-30', 'Desarrollo', 'Vaquilla en crecimiento'),
    (5, 2, '2024-12-01', NULL, 'Ingreso a producción', 'Primera lactancia')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 19. ROTACIÓN DE POTREROS
-- =====================================================

INSERT INTO public.ttrrotacion (ttr_idlote, ttr_idpotrer, ttr_fecha, ttr_turno, ttr_alturain, ttr_alturaout, ttr_observa) VALUES 
    (1, 1, '2024-12-20', 'AM', 35.5, 18.2, 'Buen consumo de pasto'),
    (1, 1, '2024-12-20', 'PM', 18.2, 12.5, 'Consumo normal'),
    (2, 2, '2024-12-20', 'AM', 32.0, 16.8, 'Consumo adecuado'),
    (2, 2, '2024-12-20', 'PM', 16.8, 11.0, 'Consumo normal'),
    (1, 1, '2024-12-21', 'AM', 35.0, 17.5, 'Buen consumo'),
    (2, 2, '2024-12-21', 'AM', 31.5, 16.2, 'Consumo normal')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 20. MANTENIMIENTO DE POTREROS
-- =====================================================

INSERT INTO public.ttrmantepotre (ttr_idpotrer, ttr_tipo, ttr_fecha, ttr_producto, ttr_cantidad, ttr_observa, ttr_responsable) VALUES 
    (1, 'Riego', '2024-12-01', 'Agua', 5000.00, 'Riego automático programado', 3),
    (2, 'Fumigación', '2024-11-15', 'Herbicida Glifosato', 15.50, 'Control de malezas', 3),
    (5, 'Fertilización', '2024-11-28', 'Urea 46%', 200.00, 'Fertilización para mejorar producción de pasto', 3),
    (4, 'Cercas', '2024-12-20', 'Alambre de púas', 150.00, 'Reparación de cercas perimetrales', 5),
    (1, 'Riego', '2024-12-15', 'Agua', 5000.00, 'Riego automático programado', 3)
ON CONFLICT DO NOTHING;

COMMIT;

-- =====================================================
-- FIN DEL SCRIPT DE DATOS DE PRUEBA
-- =====================================================
-- Total de registros insertados aproximadamente: 250+
-- Tablas pobladas: 20 (excluyendo tablas de usuarios)
-- =====================================================
