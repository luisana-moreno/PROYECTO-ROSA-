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
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilCheckCircle,
  cilBan,
  cilCalendar,
  cilFilter,
  cilSearch,
  cilWarning,
} from '@coreui/icons'
import {
  getPlanesVacunacion,
  getPlanesVacunacionActivos,
  createPlanVacunacion,
  updatePlanVacunacion,
  deletePlanVacunacion,
  togglePlanActivo,
  getTiposVacuna, // Añadido
} from '../../../../api/sanidadService'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../hooks/usePagination'

const PlanesIndex = () => {
  const [planes, setPlanes] = useState([])
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(planes, 10)
  const [tiposVacuna, setTiposVacuna] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [planToDelete, setPlanToDelete] = useState(null)
  const [editingPlan, setEditingPlan] = useState(null)
  const [filter, setFilter] = useState('todos') // todos, activos

  const [formData, setFormData] = useState({
    nombre: '',
    idTipoVacuna: '',
    fechaInicio: '',
    fechaFin: '',
    intervalo: 365,
    numDosis: 1,
    descripcion: '',
    activo: true,
  })

  useEffect(() => {
    loadData()
  }, [filter])

  const loadData = async () => {
    try {
      let planesData

      if (filter === 'activos') {
        planesData = await getPlanesVacunacionActivos()
      } else {
        planesData = await getPlanesVacunacion()
      }

      const tiposData = await getTiposVacuna()

      setPlanes(planesData)
      setTiposVacuna(tiposData)
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar planes de vacunación.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingPlan) {
        await updatePlanVacunacion(editingPlan.ttr_idplanva, formData)
        toast.info('Plan actualizado correctamente.')
      } else {
        await createPlanVacunacion(formData)
        toast.success('Plan creado correctamente.')
      }
      setShowModal(false)
      loadData()
      resetForm()
    } catch (error) {
      console.error('Error al guardar plan:', error)
      toast.error('Error al guardar plan.')
    }
  }

  const handleEdit = (plan) => {
    setEditingPlan(plan)
    setFormData({
      nombre: plan.ttr_nombrepl,
      idTipoVacuna: plan.ttr_idtipvac,
      fechaInicio: plan.ttr_fechaini?.split('T')[0] || '',
      fechaFin: plan.ttr_fechafin?.split('T')[0] || '',
      intervalo: plan.ttr_interval || 365,
      numDosis: plan.ttr_numdosis || 1,
      descripcion: plan.ttr_descripc || '',
      activo: plan.ttr_activo,
    })
    setShowModal(true)
  }

  const openDeleteModal = (plan) => {
    setPlanToDelete(plan)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!planToDelete) return
    try {
      await deletePlanVacunacion(planToDelete.ttr_idplanva)
      toast.error('Plan eliminado correctamente.')
      setShowDeleteModal(false)
      setPlanToDelete(null)
      loadData()
    } catch (error) {
      console.error('Error al eliminar plan:', error)
      toast.error('Error al eliminar plan.')
    }
  }

  const handleToggleActivo = async (id, activo) => {
    try {
      await togglePlanActivo(id, !activo)
      toast.info(activo ? 'Plan desactivado.' : 'Plan activado.')
      loadData()
    } catch (error) {
      console.error('Error al cambiar estado:', error)
      toast.error('Error al cambiar estado del plan.')
    }
  }

  const resetForm = () => {
    setEditingPlan(null)
    setFormData({
      nombre: '',
      idTipoVacuna: '',
      fechaInicio: '',
      fechaFin: '',
      intervalo: 365,
      numDosis: 1,
      descripcion: '',
      activo: true,
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('es-ES')
  }

  console.log(planes)

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Planes de Vacunación</strong>
              <CButton
                color="success"
                className="text-white"
                onClick={() => {
                  resetForm()
                  setShowModal(true)
                }}
              >
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Plan
              </CButton>
            </CCardHeader>
            <CCardBody>
              {/* Filtros */}
              <div className="mb-4 d-flex gap-2">
                <CButton
                  color={filter === 'todos' ? 'primary' : 'light'}
                  variant={filter === 'todos' ? '' : 'ghost'}
                  onClick={() => setFilter('todos')}
                >
                  <CIcon icon={cilFilter} className="me-2" />
                  Todos
                </CButton>
                <CButton
                  color={filter === 'activos' ? 'success' : 'light'}
                  variant={filter === 'activos' ? '' : 'ghost'}
                  onClick={() => setFilter('activos')}
                >
                  <CIcon icon={cilCheckCircle} className="me-2" />
                  Activos
                </CButton>
              </div>

              <CTable striped hover responsive className="align-middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Vacuna</CTableHeaderCell>
                    <CTableHeaderCell>Período</CTableHeaderCell>
                    <CTableHeaderCell>Intervalo</CTableHeaderCell>
                    <CTableHeaderCell>Dosis</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentData.map((plan) => (
                    <CTableRow key={plan.ttr_idplanva}>
                      <CTableDataCell className="fw-semibold">{plan.ttr_nomplan}</CTableDataCell>
                      <CTableDataCell>{plan.nombre_vacuna}</CTableDataCell>
                      <CTableDataCell>
                        {formatDate(plan.ttr_fechaini)} - {formatDate(plan.ttr_fechafin)}
                      </CTableDataCell>
                      <CTableDataCell>{plan.ttr_interval} días</CTableDataCell>
                      <CTableDataCell>{plan.ttr_numdosis}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={plan.ttr_activo ? 'success' : 'secondary'}>
                          {plan.ttr_activo ? 'Activo' : 'Inactivo'}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="text-end">
                        <CButton
                          color="warning"
                          size="sm"
                          className="me-2 text-white"
                          title="Editar"
                          onClick={() => handleEdit(plan)}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color={plan.ttr_activo ? 'secondary' : 'success'}
                          size="sm"
                          className="me-2 text-white"
                          title={plan.ttr_activo ? 'Desactivar' : 'Activar'}
                          onClick={() => handleToggleActivo(plan.ttr_idplanva, plan.ttr_activo)}
                        >
                          <CIcon icon={plan.ttr_activo ? cilBan : cilCheckCircle} />
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          title="Eliminar"
                          onClick={() => openDeleteModal(plan)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              {planes.length > 0 && (
                <div className="d-flex justify-content-center mt-3">
                  <CPagination aria-label="Navegación de planes">
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

              {planes.length === 0 && (
                <CAlert color="info" className="mt-3 border-0 shadow-sm">
                  <CIcon icon={cilSearch} className="me-2" />
                  No se encontraron planes de vacunación registrados.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal Nuevo/Editar Plan */}
      <CModal
        visible={showModal}
        onClose={() => {
          setShowModal(false)
          resetForm()
        }}
        size="lg"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>{editingPlan ? 'Editar' : 'Nuevo'} Plan de Vacunación</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Nombre del Plan *</CFormLabel>
                <CFormInput
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Aftosa Triple Mayo-Junio 2024"
                  required
                />
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
                <CFormLabel>Fecha de Inicio *</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Fecha de Fin *</CFormLabel>
                <CFormInput
                  type="date"
                  value={formData.fechaFin}
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Intervalo (días)</CFormLabel>
                <CFormInput
                  type="number"
                  min="1"
                  value={formData.intervalo}
                  onChange={(e) =>
                    setFormData({ ...formData, intervalo: parseInt(e.target.value) })
                  }
                />
                <small className="text-muted">Días entre dosis (por defecto: 365)</small>
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
              <CCol>
                <CFormLabel>Descripción</CFormLabel>
                <CFormTextarea
                  rows={3}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Descripción del plan de vacunación..."
                />
              </CCol>
            </CRow>

            <CAlert color="info" className="d-flex align-items-center">
              <CIcon icon={cilCalendar} className="me-2" />
              <div>
                <strong>Nota:</strong> Los planes activos se utilizarán como referencia para
                programar vacunaciones automáticas.
              </div>
            </CAlert>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
            >
              Cancelar
            </CButton>
            <CButton color="success" type="submit" className="text-white">
              {editingPlan ? 'Actualizar' : 'Guardar'}
            </CButton>
          </CModalFooter>
        </CForm>
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
            Eliminar Plan
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="danger">
            <strong>¡Advertencia!</strong> Esta acción no se puede deshacer.
          </CAlert>
          <p>
            ¿Está seguro de que desea eliminar el plan <strong>{planToDelete?.ttr_nomplan}</strong>?
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete} className="text-white">
            <CIcon icon={cilTrash} className="me-2" />
            Eliminar Plan
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default PlanesIndex
