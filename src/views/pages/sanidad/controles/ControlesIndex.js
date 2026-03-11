import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import * as sanidadService from '../../../../api/sanidadService'
import useControlesData from './hooks/useControlesData'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { validarControl } from './utils'
import ControlForm from './components/ControlForm'
import ControlTables from './components/ControlTables'
import ControlHistory from './components/ControlHistory'

const ControlesIndex = () => {
  const [searchParams] = useSearchParams()
  const {
    tiposControl,
    bovinos,
    lotes,
    empleados,
    tiposVacuna,
    loadingData,
    errorData,
    tipoSeleccionado,
    setTipoSeleccionado,
    fetchGlobalControles,
    deleteControl,
    updateControl,
  } = useControlesData()

  // Estados Locales
  const [activeKey, setActiveKey] = useState(1) // 1: Nuevo, 2: Historial
  const [controles, setControles] = useState([])
  const [controlesLote, setControlesLote] = useState([])

  const [loading, setLoading] = useState(false)
  const [aplicacion, setAplicacion] = useState('INDIVIDUAL')

  // Manejo de params URL
  useEffect(() => {
    const tab = searchParams.get('tab')
    const tipo = searchParams.get('tipo')

    if (tab === 'historial') {
      setActiveKey(2)
    }

    if (tipo && tiposControl.length > 0) {
      const found = tiposControl.find((t) => t.tma_codigo === tipo)
      if (found) {
        setTipoSeleccionado(found)
      }
    }
  }, [searchParams, tiposControl, setTipoSeleccionado])

  // Formulario
  const [formData, setFormData] = useState({
    ttr_idbovino: '',
    ttr_fechacon: new Date().toISOString().split('T')[0],
    ttr_idempldo: '',
    ttr_producto: '',
    ttr_lote: '',
    ttr_dosis: '',
    ttr_viaadmin: '',
    ttr_resultado: '',
    ttr_proxfech: '',
    ttr_observa: '',
    ttr_idlote: '',
  })

  // Detalle de mastitis
  const [mastitisDetalle, setMastitisDetalle] = useState({
    ttr_cuarto1: false,
    ttr_cuarto2: false,
    ttr_cuarto3: false,
    ttr_cuarto4: false,
    ttr_gravedad: '',
    ttr_tipomast: '',
    ttr_trataesp: '',
  })

  // Efecto para errores de carga inicial
  useEffect(() => {
    if (errorData) {
      toast.error(errorData)
    }
  }, [errorData])

  // Cargar controles individuales
  const cargarControlesBovino = async (idBovino) => {
    if (!idBovino) return
    try {
      const data = await sanidadService.getControlesSanitariosByBovino(idBovino)
      setControles(data)
    } catch (error) {
      console.error('Error cargando controles:', error)
      // toast.error('Error al cargar historial del bovino')
    }
  }

  // Cargar controles por lote
  const cargarControlesLote = async (idLote) => {
    if (!idLote) return
    try {
      const data = await sanidadService.getControlesPorLote(idLote)
      setControlesLote(data)
    } catch (error) {
      console.error('Error cargando controles de lote:', error)
      // toast.error('Error al cargar historial del lote')
    }
  }

  const resetFormulario = () => {
    setFormData({
      ttr_idbovino: '',
      ttr_fechacon: new Date().toISOString().split('T')[0],
      ttr_idempldo: '',
      ttr_producto: '',
      ttr_lote: '',
      ttr_dosis: '',
      ttr_viaadmin: '',
      ttr_resultado: '',
      ttr_proxfech: '',
      ttr_observa: '',
      ttr_idlote: '',
    })
    setMastitisDetalle({
      ttr_cuarto1: false,
      ttr_cuarto2: false,
      ttr_cuarto3: false,
      ttr_cuarto4: false,
      ttr_gravedad: '',
      ttr_tipomast: '',
      ttr_trataesp: '',
    })
    setControles([])
    setControlesLote([])
    setAplicacion('INDIVIDUAL')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // --- VALIDACIONES CENTRALIZADAS ---
    const { isValid, error } = validarControl(formData, aplicacion, tipoSeleccionado?.tma_codigo)
    if (!isValid) {
      return toast.warning(error)
    }

    setLoading(true)

    try {
      const controlData = {
        ...formData,
        ttr_idtipcon: tipoSeleccionado.tma_idtipcon,
        aplicacion,
      }

      if (tipoSeleccionado.tma_requieredetalle) {
        controlData.detalle_mastitis = mastitisDetalle
      }

      await sanidadService.createControlSanitario(controlData)
      toast.success('Control sanitario creado exitosamente')

      // Limpiar formulario parcialmente
      setFormData({
        ...formData,
        ttr_producto: '',
        ttr_lote: '',
        ttr_dosis: '',
        ttr_resultado: '',
        ttr_proxfech: '',
        ttr_observa: '',
      })

      // Recargar historial local y cambiar tab
      if (aplicacion === 'INDIVIDUAL' && formData.ttr_idbovino) {
        cargarControlesBovino(formData.ttr_idbovino)
      } else if (aplicacion === 'LOTE' && formData.ttr_idlote) {
        cargarControlesLote(formData.ttr_idlote)
      }

      // Ir a la pestaña de historial tras un breve delay o inmediatamente
      // setActiveKey(2) // Opcional: si el usuario quiere ver lo que creó
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Error al crear control'
      const errorDetail = error.response?.data?.error || ''
      toast.error(`${errorMsg} ${errorDetail ? ': ' + errorDetail : ''}`)
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return <div>Cargando datos...</div>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink href="#" active={activeKey === 1} onClick={() => setActiveKey(1)}>
                  Nuevo Control
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" active={activeKey === 2} onClick={() => setActiveKey(2)}>
                  Historial
                </CNavLink>
              </CNavItem>
            </CNav>
          </CCardHeader>
          <CCardBody>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                <ControlForm
                  tiposControl={tiposControl}
                  tipoSeleccionado={tipoSeleccionado}
                  setTipoSeleccionado={setTipoSeleccionado}
                  aplicacion={aplicacion}
                  setAplicacion={setAplicacion}
                  formData={formData}
                  setFormData={setFormData}
                  bovinos={bovinos}
                  lotes={lotes}
                  empleados={empleados}
                  tiposVacuna={tiposVacuna}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  resetFormulario={resetFormulario}
                  mastitisDetalle={mastitisDetalle}
                  setMastitisDetalle={setMastitisDetalle}
                  onBovinoChange={cargarControlesBovino}
                  onLoteChange={cargarControlesLote}
                />

                {/* Tabla de referencia rápida del bovino/lote seleccionado actualmente */}
                <div className="mt-5">
                  <ControlTables
                    aplicacion={aplicacion}
                    formData={formData}
                    controles={controles}
                    controlesLote={controlesLote}
                  />
                </div>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                <ControlHistory
                  fetchControles={fetchGlobalControles}
                  deleteControl={deleteControl}
                  updateControl={updateControl}
                  tiposControl={tiposControl}
                  lotes={lotes}
                  empleados={empleados}
                  bovinos={bovinos}
                  tiposVacuna={tiposVacuna}
                  filtroTipoInicial={searchParams.get('tipo')}
                />
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
      <ToastContainer position="top-right" autoClose={5000} />
    </CRow>
  )
}

export default ControlesIndex
