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
} from '@coreui/icons'
import {
  getPreneces,
  getPrenecesActivas,
  createPrenez,
  updatePrenez,
  deletePrenez,
  agregarTratamientoMastitisAutomatico,
  agregarTratamientosPostParto,
} from '../../../../api/sanidadService'
import { cattleService } from '../../../../api/cattleService'

const PrenezIndex = () => {
  const [preneces, setPreneces] = useState([])
  const [bovinos, setBovinos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showMastitisModal, setShowMastitisModal] = useState(false)
  const [showPartoModal, setShowPartoModal] = useState(false)
  const [selectedPrenez, setSelectedPrenez] = useState(null)
  const [filter, setFilter] = useState('activas') // todas, activas
  const [loading, setLoading] = useState(false)

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

      const bovinosData = await cattleService.getAllCattle()

      setPreneces(prenecesData)
      setBovinos(bovinosData)
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
    } catch (error) {
      console.error('Error al crear preñez:', error)
      alert('Error al crear preñez: ' + error.message)
    }
  }

  const handleAgregarMastitis = async () => {
    try {
      setLoading(true)
      await agregarTratamientoMastitisAutomatico(selectedPrenez, mastitisData.fechaInicio)
      alert(
        '✅ Tratamiento de Mastitis programado exitosamente!\n\n' +
          '• Dosis 1: ' +
          mastitisData.fechaInicio +
          '\n' +
          '• Dosis 2: +15 días\n' +
          '• Próximo refuerzo: +6 meses',
      )
      setShowMastitisModal(false)
      setMastitisData({ fechaInicio: new Date().toISOString().split('T')[0] })
      loadData()
    } catch (error) {
      console.error('Error al agregar tratamiento de Mastitis:', error)
      alert('Error: ' + error.message)
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
      const result = await agregarTratamientosPostParto(selectedPrenez, partoData.fechaParto)

      // Preparar mensaje para el modal
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
          </div>
        ),
      })

      setShowPartoModal(false)
      setShowSuccessModal(true) // Mostrar modal de éxito

      setPartoData({ fechaParto: new Date().toISOString().split('T')[0] })
      loadData()
    } catch (error) {
      console.error('Error al registrar parto:', error)
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta preñez?')) {
      try {
        await deletePrenez(id)
        loadData()
      } catch (error) {
        console.error('Error al eliminar preñez:', error)
      }
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

  const getEstadoBadge = (estado) => {
    const badges = {
      Confirmada: { color: 'success', icon: cilCheckCircle },
      'En proceso': { color: 'warning', icon: cilCalendar },
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
                    <CTableHeaderCell>Días Restantes</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {preneces.map((prenez) => {
                    const diasRestantes = getDiasRestantes(prenez.ttr_fechaestp)
                    const puedeAplicarMastitis =
                      prenez.ttr_estadopre === 'Confirmada' && diasRestantes <= 60
                    const puedeRegistrarParto =
                      prenez.ttr_estadopre !== 'Finalizada' && diasRestantes <= 7

                    return (
                      <CTableRow key={prenez.ttr_idprenez}>
                        <CTableDataCell className="fw-semibold">
                          #{prenez.numero_bovino}
                        </CTableDataCell>
                        <CTableDataCell>{formatDate(prenez.ttr_fechaini)}</CTableDataCell>
                        <CTableDataCell>{formatDate(prenez.ttr_fechaestp)}</CTableDataCell>
                        <CTableDataCell>
                          {diasRestantes !== null && prenez.ttr_estadopre !== 'Finalizada' && (
                            <CBadge
                              color={
                                diasRestantes < 0
                                  ? 'danger'
                                  : diasRestantes <= 7
                                    ? 'warning'
                                    : 'info'
                              }
                            >
                              {diasRestantes < 0
                                ? `Atrasado ${Math.abs(diasRestantes)} días`
                                : diasRestantes === 0
                                  ? 'Hoy'
                                  : `${diasRestantes} días`}
                            </CBadge>
                          )}
                          {prenez.ttr_estadopre === 'Finalizada' && (
                            <span className="text-muted">
                              {prenez.ttr_fechareal && formatDate(prenez.ttr_fechareal)}
                            </span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>{getEstadoBadge(prenez.ttr_estadopre)}</CTableDataCell>
                        <CTableDataCell className="text-end">
                          <CButtonGroup size="sm">
                            {puedeAplicarMastitis && (
                              <CButton
                                color="info"
                                onClick={() => {
                                  setSelectedPrenez(prenez.ttr_idprenez)
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
                                  setSelectedPrenez(prenez.ttr_idprenez)
                                  setShowPartoModal(true)
                                }}
                                title="Registrar parto y tratamientos post-parto"
                              >
                                <CIcon icon={cilBaby} />
                              </CButton>
                            )}
                            <CButton
                              color="danger"
                              onClick={() => handleDelete(prenez.ttr_idprenez)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CButtonGroup>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>

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
                  placeholder="Se calculará automáticamente (+280 días)"
                />
                <small className="text-muted">Opcional. Se calcula automáticamente.</small>
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
                <strong>Nota:</strong> La gestación bovina dura aproximadamente 280 días (9 meses).
                La fecha de parto se calculará automáticamente si no la especificas.
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
          <CButton
            color="success"
            className="text-white"
            onClick={() => setShowSuccessModal(false)}
          >
            Entendido
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default PrenezIndex
