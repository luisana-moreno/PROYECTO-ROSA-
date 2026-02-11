import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CAlert,
  CButtonGroup,
  CPagination,
  CPaginationItem,
  CProgress,
  CProgressBar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilTrash,
  cilFilter,
  cilCheckCircle,
  cilCalendar,
  cilMedicalCross,
  cilBaby,
  cilWarning,
  cilBell,
} from '@coreui/icons'
import {
  getPreneces,
  getPrenecesActivas,
  createPrenez,
  updatePrenez,
  deletePrenez,
  agregarTratamientoMastitisAutomatico,
  agregarTratamientosPostParto,
  getAlertasSecado,
  confirmarSecado,
} from '../../../../api/sanidadService'
import { cattleService } from '../../../../api/cattleService'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../hooks/usePagination'
import { useCattle } from '../../cattle/hooks/useCattle'
import AddCattleModal from '../../cattle/components/AddCattleModal'

const PrenezIndex = () => {
  const [preneces, setPreneces] = useState([])
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(preneces, 10)
  const [bovinos, setBovinos] = useState([])
  const [alertasSecado, setAlertasSecado] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showMastitisModal, setShowMastitisModal] = useState(false)
  const [showPartoModal, setShowPartoModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSecadoModal, setShowSecadoModal] = useState(false)
  const [selectedPrenez, setSelectedPrenez] = useState(null)
  const [selectedSecado, setSelectedSecado] = useState(null)
  const [prenezToDelete, setPrenezToDelete] = useState(null)
  const [filter, setFilter] = useState('activas')
  const [loading, setLoading] = useState(false)

  // Hooks de useCattle para el registro de crías
  const {
    visible: showAddCalfModal,
    setVisible: setShowAddCalfModal,
    addCattleForm,
    setAddCattleForm,
    handleAddCattle,
    razas,
    colores,
    etapas,
    estados,
    males,
    females,
  } = useCattle()

  const [formData, setFormData] = useState({
    idBovino: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaEstimadaParto: '',
    estado: 'Confirmada',
    observaciones: '',
  })

  const [mastitisData, setMastitisData] = useState({
    fechaInicio: new Date().toISOString().split('T')[0],
  })

  const [partoData, setPartoData] = useState({
    fechaParto: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    loadData()
  }, [filter])

  const loadData = async () => {
    try {
      setLoading(true)
      let prenecesData

      if (filter === 'activas') {
        prenecesData = await getPrenecesActivas()
      } else {
        prenecesData = await getPreneces()
      }

      const [bovinosData, secadoData] = await Promise.all([
        cattleService.getAllCattle(),
        getAlertasSecado().catch(() => []),
      ])

      setPreneces(prenecesData)
      setBovinos(bovinosData)
      setAlertasSecado(secadoData)
    } catch (error) {
      console.error('Error al cargar datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createPrenez(formData)
      setShowModal(false)
      loadData()
      resetForm()
      toast.success('Preñez registrada exitosamente')
    } catch (error) {
      console.error('Error al crear preñez:', error)
      toast.error('Error al crear preñez: ' + error.message)
    }
  }

  const handleAgregarMastitis = async () => {
    try {
      setLoading(true)
      await agregarTratamientoMastitisAutomatico(
        selectedPrenez.ttr_idprenez,
        mastitisData.fechaInicio,
      )
      toast.success('Tratamiento de Mastitis programado correctamente.')
      setShowMastitisModal(false)
      setMastitisData({ fechaInicio: new Date().toISOString().split('T')[0] })
      loadData()
    } catch (error) {
      console.error('Error al agregar tratamiento de Mastitis:', error)
      toast.error('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  /* Estado para el modal de éxito */
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleRegistrarParto = async () => {
    try {
      setLoading(true)
      const result = await agregarTratamientosPostParto(
        selectedPrenez.ttr_idprenez,
        partoData.fechaParto,
      )

      setSuccessMessage({
        title: '¡Parto Registrado Exitosamente!',
        content: (
          <div>
            <p className="mb-2">Se ha registrado el parto y la preñez ha finalizado.</p>
            <div className="alert alert-success border-0">
              <h6 className="alert-heading">
                <CIcon icon={cilCheckCircle} className="me-2" />
                Tratamientos Automáticos Generados:
              </h6>
              <ul className="mb-0 small">
                <li>
                  <strong>Suero + Calcio:</strong> 2 días (preventivo fiebre de leche)
                </li>
                <li>
                  <strong>Desinflamatorio:</strong> Ubres
                </li>
                <li>
                  <strong>Hormona expulsora:</strong> Limpieza uterina
                </li>
                <li>
                  <strong>Vitaminas:</strong> Programadas cada 2 meses
                </li>
              </ul>
            </div>
            <p className="mt-3 text-center fw-bold text-primary">¿Desea registrar la cría ahora?</p>
          </div>
        ),
      })

      setShowPartoModal(false)
      setShowSuccessModal(true)

      setPartoData({ fechaParto: new Date().toISOString().split('T')[0] })
      loadData()
    } catch (error) {
      console.error('Error al registrar parto:', error)
      toast.error('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const openCalfRegistration = () => {
    setShowSuccessModal(false)

    // Preparar datos para el formulario de cría
    const etapaBecerro =
      etapas.find((e) => e.tmaNometab.toLowerCase().includes('becerro'))?.tmaIdetabo || ''

    setAddCattleForm({
      ...addCattleForm,
      fechaNacimiento: partoData.fechaParto,
      idEtapaBovino: String(etapaBecerro),
      idMadre: selectedPrenez?.ttr_idbovino || '',
      madreExterna: false,
      sexo: '', // Usuario debe seleccionar
      numeroBovino: '',
    })

    setShowAddCalfModal(true)
    setPartoData({ fechaParto: new Date().toISOString().split('T')[0] })
  }

  const handleConfirmarSecado = async () => {
    if (!selectedSecado) return
    try {
      setLoading(true)
      await confirmarSecado(selectedSecado.ttr_idprenez)
      toast.success(
        `Secado confirmado. Bovino #${selectedSecado.numero_bovino} ahora es "Vaca Seca".`,
      )
      setShowSecadoModal(false)
      setSelectedSecado(null)
      loadData()
    } catch (error) {
      console.error('Error al confirmar secado:', error)
      toast.error('Error al confirmar secado')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDeleteModal = (prenez) => {
    setPrenezToDelete(prenez)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!prenezToDelete) return
    try {
      await deletePrenez(prenezToDelete.ttr_idprenez)
      loadData()
      toast.error('Preñez eliminada correctamente.')
      setShowDeleteModal(false)
      setPrenezToDelete(null)
    } catch (error) {
      console.error('Error al eliminar preñez:', error)
      toast.error('Error al eliminar preñez')
    }
  }

  const resetForm = () => {
    setFormData({
      idBovino: '',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaEstimadaParto: '',
      estado: 'Confirmada',
      observaciones: '',
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('es-ES')
  }

  const getDiasRestantes = (fecha) => {
    if (!fecha) return null
    const hoy = new Date()
    const fechaObj = new Date(fecha)
    const diff = Math.ceil((fechaObj - hoy) / (1000 * 60 * 60 * 24))
    return diff
  }

  // Calcular fase de gestación y progreso
  const getGestacionInfo = (prenez) => {
    if (!prenez.ttr_fechaini) return null
    const fechaInicio = new Date(prenez.ttr_fechaini)
    const hoy = new Date()
    const diasGestacion = Math.floor((hoy - fechaInicio) / (1000 * 60 * 60 * 24))
    const porcentaje = Math.min(Math.round((diasGestacion / 283) * 100), 100)

    let fase, color
    if (prenez.ttr_estadopre === 'En secado') {
      fase = 'Vaca Seca'
      color = 'warning'
    } else if (diasGestacion >= 210) {
      fase = 'Listo para Secado'
      color = 'danger'
    } else if (diasGestacion >= 150) {
      fase = 'Gestación Avanzada'
      color = 'info'
    } else {
      fase = 'Gestación'
      color = 'success'
    }

    return { diasGestacion, porcentaje, fase, color }
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      Confirmada: { color: 'success', icon: cilCheckCircle },
      'En proceso': { color: 'warning', icon: cilCalendar },
      'En secado': { color: 'dark', icon: cilWarning },
      Finalizada: { color: 'secondary', icon: cilBaby },
    }
    const badge = badges[estado] || { color: 'info', icon: cilCalendar }
    return (
      <CBadge color={badge.color}>
        <CIcon icon={badge.icon} className="me-1" size="sm" />
        {estado}
      </CBadge>
    )
  }

  return (
    <>
      {/* ============ PANEL DE ALERTAS DE SECADO ============ */}
      {alertasSecado.length > 0 && (
        <CRow className="mb-3">
          <CCol xs={12}>
            <CAlert color="warning" className="shadow-sm border-0 d-flex align-items-center">
              <CIcon icon={cilBell} size="xl" className="me-3 flex-shrink-0" />
              <div className="flex-grow-1">
                <h6 className="mb-1 fw-bold">
                  🔔 {alertasSecado.length} vaca{alertasSecado.length > 1 ? 's' : ''} lista
                  {alertasSecado.length > 1 ? 's' : ''} para secado
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {alertasSecado.map((alerta) => (
                    <CButton
                      key={alerta.ttr_idprenez}
                      color="warning"
                      size="sm"
                      className="text-dark fw-semibold"
                      onClick={() => {
                        setSelectedSecado(alerta)
                        setShowSecadoModal(true)
                      }}
                    >
                      #{alerta.numero_bovino} — {alerta.dias_gestacion} días — Secar
                    </CButton>
                  ))}
                </div>
              </div>
            </CAlert>
          </CCol>
        </CRow>
      )}

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Gestión de Preñez</strong>
              <CButton color="success" className="text-white" onClick={() => setShowModal(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Nueva Preñez
              </CButton>
            </CCardHeader>
            <CCardBody>
              {/* Filtros */}
              <div className="mb-4 d-flex gap-2">
                <CButton
                  color={filter === 'activas' ? 'success' : 'light'}
                  variant={filter === 'activas' ? '' : 'ghost'}
                  onClick={() => setFilter('activas')}
                >
                  <CIcon icon={cilFilter} className="me-2" />
                  Activas
                </CButton>
                <CButton
                  color={filter === 'todas' ? 'primary' : 'light'}
                  variant={filter === 'todas' ? '' : 'ghost'}
                  onClick={() => setFilter('todas')}
                >
                  <CIcon icon={cilCalendar} className="me-2" />
                  Todas
                </CButton>
              </div>

              {/* Tabla */}
              <CTable striped hover responsive className="align-middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Bovino</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                    <CTableHeaderCell>Parto Estimado</CTableHeaderCell>
                    <CTableHeaderCell>Progreso</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentData.map((prenez) => {
                    const diasRestantes = getDiasRestantes(prenez.ttr_fechaestp)
                    const gestInfo = getGestacionInfo(prenez)
                    const puedeAplicarMastitis =
                      prenez.ttr_estadopre !== 'Finalizada' && diasRestantes <= 60
                    const puedeRegistrarParto =
                      prenez.ttr_estadopre !== 'Finalizada' && diasRestantes <= 7
                    const puedeSecar =
                      prenez.ttr_estadopre !== 'Finalizada' &&
                      prenez.ttr_estadopre !== 'En secado' &&
                      gestInfo &&
                      gestInfo.diasGestacion >= 210

                    return (
                      <CTableRow key={prenez.ttr_idprenez}>
                        <CTableDataCell className="fw-semibold">
                          #{prenez.numero_bovino}
                        </CTableDataCell>
                        <CTableDataCell>{formatDate(prenez.ttr_fechaini)}</CTableDataCell>
                        <CTableDataCell>{formatDate(prenez.ttr_fechaestp)}</CTableDataCell>
                        <CTableDataCell style={{ minWidth: '200px' }}>
                          {gestInfo && prenez.ttr_estadopre !== 'Finalizada' ? (
                            <div>
                              <div className="d-flex justify-content-between mb-1">
                                <small className="fw-semibold">{gestInfo.fase}</small>
                                <small className="text-muted">
                                  {diasRestantes > 0
                                    ? `${diasRestantes}d para parto`
                                    : diasRestantes === 0
                                      ? 'Hoy'
                                      : `${Math.abs(diasRestantes)}d atrasado`}
                                </small>
                              </div>
                              <CProgress height={8}>
                                <CProgressBar
                                  value={gestInfo.porcentaje}
                                  color={gestInfo.color}
                                  animated={gestInfo.porcentaje >= 74}
                                />
                              </CProgress>
                              <small className="text-muted">
                                {gestInfo.diasGestacion} / 283 días ({gestInfo.porcentaje}%)
                              </small>
                            </div>
                          ) : (
                            <span className="text-muted">
                              {prenez.ttr_fechareal && formatDate(prenez.ttr_fechareal)}
                            </span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>{getEstadoBadge(prenez.ttr_estadopre)}</CTableDataCell>
                        <CTableDataCell className="text-end">
                          <CButtonGroup size="sm">
                            {puedeSecar && (
                              <CButton
                                color="dark"
                                className="text-white"
                                onClick={() => {
                                  setSelectedSecado({
                                    ttr_idprenez: prenez.ttr_idprenez,
                                    numero_bovino: prenez.numero_bovino,
                                    dias_gestacion: gestInfo.diasGestacion,
                                    dias_para_parto: diasRestantes,
                                  })
                                  setShowSecadoModal(true)
                                }}
                                title="Confirmar secado"
                              >
                                🥛 Secar
                              </CButton>
                            )}
                            {puedeAplicarMastitis && (
                              <CButton
                                color="info"
                                onClick={() => {
                                  setSelectedPrenez(prenez)
                                  setShowMastitisModal(true)
                                }}
                                title="Aplicar tratamiento de Mastitis (2 dosis)"
                              >
                                <CIcon icon={cilMedicalCross} />
                              </CButton>
                            )}
                            {puedeRegistrarParto && (
                              <CButton
                                color="warning"
                                onClick={() => {
                                  setSelectedPrenez(prenez)
                                  setShowPartoModal(true)
                                }}
                                title="Registrar parto y tratamientos post-parto"
                              >
                                <CIcon icon={cilBaby} />
                              </CButton>
                            )}
                            <CButton color="danger" onClick={() => handleOpenDeleteModal(prenez)}>
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CButtonGroup>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
              {preneces.length > 0 && (
                <div className="d-flex justify-content-center mt-3">
                  <CPagination aria-label="Navegación de preñeces">
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Anterior
                    </CPaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <CPaginationItem
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </CPaginationItem>
                    ))}
                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Siguiente
                    </CPaginationItem>
                  </CPagination>
                </div>
              )}

              {preneces.length === 0 && (
                <CAlert color="info" className="mt-3 border-0 shadow-sm">
                  No se encontraron preñeces con los filtros actuales.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal Nueva Preñez */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} size="lg" backdrop="static">
        <CModalHeader>
          <CModalTitle>Nueva Preñez</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Bovino *</CFormLabel>
                <CFormSelect
                  value={formData.idBovino}
                  onChange={(e) => setFormData({ ...formData, idBovino: e.target.value })}
                  required
                >
                  <option value="">Seleccione un bovino</option>
                  {bovinos
                    .filter((b) => b.ttrSexo === 'Hembra')
                    .map((b) => (
                      <option key={b.ttrIdbovino} value={b.ttrIdbovino}>
                        #{b.ttrNumerobv}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Fecha Inicio Preñez *</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Fecha Estimada de Parto</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaEstimadaParto}
                  onChange={(e) => setFormData({ ...formData, fechaEstimadaParto: e.target.value })}
                />
                <small className="text-muted">
                  Opcional. Se calcula automáticamente (+283 días).
                </small>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Estado</CFormLabel>
                <CFormSelect
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                >
                  <option value="Confirmada">Confirmada</option>
                  <option value="En proceso">En Proceso</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Observaciones</CFormLabel>
                <CFormTextarea
                  rows={3}
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  placeholder="Observaciones adicionales..."
                />
              </CCol>
            </CRow>
            <CAlert color="info" className="d-flex align-items-center">
              <CIcon icon={cilCalendar} className="me-2" />
              <div>
                <strong>Ciclo automático:</strong> Secado a los 210 días → Parto estimado a los 283
                días. Recibirás alertas en cada fase.
              </div>
            </CAlert>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </CButton>
            <CButton color="success" type="submit" className="text-white" disabled={loading}>
              Guardar Preñez
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* ============ Modal Confirmar Secado ============ */}
      <CModal
        visible={showSecadoModal}
        onClose={() => setShowSecadoModal(false)}
        backdrop="static"
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>🥛 Confirmar Secado</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedSecado && (
            <>
              <p>
                ¿Confirmar el secado de la vaca <strong>#{selectedSecado.numero_bovino}</strong>?
              </p>
              <CAlert color="info" className="border-0">
                <ul className="mb-0 small">
                  <li>
                    <strong>Días de gestación:</strong> {selectedSecado.dias_gestacion} días
                  </li>
                  <li>
                    <strong>Días para el parto:</strong> {selectedSecado.dias_para_parto} días
                  </li>
                </ul>
              </CAlert>
              <CAlert color="warning" className="border-0">
                <strong>Al confirmar:</strong>
                <ul className="mb-0 small mt-1">
                  <li>
                    El estado del bovino cambiará a <strong>"Vaca Seca"</strong>
                  </li>
                  <li>Se bloqueará el registro de pesaje de leche</li>
                  <li>Iniciará la cuenta regresiva de 2 meses hasta el parto</li>
                </ul>
              </CAlert>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowSecadoModal(false)}>
            Cancelar
          </CButton>
          <CButton
            color="dark"
            onClick={handleConfirmarSecado}
            className="text-white"
            disabled={loading}
          >
            {loading ? 'Procesando...' : '🥛 Confirmar Secado'}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Tratamiento Mastitis */}
      <CModal
        visible={showMastitisModal}
        onClose={() => setShowMastitisModal(false)}
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilMedicalCross} className="me-2" />
            Tratamiento de Mastitis Automático
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Fecha de Inicio del Tratamiento *</CFormLabel>
              <CFormInput
                type="date"
                value={mastitisData.fechaInicio}
                onChange={(e) => setMastitisData({ fechaInicio: e.target.value })}
                required
              />
            </CCol>
          </CRow>
          <CAlert color="success" className="border-0">
            <h6 className="alert-heading">
              <CIcon icon={cilCheckCircle} className="me-2" />
              Plan de Tratamiento
            </h6>
            <ul className="mb-0">
              <li>
                <strong>Dosis 1:</strong> En la fecha seleccionada
              </li>
              <li>
                <strong>Dosis 2:</strong> 15 días después
              </li>
              <li>
                <strong>Próxima dosis:</strong> 6 meses después (para vacas en lactancia)
              </li>
            </ul>
          </CAlert>
          <CAlert color="warning" className="border-0">
            <strong>⚠️ Importante:</strong> Este tratamiento debe aplicarse en los últimos 2 meses
            de preñez.
          </CAlert>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowMastitisModal(false)}>
            Cancelar
          </CButton>
          <CButton
            color="success"
            onClick={handleAgregarMastitis}
            className="text-white"
            disabled={loading}
          >
            {loading ? 'Programando...' : 'Programar Tratamiento'}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Registrar Parto */}
      <CModal visible={showPartoModal} onClose={() => setShowPartoModal(false)} backdrop="static">
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilBaby} className="me-2" />
            Registrar Parto y Tratamientos Post-Parto
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Fecha del Parto *</CFormLabel>
              <CFormInput
                type="date"
                value={partoData.fechaParto}
                onChange={(e) => setPartoData({ fechaParto: e.target.value })}
                required
              />
            </CCol>
          </CRow>
          <CAlert color="success" className="border-0">
            <h6 className="alert-heading">
              <CIcon icon={cilCheckCircle} className="me-2" />
              Tratamientos Post-Parto Automáticos
            </h6>
            <ul className="mb-0">
              <li>
                <strong>Suero + Calcio:</strong> 2 días consecutivos
              </li>
              <li>
                <strong>Desinflamatorio:</strong> Para inflamación de ubres
              </li>
              <li>
                <strong>Hormona expulsora:</strong> Ayuda a expulsar residuos uterinos
              </li>
              <li>
                <strong>Vitaminas:</strong> Cada 2 meses
              </li>
            </ul>
          </CAlert>
          <CAlert color="info" className="border-0">
            <strong>ℹ️ Nota:</strong> Al confirmar, se marcar la preñez como "Finalizada" y se
            programarán automáticamente todos los tratamientos post-parto.
          </CAlert>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowPartoModal(false)}>
            Cancelar
          </CButton>
          <CButton
            color="warning"
            onClick={handleRegistrarParto}
            className="text-white"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Confirmar Parto'}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Éxito Post-Parto */}
      <CModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        backdrop="static"
        color="success"
      >
        <CModalHeader closeButton>
          <CModalTitle className="text-success">{successMessage?.title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{successMessage?.content}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowSuccessModal(false)}>
            Cerrar
          </CButton>
          <CButton color="success" className="text-white" onClick={openCalfRegistration}>
            <CIcon icon={cilPlus} className="me-2" />
            Registrar Cría
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Confirmar Eliminación */}
      <CModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        backdrop="static"
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilWarning} className="me-2" style={{ color: '#dc3545' }} />
            Eliminar Preñez
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="danger">
            <strong>¡Advertencia!</strong> Esta acción no se puede deshacer.
          </CAlert>
          <p>
            ¿Está seguro de que desea eliminar la preñez del bovino{' '}
            <strong>#{prenezToDelete?.numero_bovino}</strong>?
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete} className="text-white">
            <CIcon icon={cilTrash} className="me-2" />
            Eliminar Preñez
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Agregar Cría (Reutilizado de Cattle) */}
      <AddCattleModal
        visible={showAddCalfModal}
        setVisible={setShowAddCalfModal}
        addCattleForm={addCattleForm}
        setAddCattleForm={setAddCattleForm}
        handleAddCattle={handleAddCattle}
        razas={razas}
        colores={colores}
        etapas={etapas}
        estados={estados}
        males={males}
        females={females}
      />
    </>
  )
}

export default PrenezIndex
