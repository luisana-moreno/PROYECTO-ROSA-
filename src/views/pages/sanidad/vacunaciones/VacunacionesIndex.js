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
import { cilPlus, cilTrash, cilFilter, cilSearch } from '@coreui/icons'
import {
  getVacunaciones,
  getVacunacionesProximas,
  getVacunacionesVencidas,
  createVacunacion,
  deleteVacunacion,
  getTiposVacuna,
} from '../../../../api/sanidadService'
import { cattleService } from '../../../../api/cattleService'
import { employeeService } from '../../../../api/employeeService'
import CustomTableModal from '../../../../components/CustomTableModal' // Componente para selección múltiple

const VacunacionesIndex = () => {
  const [vacunaciones, setVacunaciones] = useState([])
  const [bovinos, setBovinos] = useState([])
  const [tiposVacuna, setTiposVacuna] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showBovinoModal, setShowBovinoModal] = useState(false) // Estado para modal de selección bovina
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('todas') // todas, proximas, vencidas

  const [formData, setFormData] = useState({
    idBovino: '', // Puede ser una cadena de IDs separados por coma si es múltiple, o un array. Vamos a manejarlo como array de IDs.
    selectedBovinos: [], // Array de objetos bovino seleccionados
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
        getTiposVacuna(), // Usamos la nueva función del sanidadService
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
      // Si hay múltiples bovinos seleccionados
      if (formData.selectedBovinos.length > 0) {
        // Enviar una petición por cada bovino (o crear un endpoint bulk en backend si se prefiere, por ahora iteramos)
        for (const bovino of formData.selectedBovinos) {
          await createVacunacion({
            ...formData,
            idBovino: bovino.ttrIdbovino,
          })
        }
      } else if (formData.idBovino) {
        // Caso simple, un solo bovino seleccionado manualmente sin el modal (legacy support)
        await createVacunacion(formData)
      } else {
        alert('Debe seleccionar al menos un bovino.')
        return
      }

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
      selectedBovinos: [],
      idTipoVacuna: '',
      fechaAplicacion: new Date().toISOString().split('T')[0],
      numDosis: 1,
      idEmpleado: '',
      lote: '',
      observaciones: '',
    })
  }

  const handleBovinosSelection = (selected) => {
    // selected es un array de objetos o IDs según implementación de CustomTableModal
    // Asumimos que CustomTableModal devuelve los items seleccionados
    setFormData({
      ...formData,
      selectedBovinos: selected,
      idBovino: selected.length > 0 ? selected[0].ttrIdbovino : '', // Mantener compatibilidad simple
    })
    setShowBovinoModal(false)
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

  // Columnas para el modal de selección de bovinos
  const bovinosColumns = [
    { header: 'Número', key: 'ttrNumerobv' },
    { header: 'Raza', key: 'raza_nombre' }, // Asegurarse que el objeto bovino trae estos campos
    { header: 'Sexo', key: 'ttrSexo' },
  ]

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
              <CCol md={12}>
                <CFormLabel>Bovinos *</CFormLabel>
                <div className="d-flex gap-2">
                  <CFormInput
                    readOnly
                    value={
                      formData.selectedBovinos.map((b) => b.ttrNumerobv).join(', ') ||
                      'Ningún bovino seleccionado'
                    }
                    onClick={() => setShowBovinoModal(true)}
                    style={{ cursor: 'pointer' }}
                  />
                  <CButton color="primary" onClick={() => setShowBovinoModal(true)}>
                    Seleccionar
                  </CButton>
                </div>
                {formData.selectedBovinos.length > 0 && (
                  <div className="mt-2">
                    <small className="text-muted">
                      Se registrará la vacunación para {formData.selectedBovinos.length} animales.
                    </small>
                  </div>
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
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
              <CCol md={6}>
                <CFormLabel>Fecha de Aplicación *</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaAplicacion}
                  onChange={(e) => setFormData({ ...formData, fechaAplicacion: e.target.value })}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Número de Dosis</CFormLabel>
                <CFormInput
                  type="number"
                  min="1"
                  value={formData.numDosis}
                  onChange={(e) => setFormData({ ...formData, numDosis: parseInt(e.target.value) })}
                />
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

      {/* Modal de Selección Bovina */}
      <CustomTableModal
        visible={showBovinoModal}
        onClose={() => setShowBovinoModal(false)}
        data={bovinos}
        columns={bovinosColumns}
        onSelect={handleBovinosSelection}
        title="Seleccionar Bovinos para Vacunación"
        multiSelect={true}
      />
    </>
  )
}

export default VacunacionesIndex
