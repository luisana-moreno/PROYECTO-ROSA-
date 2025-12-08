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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash, cilFilter, cilSearch, cilCheckCircle, cilCalendar } from '@coreui/icons'
import {
  getPreneces,
  getPrenecesActivas,
  createPrenez,
  updatePrenez,
  deletePrenez,
} from '../../../../api/sanidadService'
import { cattleService } from '../../../../api/cattleService'

const PrenezIndex = () => {
  const [preneces, setPreneces] = useState([])
  const [bovinos, setBovinos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('activas') // todas, activas

  const [formData, setFormData] = useState({
    idBovino: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaEstimadaParto: '',
    estado: 'Confirmada',
    observaciones: '',
  })

  useEffect(() => {
    loadData()
  }, [filter])

  const loadData = async () => {
    try {
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
    }
  }

  const handleRegistrarParto = async (id) => {
    if (window.confirm('¿Confirmar que la vaca ha parido?')) {
      try {
        await updatePrenez(id, {
          fechaRealParto: new Date().toISOString().split('T')[0],
          estado: 'Finalizada',
        })
        loadData()
      } catch (error) {
        console.error('Error al registrar parto:', error)
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este registro de preñez?')) {
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

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Gestión de Preñez y Partos</strong>
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
                  <CIcon icon={cilCheckCircle} className="me-2" />
                  Activas
                </CButton>
                <CButton
                  color={filter === 'todas' ? 'primary' : 'light'}
                  variant={filter === 'todas' ? '' : 'ghost'}
                  onClick={() => setFilter('todas')}
                >
                  <CIcon icon={cilFilter} className="me-2" />
                  Historial Completo
                </CButton>
              </div>

              {/* Tabla */}
              <CTable striped hover responsive className="align-middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Bovino</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Estimada Parto</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Real Parto</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell>Días Restantes</CTableHeaderCell>
                    <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {preneces.map((prenez) => {
                    const diasRestantes = getDiasRestantes(prenez.ttr_fechaestp)
                    return (
                      <CTableRow key={prenez.ttr_idprenez}>
                        <CTableDataCell className="fw-semibold">
                          #{prenez.numero_bovino}
                        </CTableDataCell>
                        <CTableDataCell>{formatDate(prenez.ttr_fechaini)}</CTableDataCell>
                        <CTableDataCell>
                          <strong>{formatDate(prenez.ttr_fechaestp)}</strong>
                        </CTableDataCell>
                        <CTableDataCell>{formatDate(prenez.ttr_fechareal)}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={
                              prenez.ttr_estadopre === 'Finalizada'
                                ? 'secondary'
                                : prenez.ttr_estadopre === 'Confirmada'
                                  ? 'primary'
                                  : 'warning'
                            }
                          >
                            {prenez.ttr_estadopre}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          {diasRestantes !== null && prenez.ttr_estadopre !== 'Finalizada' && (
                            <CBadge color={diasRestantes <= 30 ? 'warning' : 'info'}>
                              {diasRestantes > 0 ? `${diasRestantes} días` : 'Vencida'}
                            </CBadge>
                          )}
                          {prenez.ttr_estadopre === 'Finalizada' && (
                            <span className="text-muted">-</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell className="text-end">
                          {prenez.ttr_estadopre !== 'Finalizada' && (
                            <CButton
                              color="success"
                              size="sm"
                              className="text-white me-2"
                              title="Registrar Parto"
                              onClick={() => handleRegistrarParto(prenez.ttr_idprenez)}
                            >
                              <CIcon icon={cilCheckCircle} />
                            </CButton>
                          )}
                          <CButton
                            color="danger"
                            size="sm"
                            title="Eliminar registro"
                            onClick={() => handleDelete(prenez.ttr_idprenez)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>

              {preneces.length === 0 && (
                <CAlert color="info" className="mt-3 border-0 shadow-sm">
                  <CIcon icon={cilSearch} className="me-2" />
                  No se encontraron registros de preñez con los filtros actuales.
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
                  {bovinos.map((b) => (
                    <option key={b.ttr_idbovino} value={b.ttr_idbovino}>
                      #{b.ttr_numerobv}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Estado</CFormLabel>
                <CFormSelect
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                >
                  <option value="Confirmada">Confirmada</option>
                  <option value="En proceso">En proceso</option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Fecha de Inicio *</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Fecha Estimada de Parto</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaEstimadaParto}
                  onChange={(e) => setFormData({ ...formData, fechaEstimadaParto: e.target.value })}
                />
                <small className="text-muted">
                  Si no se especifica, se calculará automáticamente (+280 días)
                </small>
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
                <strong>Nota:</strong> La duración promedio de una preñez bovina es de 280 días
                (aprox. 9 meses).
              </div>
            </CAlert>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </CButton>
            <CButton color="success" type="submit" className="text-white">
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default PrenezIndex
