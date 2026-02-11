import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
  CPagination,
  CPaginationItem,
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
  cilWarning,
  cilMinus,
} from '@coreui/icons'
import {
  getVisitasVeterinarias,
  getProximaVisitaVeterinaria,
  createVisitaVeterinaria,
  deleteVisitaVeterinaria,
  getBovinosVisita,
  addBovinoVisita,
  getVeterinarios,
} from '../../../../api/sanidadService'
import { cattleService } from '../../../../api/cattleService'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../hooks/usePagination'

const VisitasIndex = () => {
  const location = useLocation()
  const [visitas, setVisitas] = useState([])
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(visitas, 10)
  const [bovinos, setBovinos] = useState([])
  const [veterinarios, setVeterinarios] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showBovinosModal, setShowBovinosModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedVisita, setSelectedVisita] = useState(null)
  const [visitaToDelete, setVisitaToDelete] = useState(null)
  const [bovinosVisita, setBovinosVisita] = useState([])

  const [formData, setFormData] = useState({
    fechaVisita: new Date().toISOString().split('T')[0],
    veterinario: '',
    motivo: '',
    observaciones: '',
  })

  // Lista de bovinos que se agregarán a la visita al crearla
  const [bovinosToAdd, setBovinosToAdd] = useState([])
  const [bovinoFormInline, setBovinoFormInline] = useState({
    idBovino: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
  })

  // Form para agregar bovinos en el modal de Detalles (post-creación)
  const [bovinoFormDetail, setBovinoFormDetail] = useState({
    idBovino: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [visitasData, bovinosData, veterinariosData] = await Promise.all([
        getVisitasVeterinarias(),
        cattleService.getAllCattle(),
        getVeterinarios(),
      ])

      setVisitas(visitasData)
      setBovinos(bovinosData)
      setVeterinarios(veterinariosData)
    } catch (error) {
      console.error('Error al cargar datos:', error)
    }
  }

  // Effect para manejar redirección desde el expediente
  useEffect(() => {
    if (location.state?.preselectedBovine && bovinos.length > 0) {
      const { preselectedBovine } = location.state
      console.log('Preseleccionando bovino:', preselectedBovine)

      // Verificar si ya está agregado para evitar duplicados al recargar
      // (Aunquen react strict mode puede ejecutar esto doble, el check evita dudos)
      const alreadyAdded = bovinosToAdd.some(
        (b) => String(b.idBovino) === String(preselectedBovine.ttrIdbovino),
      )

      if (!alreadyAdded) {
        setBovinosToAdd((prev) => [
          ...prev,
          {
            idBovino: preselectedBovine.ttrIdbovino,
            numeroBovino: preselectedBovine.ttrNumerobv,
            sexo: preselectedBovine.ttrSexo,
            diagnostico: '',
            tratamiento: '',
            observaciones: '',
          },
        ])
        setShowModal(true)
        // Limpiar el state para que no se re-aplique si cierra y abre el modal
        // (Nota: modificar location.state directamente no es posible, pero
        //  podemos validar con un flag o simplemente confiar en que setShowModal(true) es lo que queremos)
        window.history.replaceState({}, document.title)
      }
    }
  }, [location.state, bovinos]) // Dependemos de bovinos para asegurar que cargaron (para validaciones extra si se requieren)

  // Agregar bovino a la lista temporal (antes de guardar la visita)
  const handleAddBovinoInline = () => {
    if (!bovinoFormInline.idBovino) {
      toast.warning('Seleccione un bovino')
      return
    }

    // Verificar que no esté duplicado
    if (bovinosToAdd.some((b) => b.idBovino === bovinoFormInline.idBovino)) {
      toast.warning('Este bovino ya fue agregado')
      return
    }

    // Buscar nombre del bovino para mostrar
    const bovinoInfo = bovinos.find(
      (b) => String(b.ttrIdbovino) === String(bovinoFormInline.idBovino),
    )

    setBovinosToAdd([
      ...bovinosToAdd,
      {
        ...bovinoFormInline,
        numeroBovino: bovinoInfo?.ttrNumerobv || '?',
        sexo: bovinoInfo?.ttrSexo || '',
      },
    ])

    setBovinoFormInline({
      idBovino: '',
      diagnostico: '',
      tratamiento: '',
      observaciones: '',
    })
  }

  // Quitar bovino de la lista temporal
  const handleRemoveBovinoInline = (index) => {
    setBovinosToAdd(bovinosToAdd.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Buscar nombre del veterinario seleccionado
      const vetSeleccionado = veterinarios.find((v) => v.ttr_idemplo == formData.veterinario)
      const nombreVet = vetSeleccionado
        ? `${vetSeleccionado.ttr_nombrel} ${vetSeleccionado.ttr_apellid}`
        : formData.veterinario

      await createVisitaVeterinaria({
        ...formData,
        veterinario: nombreVet,
        bovinos: bovinosToAdd.map((b) => ({
          idBovino: b.idBovino,
          diagnostico: b.diagnostico || null,
          tratamiento: b.tratamiento || null,
          observaciones: b.observaciones || null,
        })),
      })
      setShowModal(false)
      loadData()
      resetForm()
      toast.success('Visita registrada correctamente.')
    } catch (error) {
      console.error('Error al crear visita:', error)
      toast.error('Error al crear visita.')
    }
  }

  const handleOpenDeleteModal = (visita) => {
    setVisitaToDelete(visita)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!visitaToDelete) return
    try {
      await deleteVisitaVeterinaria(visitaToDelete.ttr_idvisvet)
      loadData()
      toast.error('Visita eliminada correctamente.')
      setShowDeleteModal(false)
      setVisitaToDelete(null)
    } catch (error) {
      console.error('Error al eliminar visita:', error)
      toast.error('Error al eliminar visita.')
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

  const handleAddBovinoDetail = async (e) => {
    e.preventDefault()
    try {
      await addBovinoVisita(selectedVisita.ttr_idvisvet, {
        idBovino: bovinoFormDetail.idBovino,
        diagnostico: bovinoFormDetail.diagnostico,
        tratamiento: bovinoFormDetail.tratamiento,
        estadoReproductivo: 'Normal',
        observaciones: bovinoFormDetail.observaciones,
      })
      const bovinosData = await getBovinosVisita(selectedVisita.ttr_idvisvet)
      setBovinosVisita(bovinosData)
      setBovinoFormDetail({
        idBovino: '',
        diagnostico: '',
        tratamiento: '',
        observaciones: '',
      })
      toast.success('Bovino agregado a la visita.')
    } catch (error) {
      console.error('Error al agregar bovino:', error)
      toast.error('Error al agregar bovino.')
    }
  }

  const resetForm = () => {
    setFormData({
      fechaVisita: new Date().toISOString().split('T')[0],
      veterinario: '',
      motivo: '',
      observaciones: '',
    })
    setBovinosToAdd([])
    setBovinoFormInline({
      idBovino: '',
      diagnostico: '',
      tratamiento: '',
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
                  {currentData.map((visita) => {
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
                            onClick={() => handleOpenDeleteModal(visita)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
              {visitas.length > 0 && (
                <div className="d-flex justify-content-center mt-3">
                  <CPagination aria-label="Navegación de visitas">
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

      {/* ======================= Modal Nueva Visita ======================= */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} size="xl" backdrop="static">
        <CModalHeader>
          <CModalTitle>Nueva Visita Veterinaria</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            {/* Datos de la visita */}
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
                <CFormSelect
                  value={formData.veterinario}
                  onChange={(e) => setFormData({ ...formData, veterinario: e.target.value })}
                  required
                >
                  <option value="">Seleccione un veterinario</option>
                  {veterinarios.map((vet) => (
                    <option key={vet.ttr_idemplo} value={vet.ttr_idemplo}>
                      {vet.ttr_nombrel} {vet.ttr_apellid}
                    </option>
                  ))}
                </CFormSelect>
                {veterinarios.length === 0 && (
                  <small className="text-muted">
                    No hay empleados con cargo de Veterinario (cargo 1).
                  </small>
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Motivo de la Visita *</CFormLabel>
                <CFormInput
                  type="text"
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  placeholder="Ej: Chequeo reproductivo trimestral"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Observaciones Generales</CFormLabel>
                <CFormInput
                  type="text"
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  placeholder="Observaciones generales de la visita..."
                />
              </CCol>
            </CRow>

            {/* Sección para agregar bovinos */}
            <hr />
            <h6 className="text-success mb-3">
              <CIcon icon={cilSpreadsheet} className="me-2" />
              Bovinos Atendidos
            </h6>

            <CCard className="mb-3 border-0 bg-light">
              <CCardBody>
                <CRow className="g-3 mb-2">
                  <CCol md={3}>
                    <CFormLabel className="small fw-bold">Bovino *</CFormLabel>
                    <CFormSelect
                      value={bovinoFormInline.idBovino}
                      onChange={(e) =>
                        setBovinoFormInline({ ...bovinoFormInline, idBovino: e.target.value })
                      }
                      size="sm"
                    >
                      <option value="">Seleccione</option>
                      {bovinos.map((b) => (
                        <option key={b.ttrIdbovino} value={b.ttrIdbovino}>
                          #{b.ttrNumerobv} - {b.ttrSexo || 'Sin sexo'}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel className="small fw-bold">Diagnóstico</CFormLabel>
                    <CFormInput
                      size="sm"
                      value={bovinoFormInline.diagnostico}
                      onChange={(e) =>
                        setBovinoFormInline({ ...bovinoFormInline, diagnostico: e.target.value })
                      }
                      placeholder="Diagnóstico"
                    />
                  </CCol>
                  <CCol md={2}>
                    <CFormLabel className="small fw-bold">Tratamiento</CFormLabel>
                    <CFormInput
                      size="sm"
                      value={bovinoFormInline.tratamiento}
                      onChange={(e) =>
                        setBovinoFormInline({ ...bovinoFormInline, tratamiento: e.target.value })
                      }
                      placeholder="Tratamiento"
                    />
                  </CCol>
                  <CCol md={2}>
                    <CFormLabel className="small fw-bold">Observación</CFormLabel>
                    <CFormInput
                      size="sm"
                      value={bovinoFormInline.observaciones}
                      onChange={(e) =>
                        setBovinoFormInline({ ...bovinoFormInline, observaciones: e.target.value })
                      }
                      placeholder="Observación"
                    />
                  </CCol>
                  <CCol md={2} className="d-flex align-items-end">
                    <CButton
                      color="success"
                      size="sm"
                      className="w-100 text-white"
                      type="button"
                      onClick={handleAddBovinoInline}
                    >
                      <CIcon icon={cilPlus} className="me-1" />
                      Agregar
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>

            {/* Lista de bovinos agregados */}
            {bovinosToAdd.length > 0 && (
              <CTable small striped bordered responsive className="mb-3">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Bovino</CTableHeaderCell>
                    <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                    <CTableHeaderCell>Tratamiento</CTableHeaderCell>
                    <CTableHeaderCell>Observación</CTableHeaderCell>
                    <CTableHeaderCell className="text-center" style={{ width: '60px' }}>
                      Quitar
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {bovinosToAdd.map((b, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="fw-bold">
                        #{b.numeroBovino} <small className="text-muted">{b.sexo}</small>
                      </CTableDataCell>
                      <CTableDataCell>{b.diagnostico || '-'}</CTableDataCell>
                      <CTableDataCell>{b.tratamiento || '-'}</CTableDataCell>
                      <CTableDataCell>{b.observaciones || '-'}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="danger"
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveBovinoInline(index)}
                        >
                          <CIcon icon={cilMinus} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}

            {bovinosToAdd.length === 0 && (
              <CAlert color="warning" className="py-2 small border-0">
                No se han agregado bovinos a esta visita. Use el formulario de arriba para
                agregarlos.
              </CAlert>
            )}

            <CAlert color="info" className="d-flex align-items-center mt-3">
              <CIcon icon={cilCalendar} className="me-2" />
              <div>
                <strong>Nota:</strong> La próxima visita se programará automáticamente para dentro
                de 3 meses.
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
              <CIcon icon={cilCheckCircle} className="me-1" />
              Guardar Visita
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* ======================= Modal Detalles / Bovinos ======================= */}
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
          {/* Formulario para agregar más bovinos (post-creación) */}
          <CCard className="mb-4 shadow-sm border-0 bg-light">
            <CCardHeader className="bg-transparent border-bottom">
              <strong className="text-success">Agregar Bovino a la Visita</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleAddBovinoDetail}>
                <CRow className="g-3 mb-3">
                  <CCol md={6}>
                    <CFormLabel>Bovino *</CFormLabel>
                    <CFormSelect
                      value={bovinoFormDetail.idBovino}
                      onChange={(e) =>
                        setBovinoFormDetail({ ...bovinoFormDetail, idBovino: e.target.value })
                      }
                      required
                    >
                      <option value="">Seleccione un bovino</option>
                      {bovinos.map((b) => (
                        <option key={b.ttrIdbovino} value={b.ttrIdbovino}>
                          #{b.ttrNumerobv} - {b.ttrSexo || 'Sin sexo'}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Diagnóstico</CFormLabel>
                    <CFormInput
                      type="text"
                      value={bovinoFormDetail.diagnostico}
                      onChange={(e) =>
                        setBovinoFormDetail({ ...bovinoFormDetail, diagnostico: e.target.value })
                      }
                      placeholder="Diagnóstico del animal"
                    />
                  </CCol>
                </CRow>
                <CRow className="g-3 mb-3">
                  <CCol md={6}>
                    <CFormLabel>Tratamiento</CFormLabel>
                    <CFormInput
                      type="text"
                      value={bovinoFormDetail.tratamiento}
                      onChange={(e) =>
                        setBovinoFormDetail({ ...bovinoFormDetail, tratamiento: e.target.value })
                      }
                      placeholder="Tratamiento aplicado"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Observación</CFormLabel>
                    <CFormInput
                      type="text"
                      value={bovinoFormDetail.observaciones}
                      onChange={(e) =>
                        setBovinoFormDetail({ ...bovinoFormDetail, observaciones: e.target.value })
                      }
                      placeholder="Observaciones"
                    />
                  </CCol>
                </CRow>
                <div className="text-end">
                  <CButton color="success" type="submit" className="text-white">
                    <CIcon icon={cilPlus} className="me-1" />
                    Agregar Bovino
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>

          {/* Lista de bovinos ya registrados */}
          <h6 className="text-success mb-3">Listado de Bovinos Atendidos</h6>
          <CTable striped hover responsive className="align-middle border">
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Bovino</CTableHeaderCell>
                <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                <CTableHeaderCell>Tratamiento</CTableHeaderCell>
                <CTableHeaderCell>Observación</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {bovinosVisita.map((bv, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="fw-bold">#{bv.numero_bovino}</CTableDataCell>
                  <CTableDataCell>{bv.ttr_diagnos || '-'}</CTableDataCell>
                  <CTableDataCell>{bv.ttr_tratamie || '-'}</CTableDataCell>
                  <CTableDataCell>{bv.ttr_observa || '-'}</CTableDataCell>
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

      {/* ======================= Modal Confirmar Eliminación ======================= */}
      <CModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        backdrop="static"
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilWarning} className="me-2" style={{ color: '#dc3545' }} />
            Eliminar Visita
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="danger">
            <strong>¡Advertencia!</strong> Esta acción no se puede deshacer.
          </CAlert>
          <p>
            ¿Está seguro de que desea eliminar la visita del{' '}
            <strong>{visitaToDelete && formatDate(visitaToDelete.ttr_fechavis)}</strong>?
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete} className="text-white">
            <CIcon icon={cilTrash} className="me-2" />
            Eliminar Visita
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default VisitasIndex
