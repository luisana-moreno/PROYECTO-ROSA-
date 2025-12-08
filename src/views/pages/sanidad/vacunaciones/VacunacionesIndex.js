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
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash, cilPencil, cilFilter, cilSearch } from '@coreui/icons'
import {
  getVacunaciones,
  getVacunacionesProximas,
  getVacunacionesVencidas,
  createVacunacion,
  deleteVacunacion,
} from '../../../../api/sanidadService'
import { cattleService } from '../../../../api/cattleService'
import { regmedicosService } from '../../../../api/regmedicosService'
import { employeeService } from '../../../../api/employeeService'

const VacunacionesIndex = () => {
  const [vacunaciones, setVacunaciones] = useState([])
  const [bovinos, setBovinos] = useState([])
  const [tiposVacuna, setTiposVacuna] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('todas') // todas, proximas, vencidas

  const [formData, setFormData] = useState({
    idBovino: '',
    idTipoVacuna: '',
    fechaAplicacion: new Date().toISOString().split('T')[0],
    numDosis: 1,
    idEmpleado: '',
    lote: '',
    observaciones: '',
  })

  useEffect(() => {
    loadData()
  }, [filter])

  const loadData = async () => {
    try {
      setLoading(true)
      let vacunasData

      if (filter === 'proximas') {
        vacunasData = await getVacunacionesProximas(30)
      } else if (filter === 'vencidas') {
        vacunasData = await getVacunacionesVencidas()
      } else {
        vacunasData = await getVacunaciones()
      }

      const [bovinosData, tiposData, empleadosData] = await Promise.all([
        cattleService.getAllCattle(),
        regmedicosService.getAllTiposVacuna(),
        employeeService.getAllEmployees(),
      ])

      setVacunaciones(vacunasData)
      setBovinos(bovinosData)
      setTiposVacuna(tiposData)
      setEmpleados(empleadosData)
    } catch (error) {
      console.error('Error al cargar datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createVacunacion(formData)
      setShowModal(false)
      loadData()
      resetForm()
    } catch (error) {
      console.error('Error al crear vacunación:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta vacunación?')) {
      try {
        await deleteVacunacion(id)
        loadData()
      } catch (error) {
        console.error('Error al eliminar vacunación:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      idBovino: '',
      idTipoVacuna: '',
      fechaAplicacion: new Date().toISOString().split('T')[0],
      numDosis: 1,
      idEmpleado: '',
      lote: '',
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
              <strong>Gestión de Vacunaciones</strong>
              <CButton color="success" className="text-white" onClick={() => setShowModal(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Nueva Vacunación
              </CButton>
            </CCardHeader>
            <CCardBody>
              {/* Filtros */}
              <div className="mb-4 d-flex gap-2">
                <CButton
                  color={filter === 'todas' ? 'success' : 'light'}
                  variant={filter === 'todas' ? '' : 'ghost'}
                  onClick={() => setFilter('todas')}
                >
                  <CIcon icon={cilFilter} className="me-2" />
                  Todas
                </CButton>
                <CButton
                  color={filter === 'proximas' ? 'warning' : 'light'}
                  variant={filter === 'proximas' ? '' : 'ghost'}
                  onClick={() => setFilter('proximas')}
                >
                  <CIcon icon={cilSearch} className="me-2" />
                  Próximas (30 días)
                </CButton>
                <CButton
                  color={filter === 'vencidas' ? 'danger' : 'light'}
                  variant={filter === 'vencidas' ? '' : 'ghost'}
                  onClick={() => setFilter('vencidas')}
                >
                  <CIcon icon={cilTrash} className="me-2" />
                  Vencidas
                </CButton>
              </div>

              {/* Tabla */}
              <CTable striped hover responsive className="align-middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Bovino</CTableHeaderCell>
                    <CTableHeaderCell>Vacuna</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Aplicación</CTableHeaderCell>
                    <CTableHeaderCell>Próxima Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Dosis</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {vacunaciones.map((vac) => {
                    const diasRestantes = getDiasRestantes(vac.ttr_proxfech)
                    return (
                      <CTableRow key={vac.ttr_idvacuna}>
                        <CTableDataCell className="fw-semibold">
                          #{vac.numero_bovino}
                        </CTableDataCell>
                        <CTableDataCell>{vac.nombre_vacuna}</CTableDataCell>
                        <CTableDataCell>{formatDate(vac.ttr_fechaapl)}</CTableDataCell>
                        <CTableDataCell>{formatDate(vac.ttr_proxfech)}</CTableDataCell>
                        <CTableDataCell>{vac.ttr_numdosis}</CTableDataCell>
                        <CTableDataCell>
                          {diasRestantes !== null && (
                            <CBadge
                              color={
                                diasRestantes < 0
                                  ? 'danger'
                                  : diasRestantes <= 7
                                    ? 'warning'
                                    : 'success'
                              }
                            >
                              {diasRestantes < 0
                                ? 'Vencida'
                                : diasRestantes === 0
                                  ? 'Hoy'
                                  : `${diasRestantes} días`}
                            </CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell className="text-end">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(vac.ttr_idvacuna)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>

              {vacunaciones.length === 0 && (
                <CAlert color="info" className="mt-3 border-0 shadow-sm">
                  <CIcon icon={cilSearch} className="me-2" />
                  No se encontraron registros de vacunación con los filtros actuales.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal Nueva Vacunación */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} size="lg" backdrop="static">
        <CModalHeader>
          <CModalTitle>Nueva Vacunación</CModalTitle>
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
                    <option key={b.ttrIdbovino} value={b.ttrIdbovino}>
                      #{b.ttrNumerobv}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Tipo de Vacuna *</CFormLabel>
                <CFormSelect
                  value={formData.idTipoVacuna}
                  onChange={(e) => setFormData({ ...formData, idTipoVacuna: e.target.value })}
                  required
                >
                  <option value="">Seleccione tipo de vacuna</option>
                  {tiposVacuna.map((tv) => (
                    <option key={tv.id} value={tv.id}>
                      {tv.nombre}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Fecha de Aplicación *</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaAplicacion}
                  onChange={(e) => setFormData({ ...formData, fechaAplicacion: e.target.value })}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Número de Dosis</CFormLabel>
                <CFormInput
                  type="number"
                  min="1"
                  value={formData.numDosis}
                  onChange={(e) => setFormData({ ...formData, numDosis: parseInt(e.target.value) })}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Empleado que Aplicó</CFormLabel>
                <CFormSelect
                  value={formData.idEmpleado}
                  onChange={(e) => setFormData({ ...formData, idEmpleado: e.target.value })}
                >
                  <option value="">Seleccione empleado</option>
                  {empleados.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.ttrNombrel} {emp.ttrApellid}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Lote de Vacuna</CFormLabel>
                <CFormInput
                  type="text"
                  value={formData.lote}
                  onChange={(e) => setFormData({ ...formData, lote: e.target.value })}
                  placeholder="Ej: LOT-2024-001"
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
                  placeholder="Observaciones adicionales..."
                />
              </CCol>
            </CRow>
            <CAlert color="info" className="d-flex align-items-center">
              <CIcon icon={cilSearch} className="me-2" />
              <div>
                <strong>Nota:</strong> La próxima fecha de vacunación se calculará automáticamente
                según el plan de la vacuna seleccionada.
              </div>
            </CAlert>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </CButton>
            <CButton color="success" type="submit" className="text-white">
              Guardar Vacunación
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default VacunacionesIndex
