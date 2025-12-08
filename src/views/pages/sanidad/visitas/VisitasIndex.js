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
  CFormTextarea,
  CAlert,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilTrash,
  cilSearch,
  cilCalendar,
  cilCheckCircle,
  cilPencil,
  cilSpreadsheet,
} from '@coreui/icons'
import {
  getVisitasVeterinarias,
  getProximaVisitaVeterinaria,
  createVisitaVeterinaria,
  deleteVisitaVeterinaria,
  getBovinosVisita,
  addBovinoVisita,
} from '../../../../api/sanidadService'
import { cattleService } from '../../../../api/cattleService'

const VisitasIndex = () => {
  const [visitas, setVisitas] = useState([])
  const [bovinos, setBovinos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showBovinosModal, setShowBovinosModal] = useState(false)
  const [selectedVisita, setSelectedVisita] = useState(null)
  const [bovinosVisita, setBovinosVisita] = useState([])

  const [formData, setFormData] = useState({
    fechaVisita: new Date().toISOString().split('T')[0],
    veterinario: '',
    motivo: '',
    observaciones: '',
  })

  const [bovinoForm, setBovinoForm] = useState({
    idBovino: '',
    diagnostico: '',
    estadoReproductivo: 'Normal',
    tratamientoAplicado: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [visitasData, bovinosData] = await Promise.all([
        getVisitasVeterinarias(),
        cattleService.getAllCattle(),
      ])

      setVisitas(visitasData)
      setBovinos(bovinosData)
    } catch (error) {
      console.error('Error al cargar datos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createVisitaVeterinaria(formData)
      setShowModal(false)
      loadData()
      resetForm()
    } catch (error) {
      console.error('Error al crear visita:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta visita?')) {
      try {
        await deleteVisitaVeterinaria(id)
        loadData()
      } catch (error) {
        console.error('Error al eliminar visita:', error)
      }
    }
  }

  const handleVerBovinos = async (visita) => {
    try {
      setSelectedVisita(visita)
      const bovinosData = await getBovinosVisita(visita.ttr_idvisvet)
      setBovinosVisita(bovinosData)
      setShowBovinosModal(true)
    } catch (error) {
      console.error('Error al cargar bovinos de la visita:', error)
    }
  }

  const handleAddBovino = async (e) => {
    e.preventDefault()
    try {
      await addBovinoVisita(selectedVisita.ttr_idvisvet, bovinoForm)
      const bovinosData = await getBovinosVisita(selectedVisita.ttr_idvisvet)
      setBovinosVisita(bovinosData)
      setBovinoForm({
        idBovino: '',
        diagnostico: '',
        estadoReproductivo: 'Normal',
        tratamientoAplicado: '',
      })
    } catch (error) {
      console.error('Error al agregar bovino:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      fechaVisita: new Date().toISOString().split('T')[0],
      veterinario: '',
      motivo: '',
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

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Visitas Veterinarias</strong>
              <CButton color="success" className="text-white" onClick={() => setShowModal(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Nueva Visita
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive className="align-middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Veterinario</CTableHeaderCell>
                    <CTableHeaderCell>Motivo</CTableHeaderCell>
                    <CTableHeaderCell>Próxima Visita</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {visitas.map((visita) => {
                    const diasRestantes = getDiasRestantes(visita.ttr_proxfech)
                    return (
                      <CTableRow key={visita.ttr_idvisvet}>
                        <CTableDataCell className="fw-semibold">
                          {formatDate(visita.ttr_fechavis)}
                        </CTableDataCell>
                        <CTableDataCell>{visita.ttr_veterina}</CTableDataCell>
                        <CTableDataCell>{visita.ttr_motivovi}</CTableDataCell>
                        <CTableDataCell>{formatDate(visita.ttr_proxfech)}</CTableDataCell>
                        <CTableDataCell>
                          {diasRestantes !== null && (
                            <CBadge color={diasRestantes <= 7 ? 'warning' : 'success'}>
                              {diasRestantes > 0 ? `${diasRestantes} días` : 'Vencida'}
                            </CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell className="text-end">
                          <CButton
                            color="info"
                            size="sm"
                            className="me-2 text-white"
                            title="Ver Bovinos Atendidos"
                            onClick={() => handleVerBovinos(visita)}
                          >
                            <CIcon icon={cilSearch} className="me-1" />
                            Detalles
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(visita.ttr_idvisvet)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>

              {visitas.length === 0 && (
                <CAlert color="info" className="mt-3 border-0 shadow-sm">
                  <CIcon icon={cilSearch} className="me-2" />
                  No se encontraron visitas veterinarias registradas.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={showModal} onClose={() => setShowModal(false)} size="lg" backdrop="static">
        <CModalHeader>
          <CModalTitle>Nueva Visita Veterinaria</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Fecha de Visita *</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaVisita}
                  onChange={(e) => setFormData({ ...formData, fechaVisita: e.target.value })}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Veterinario *</CFormLabel>
                <CFormInput
                  type="text"
                  value={formData.veterinario}
                  onChange={(e) => setFormData({ ...formData, veterinario: e.target.value })}
                  placeholder="Nombre del veterinario"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Motivo de la Visita *</CFormLabel>
                <CFormInput
                  type="text"
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  placeholder="Ej: Chequeo reproductivo trimestral"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Observaciones</CFormLabel>
                <CFormTextarea
                  rows={3}
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  placeholder="Observaciones generales de la visita..."
                />
              </CCol>
            </CRow>

            <CAlert color="info" className="d-flex align-items-center">
              <CIcon icon={cilCalendar} className="me-2" />
              <div>
                <strong>Nota:</strong> La próxima visita se programará automáticamente para dentro
                de 3 meses.
              </div>
            </CAlert>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </CButton>
            <CButton color="success" type="submit" className="text-white">
              Guardar Visita
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Modal Bovinos de la Visita */}
      <CModal
        visible={showBovinosModal}
        onClose={() => setShowBovinosModal(false)}
        size="xl"
        backdrop="static"
      >
        <CModalHeader className="bg-success text-white">
          <CModalTitle>
            <CIcon icon={cilSpreadsheet} className="me-2" />
            Bovinos Revisados - {selectedVisita && formatDate(selectedVisita.ttr_fechavis)}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* Formulario para agregar bovino */}
          <CCard className="mb-4 shadow-sm border-0 bg-light">
            <CCardHeader className="bg-transparent border-bottom">
              <strong className="text-success">Agregar Bovino a la Visita</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleAddBovino}>
                <CRow className="g-3 align-items-end">
                  <CCol md={3}>
                    <CFormLabel>Bovino *</CFormLabel>
                    <CFormSelect
                      value={bovinoForm.idBovino}
                      onChange={(e) => setBovinoForm({ ...bovinoForm, idBovino: e.target.value })}
                      required
                    >
                      <option value="">Seleccione</option>
                      {bovinos.map((b) => (
                        <option key={b.ttrIdbovino} value={b.ttrIdbovino}>
                          #{b.ttrNumerobv}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel>Estado Reproductivo</CFormLabel>
                    <CFormSelect
                      value={bovinoForm.estadoReproductivo}
                      onChange={(e) =>
                        setBovinoForm({ ...bovinoForm, estadoReproductivo: e.target.value })
                      }
                    >
                      <option value="Normal">Normal</option>
                      <option value="Preñada">Preñada</option>
                      <option value="Vacía">Vacía</option>
                      <option value="En tratamiento">En tratamiento</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>Diagnóstico / Tratamiento</CFormLabel>
                    <CFormInput
                      type="text"
                      value={bovinoForm.diagnostico}
                      onChange={(e) =>
                        setBovinoForm({ ...bovinoForm, diagnostico: e.target.value })
                      }
                      placeholder="Diagnóstico y trat. aplicado"
                    />
                  </CCol>
                  <CCol md={2}>
                    <CButton color="success" type="submit" className="w-100 text-white">
                      <CIcon icon={cilPlus} className="me-1" />
                      Agregar
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>

          {/* Lista de bovinos */}
          <h6 className="text-success mb-3">Listado de Bovinos Atendidos</h6>
          <CTable striped hover responsive className="align-middle border">
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Bovino</CTableHeaderCell>
                <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                <CTableHeaderCell>Estado Reproductivo</CTableHeaderCell>
                <CTableHeaderCell>Tratamiento</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {bovinosVisita.map((bv, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="fw-bold">#{bv.numero_bovino}</CTableDataCell>
                  <CTableDataCell>{bv.ttr_diagnost || '-'}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge
                      color={
                        bv.ttr_estarepro === 'Preñada'
                          ? 'success'
                          : bv.ttr_estarepro === 'En tratamiento'
                            ? 'warning'
                            : 'info'
                      }
                    >
                      {bv.ttr_estarepro}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{bv.ttr_tratamie || '-'}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {bovinosVisita.length === 0 && (
            <CAlert color="info" className="border-0 shadow-sm">
              <CIcon icon={cilSearch} className="me-2" />
              No hay bovinos registrados en esta visita. Agregue uno usando el formulario superior.
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowBovinosModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default VisitasIndex
