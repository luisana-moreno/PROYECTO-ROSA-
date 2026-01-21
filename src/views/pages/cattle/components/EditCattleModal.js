import React, { useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
  CForm,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'
import { formatDateToYYYYMMDD } from 'src/utils/dateFormatter'
import SearchableSelect from './SearchableSelect'

const EditCattleModal = ({
  editVisible,
  setEditVisible,
  currentCattle,
  setCurrentCattle,
  handleEditCattle,
  razas,
  colores,
  etapas,
  estados,
  males,
  females,
}) => {
  const today = new Date().toISOString().split('T')[0]

  // Inicializar flags de padres externos cuando se abre el modal
  useEffect(() => {
    if (editVisible && currentCattle) {
      // Determinar si el padre es externo
      const isPadreExterno = !!(currentCattle.ttrPadreExterno && !currentCattle.ttrIdpadre)
      // Determinar si la madre es externa
      const isMadreExterna = !!(currentCattle.ttrMadreExterna && !currentCattle.ttrIdmadre)

      setCurrentCattle({
        ...currentCattle,
        padreExterno: isPadreExterno,
        madreExterna: isMadreExterna,
      })
    }
  }, [editVisible, currentCattle?.ttrIdbovino])

  const validateForm = () => {
    if (
      !currentCattle.ttrNumerobv ||
      !currentCattle.ttrIdrazabo ||
      !currentCattle.ttrFecnacim ||
      !currentCattle.ttrIdcolorb ||
      !currentCattle.ttrPesokilo ||
      !currentCattle.ttrIdetapav ||
      !currentCattle.ttrIdestadb ||
      !currentCattle.ttrSexo
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }

    if (new Date(currentCattle.ttrFecnacim) > new Date(today)) {
      toast.error('La fecha de nacimiento no puede ser una fecha futura.')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      handleEditCattle()
    }
  }

  console.log(currentCattle)
  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
      backdrop="static"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Editar Bovino</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Número de Arete *</CFormLabel>
              <CFormInput
                placeholder="Número de arete"
                value={currentCattle?.ttrNumerobv || ''}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrNumerobv: e.target.value })
                }
                required
              />
              <small className="text-muted">Código de identificación del bovino</small>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Fecha de Nacimiento *</CFormLabel>
              <CFormInput
                type="date"
                value={formatDateToYYYYMMDD(currentCattle?.ttrFecnacim) || ''}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrFecnacim: e.target.value })
                }
                max={today}
                required
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Raza *</CFormLabel>
              <CFormSelect
                value={String(currentCattle?.ttrIdrazabo || '')}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrIdrazabo: Number(e.target.value) })
                }
                required
              >
                <option value="">Seleccione la raza</option>
                {razas.map((raza) => (
                  <option key={raza.tmaIdrazab} value={String(raza.tmaIdrazab)}>
                    {raza.tmaNomraza}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Color *</CFormLabel>
              <CFormSelect
                value={String(currentCattle?.ttrIdcolorb || '')}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrIdcolorb: Number(e.target.value) })
                }
                required
              >
                <option value="">Seleccione el color</option>
                {colores.map((color) => (
                  <option key={color.tmaIdcolbo} value={String(color.tmaIdcolbo)}>
                    {color.tmaNomcolb}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Peso (Kg) *</CFormLabel>
              <CFormInput
                type="number"
                placeholder="Peso en kilogramos"
                value={currentCattle?.ttrPesokilo || ''}
                onChange={(e) =>
                  setCurrentCattle({
                    ...currentCattle,
                    ttrPesokilo: parseFloat(e.target.value) || '',
                  })
                }
                step="0.01"
                min="0"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Etapa *</CFormLabel>
              <CFormSelect
                value={String(currentCattle?.ttrIdetapav || '')}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrIdetapav: Number(e.target.value) })
                }
                required
              >
                <option value="">Seleccione la etapa</option>
                {etapas.map((etapa) => (
                  <option key={etapa.tmaIdetabo} value={String(etapa.tmaIdetabo)}>
                    {etapa.tmaNometab}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Estado *</CFormLabel>
              <CFormSelect
                value={String(currentCattle?.ttrIdestadb || '')}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrIdestadb: Number(e.target.value) })
                }
                required
              >
                <option value="">Seleccione el estado</option>
                {estados.map((estado) => (
                  <option key={estado.tmaIdestbo} value={String(estado.tmaIdestbo)}>
                    {estado.tmaNomestb}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          {/* Sexo */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Sexo *</CFormLabel>
              <div>
                <CFormCheck
                  type="radio"
                  name="sexoEdit"
                  id="sexoMachoEdit"
                  label="Macho"
                  value="Macho"
                  checked={currentCattle?.ttrSexo === 'Macho'}
                  onChange={(e) => setCurrentCattle({ ...currentCattle, ttrSexo: e.target.value })}
                  inline
                />
                <CFormCheck
                  type="radio"
                  name="sexoEdit"
                  id="sexoHembraEdit"
                  label="Hembra"
                  value="Hembra"
                  checked={currentCattle?.ttrSexo === 'Hembra'}
                  onChange={(e) => setCurrentCattle({ ...currentCattle, ttrSexo: e.target.value })}
                  inline
                />
              </div>
            </CCol>
          </CRow>

          {/* Genealogía: Padre */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Padre </CFormLabel>
              <div className="mb-2">
                <CFormCheck
                  type="radio"
                  name="tipoPadreEdit"
                  id="padreFincaEdit"
                  label="De la finca"
                  checked={!currentCattle?.padreExterno}
                  onChange={() =>
                    setCurrentCattle({ ...currentCattle, padreExterno: false, ttrPadreExterno: '' })
                  }
                  inline
                />
                <CFormCheck
                  type="radio"
                  name="tipoPadreEdit"
                  id="padreExternoEdit"
                  label="Externo (fuera de la finca)"
                  checked={currentCattle?.padreExterno === true}
                  onChange={() =>
                    setCurrentCattle({ ...currentCattle, padreExterno: true, ttrIdpadre: null })
                  }
                  inline
                />
              </div>
              {currentCattle?.padreExterno ? (
                <>
                  <CFormInput
                    placeholder="Nombre del padre externo"
                    value={currentCattle?.ttrPadreExterno || ''}
                    onChange={(e) =>
                      setCurrentCattle({ ...currentCattle, ttrPadreExterno: e.target.value })
                    }
                  />
                  <small className="text-muted">Ingrese el nombre/identificación del padre</small>
                </>
              ) : (
                <>
                  <SearchableSelect
                    options={males.map((macho) => ({
                      value: macho.ttrIdbovino,
                      label: `${macho.ttrNumerobv} - ${macho.razaNombre}`,
                    }))}
                    value={currentCattle?.ttrIdpadre}
                    onChange={(value) => setCurrentCattle({ ...currentCattle, ttrIdpadre: value })}
                    placeholder="Buscar toro reproductor..."
                    emptyMessage="No se encontraron machos"
                  />
                  <small className="text-muted">Escriba para buscar el toro</small>
                </>
              )}
            </CCol>
          </CRow>

          {/* Genealogía: Madre */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Madre </CFormLabel>
              <div className="mb-2">
                <CFormCheck
                  type="radio"
                  name="tipoMadreEdit"
                  id="madreFincaEdit"
                  label="De la finca"
                  checked={!currentCattle?.madreExterna}
                  onChange={() =>
                    setCurrentCattle({ ...currentCattle, madreExterna: false, ttrMadreExterna: '' })
                  }
                  inline
                />
                <CFormCheck
                  type="radio"
                  name="tipoMadreEdit"
                  id="madreExternaEdit"
                  label="Externa (fuera de la finca)"
                  checked={currentCattle?.madreExterna === true}
                  onChange={() =>
                    setCurrentCattle({ ...currentCattle, madreExterna: true, ttrIdmadre: null })
                  }
                  inline
                />
              </div>
              {currentCattle?.madreExterna ? (
                <>
                  <CFormInput
                    placeholder="Nombre de la madre externa"
                    value={currentCattle?.ttrMadreExterna || ''}
                    onChange={(e) =>
                      setCurrentCattle({ ...currentCattle, ttrMadreExterna: e.target.value })
                    }
                  />
                  <small className="text-muted">Ingrese el nombre/identificación de la madre</small>
                </>
              ) : (
                <>
                  <SearchableSelect
                    options={females.map((hembra) => ({
                      value: hembra.ttrIdbovino,
                      label: `${hembra.ttrNumerobv} - ${hembra.razaNombre}`,
                    }))}
                    value={currentCattle?.ttrIdmadre}
                    onChange={(value) => setCurrentCattle({ ...currentCattle, ttrIdmadre: value })}
                    placeholder="Buscar vaca madre..."
                    emptyMessage="No se encontraron hembras"
                  />
                  <small className="text-muted">Escriba para buscar la vaca</small>
                </>
              )}
            </CCol>
          </CRow>

          {/* Información reproductiva (solo para hembras) */}
          {currentCattle?.ttrSexo === 'Hembra' && (
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Número de Partos</CFormLabel>
                <CFormInput
                  type="number"
                  min="0"
                  value={currentCattle?.ttrNumpartos || 0}
                  onChange={(e) =>
                    setCurrentCattle({
                      ...currentCattle,
                      ttrNumpartos: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <small className="text-muted">Cantidad de partos registrados</small>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Fecha Último Parto</CFormLabel>
                <CFormInput
                  type="date"
                  value={formatDateToYYYYMMDD(currentCattle?.ttrFecultpar) || ''}
                  onChange={(e) =>
                    setCurrentCattle({ ...currentCattle, ttrFecultpar: e.target.value })
                  }
                  max={today}
                />
                <small className="text-muted">Fecha del parto más reciente</small>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="success" type="submit">
            <CIcon icon={cilSave} className="me-2" />
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default EditCattleModal
