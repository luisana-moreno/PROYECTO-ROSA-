import React, { useState, useEffect, useMemo } from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CBadge,
  CButton,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CSpinner,
  CTooltip,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilSearch, cilList, cilInfo } from '@coreui/icons'
import { validarControl } from '../utils'
import CustomTableModal from '../../../../../components/CustomTableModal'
import ControlForm from './ControlForm'
import { toast } from 'react-toastify'

const ControlHistory = ({
  fetchControles,
  updateControl,
  deleteControl,
  tiposControl,
  lotes,
  empleados,
  tiposVacuna,
  bovinos,
  filtroTipoInicial,
}) => {
  const [controles, setControles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroOrigen, setFiltroOrigen] = useState('TODOS')
  const [filtroTipo, setFiltroTipo] = useState(filtroTipoInicial || 'TODOS')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    if (filtroTipoInicial) setFiltroTipo(filtroTipoInicial)
  }, [filtroTipoInicial])

  // Modal Detalle Lote (Lista Bovinos)
  const [modalLoteVisible, setModalLoteVisible] = useState(false)
  const [detallesLote, setDetallesLote] = useState([])
  const [loteSeleccionadoInfo, setLoteSeleccionadoInfo] = useState({ nombre: '', fecha: '' })

  // Modal Edición
  const [modalEditarVisible, setModalEditarVisible] = useState(false)
  const [editingControl, setEditingControl] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [editMastitisDetalle, setEditMastitisDetalle] = useState({})
  const [tipoSeleccionadoEdit, setTipoSeleccionadoEdit] = useState(null)

  // Modal Ver Detalle (Individual)
  const [modalVerVisible, setModalVerVisible] = useState(false)
  const [verControl, setVerControl] = useState(null)

  const cargarData = async () => {
    setLoading(true)
    try {
      const data = await fetchControles()
      setControles(data || [])
    } catch (error) {
      console.error(error)
      toast.error('Error al cargar historial')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarData()
  }, [])

  // Lógica de Agrupación y Filtrado (Memoizada)
  const dataProcesada = useMemo(() => {
    let filtrados = controles

    if (filtroOrigen === 'INDIVIDUAL') {
      filtrados = filtrados.filter((c) => !c.ttr_idlote)
    } else if (filtroOrigen === 'LOTE') {
      filtrados = filtrados.filter((c) => c.ttr_idlote)
    }

    if (filtroTipo && filtroTipo !== 'TODOS') {
      const tipoObj = tiposControl.find((t) => t.tma_codigo === filtroTipo)
      if (tipoObj) {
        filtrados = filtrados.filter((c) => c.ttr_idtipcon === tipoObj.tma_idtipcon)
      }
    }

    if (busqueda) {
      const term = busqueda.toLowerCase()
      filtrados = filtrados.filter(
        (c) =>
          (c.tipo_nombre && c.tipo_nombre.toLowerCase().includes(term)) ||
          (c.ttr_producto && c.ttr_producto.toLowerCase().includes(term)) ||
          (c.empleado_nombre && c.empleado_nombre.toLowerCase().includes(term)) ||
          (c.bovino_numero && String(c.bovino_numero).includes(term)) ||
          (c.ttr_resultado && c.ttr_resultado.toLowerCase().includes(term)),
      )
    }

    const resultado = []
    const grupos = {}

    filtrados.forEach((c) => {
      if (c.ttr_idlote) {
        const key = `${c.ttr_idlote}_${c.ttr_fechacon}_${c.ttr_idtipcon}_${c.ttr_producto}`
        if (!grupos[key]) {
          grupos[key] = {
            ...c,
            esGrupo: true,
            totalAnimales: 0,
            listaAnimales: [],
          }
          resultado.push(grupos[key])
        }
        grupos[key].totalAnimales += 1
        grupos[key].listaAnimales.push(c)
      } else {
        resultado.push({ ...c, esGrupo: false })
      }
    })

    return resultado.sort((a, b) => new Date(b.ttr_fechacon) - new Date(a.ttr_fechacon))
  }, [controles, filtroOrigen, filtroTipo, busqueda, tiposControl])

  // -- HANDLERS --

  const handleVerLote = (grupo) => {
    const lote = lotes.find((l) => l.tma_idlote === grupo.ttr_idlote)
    const nombreLote = lote ? lote.tma_nomlote : 'Lote Desconocido'
    setDetallesLote(grupo.listaAnimales)
    setLoteSeleccionadoInfo({
      title: `Detalle Aplicación: ${nombreLote} - ${grupo.tipo_nombre}`,
      fecha: new Date(grupo.ttr_fechacon).toLocaleDateString(),
    })
    setModalLoteVisible(true)
  }

  const handleVerIndividual = (control) => {
    setVerControl(control)
    setModalVerVisible(true)
  }

  const handleEdit = (control) => {
    setEditingControl(control)

    // Preparar formData para ControlForm
    setEditFormData({
      ttr_idbovino: control.ttr_idbovino,
      ttr_fechacon: control.ttr_fechacon ? control.ttr_fechacon.split('T')[0] : '',
      ttr_idempldo: control.ttr_idempldo,
      ttr_producto: control.ttr_producto,
      ttr_lote: control.ttr_lote || '',
      ttr_dosis: control.ttr_dosis,
      ttr_viaadmin: control.ttr_viaadmin,
      ttr_resultado: control.ttr_resultado,
      ttr_proxfech: control.ttr_proxfech ? control.ttr_proxfech.split('T')[0] : '',
      ttr_observa: control.ttr_observa || '',
      ttr_idlote: control.ttr_idlote || '',
    })

    setEditMastitisDetalle({})

    const tipo = tiposControl.find((t) => t.tma_idtipcon === control.ttr_idtipcon)
    setTipoSeleccionadoEdit(tipo)

    setModalEditarVisible(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editingControl) return

    const { isValid, error } = validarControl(
      editFormData,
      'INDIVIDUAL',
      tipoSeleccionadoEdit?.tma_codigo,
    )
    if (!isValid) {
      return toast.warning(error)
    }

    try {
      const dataToUpdate = {
        ...editFormData,
      }
      await updateControl(editingControl.ttr_idcontsa, dataToUpdate)
      toast.success('Control actualizado')
      setModalEditarVisible(false)
      setEditingControl(null)
      cargarData()
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await deleteControl(id)
        toast.success('Registro eliminado')
        cargarData()
      } catch (error) {
        console.error(error)
        toast.error('Error al eliminar')
      }
    }
  }

  const columnsModal = [
    { key: 'bovino_numero', label: 'Bovino Nº' },
    { key: 'ttr_resultado', label: 'Resultado' },
    { key: 'ttr_observa', label: 'Observación' },
  ]

  return (
    <div>
      {/* Filtros */}
      <CRow className="mb-4">
        <CCol md={4}>
          <CFormInput
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            icon={<CIcon icon={cilSearch} />}
          />
        </CCol>
        <CCol md={3}>
          <CFormSelect value={filtroOrigen} onChange={(e) => setFiltroOrigen(e.target.value)}>
            <option value="TODOS">Todos los Orígenes</option>
            <option value="INDIVIDUAL">Solo Individual</option>
            <option value="LOTE">Solo por Lote</option>
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormSelect value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="TODOS">Todos los Tipos</option>
            {tiposControl.map((t) => (
              <option key={t.tma_idtipcon} value={t.tma_codigo}>
                {t.tma_nombre}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={2} className="text-end">
          <CButton color="light" onClick={cargarData}>
            Actualizar
          </CButton>
        </CCol>
      </CRow>

      {/* Tabla */}
      {loading ? (
        <div className="text-center my-5">
          <CSpinner color="primary" />
        </div>
      ) : (
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Origen</CTableHeaderCell>
              <CTableHeaderCell>Tipo</CTableHeaderCell>
              <CTableHeaderCell>Producto / Dosis</CTableHeaderCell>
              <CTableHeaderCell>Empleado</CTableHeaderCell>
              <CTableHeaderCell>Resultado</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {dataProcesada.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan="7" className="text-center py-4">
                  No se encontraron registros.
                </CTableDataCell>
              </CTableRow>
            ) : (
              dataProcesada.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    {new Date(item.ttr_fechacon).toLocaleDateString()}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.esGrupo ? (
                      <CBadge color="info" shape="rounded-pill">
                        Lote ({item.totalAnimales})
                      </CBadge>
                    ) : (
                      <span>
                        Bovino: <b>{item.bovino_numero || 'N/A'}</b>
                      </span>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={item.tipo_color}>{item.tipo_nombre}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.ttr_producto}</div>
                    <small className="text-muted">
                      {item.ttr_dosis} - {item.ttr_viaadmin}
                    </small>
                  </CTableDataCell>
                  <CTableDataCell>{item.empleado_nombre || '-'}</CTableDataCell>
                  <CTableDataCell>{item.ttr_resultado}</CTableDataCell>
                  <CTableDataCell>
                    {item.esGrupo ? (
                      <CTooltip content="Ver bovinos del lote">
                        <CButton
                          color="warning"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVerLote(item)}
                        >
                          <CIcon icon={cilList} />
                        </CButton>
                      </CTooltip>
                    ) : (
                      <>
                        <CTooltip content="Ver detalles">
                          <CButton
                            color="info"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerIndividual(item)}
                            className="me-1"
                          >
                            <CIcon icon={cilInfo} />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Editar">
                          <CButton
                            color="primary"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="me-1"
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Eliminar">
                          <CButton
                            color="danger"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.ttr_idcontsa)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTooltip>
                      </>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      )}

      {/* Modal Detalle Lote */}
      <CustomTableModal
        visible={modalLoteVisible}
        onClose={() => setModalLoteVisible(false)}
        title={loteSeleccionadoInfo.title}
        data={detallesLote}
        columns={columnsModal}
        readOnly={true}
        onSelect={() => {}}
        searchPlaceholder="Buscar bovino..."
      />

      {/* Modal Editar */}
      <CModal visible={modalEditarVisible} onClose={() => setModalEditarVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Editar Control Sanitario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {editingControl && (
            <ControlForm
              tiposControl={tiposControl}
              tipoSeleccionado={tipoSeleccionadoEdit}
              setTipoSeleccionado={setTipoSeleccionadoEdit}
              aplicacion="INDIVIDUAL"
              setAplicacion={() => {}}
              formData={editFormData}
              setFormData={setEditFormData}
              bovinos={bovinos}
              lotes={lotes}
              empleados={empleados}
              tiposVacuna={tiposVacuna}
              handleSubmit={handleUpdate}
              loading={false}
              resetFormulario={() => {}}
              mastitisDetalle={editMastitisDetalle}
              setMastitisDetalle={setEditMastitisDetalle}
              onBovinoChange={() => {}}
              onLoteChange={() => {}}
            />
          )}
        </CModalBody>
      </CModal>

      {/* Modal Ver Detalle Individual */}
      <CModal visible={modalVerVisible} onClose={() => setModalVerVisible(false)}>
        <CModalHeader>
          <CModalTitle>Detalle de Control</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {verControl && (
            <div>
              <p>
                <strong>Bovino:</strong> {verControl.bovino_numero}
              </p>
              <p>
                <strong>Fecha:</strong> {new Date(verControl.ttr_fechacon).toLocaleDateString()}
              </p>
              <p>
                <strong>Tipo:</strong>{' '}
                <CBadge color={verControl.tipo_color}>{verControl.tipo_nombre}</CBadge>
              </p>
              <p>
                <strong>Producto:</strong> {verControl.ttr_producto}
              </p>
              <p>
                <strong>Lote del Producto:</strong> {verControl.ttr_lote || '-'}
              </p>
              <p>
                <strong>Dosis:</strong> {verControl.ttr_dosis}
              </p>
              <p>
                <strong>Vía Admin:</strong> {verControl.ttr_viaadmin}
              </p>
              <p>
                <strong>Resultado:</strong> {verControl.ttr_resultado}
              </p>
              <p>
                <strong>Empleado:</strong> {verControl.empleado_nombre}
              </p>
              <p>
                <strong>Próxima Fecha:</strong>{' '}
                {verControl.ttr_proxfech
                  ? new Date(verControl.ttr_proxfech).toLocaleDateString()
                  : '-'}
              </p>
              <p>
                <strong>Observaciones:</strong> {verControl.ttr_observa || '-'}
              </p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVerVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default ControlHistory
