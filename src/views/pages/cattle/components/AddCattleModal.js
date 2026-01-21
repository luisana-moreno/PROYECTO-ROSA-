import React, { useState } from 'react'
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
  CAlert,
  CFormCheck,
  CProgress,
  CProgressBar,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilArrowRight, cilArrowLeft, cilCheckCircle, cilWarning } from '@coreui/icons'
import { toast } from 'react-toastify'
import { cattleService } from 'src/api/cattleService'
import SearchableSelect from './SearchableSelect'

const AddCattleModal = ({
  visible,
  setVisible,
  addCattleForm,
  setAddCattleForm,
  handleAddCattle,
  razas,
  colores,
  etapas,
  estados,
  males,
  females,
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [checkingNumber, setCheckingNumber] = useState(false)
  const [numberExists, setNumberExists] = useState(false)
  const totalSteps = 5
  const today = new Date().toISOString().split('T')[0]

  // Verificar si el número de bovino ya existe
  const checkBovinoNumber = async (numero) => {
    if (!numero) return false

    setCheckingNumber(true)
    try {
      const allCattle = await cattleService.getAllCattle()
      console.log('Verificando número:', numero)
      console.log('Total bovinos:', allCattle.length)

      // Convertir a string para comparación y trim espacios
      const numeroToCheck = String(numero).trim()

      const exists = allCattle.some((bovino) => {
        const bovinoNum = String(bovino.ttrNumerobv || '').trim()
        const match = bovinoNum === numeroToCheck
        if (match) {
          console.log('✗ Número duplicado encontrado:', bovinoNum)
        }
        return match
      })

      console.log('Resultado:', exists ? 'YA EXISTE' : 'DISPONIBLE')
      setNumberExists(exists)
      return exists
    } catch (error) {
      console.error('Error al verificar número:', error)
      return false
    } finally {
      setCheckingNumber(false)
    }
  }

  const validateStep = async (step) => {
    switch (step) {
      case 1: // Información básica
        if (
          !addCattleForm.numeroBovino ||
          !addCattleForm.fechaNacimiento ||
          !addCattleForm.idRazaBovino
        ) {
          toast.error('Complete los campos obligatorios: Número, Fecha y Raza')
          return false
        }
        if (new Date(addCattleForm.fechaNacimiento) > new Date(today)) {
          toast.error('La fecha de nacimiento no puede ser futura')
          return false
        }
        // Validar que el número no exista
        const exists = await checkBovinoNumber(addCattleForm.numeroBovino)
        if (exists) {
          toast.error('Ya existe un bovino con este número de arete')
          return false
        }
        return true
      case 2: // Clasificación
        if (
          !addCattleForm.idColorBovino ||
          !addCattleForm.pesoKilo ||
          !addCattleForm.idEtapaBovino ||
          !addCattleForm.idEstadoBovino ||
          !addCattleForm.sexo
        ) {
          toast.error('Complete todos los campos de clasificación')
          return false
        }
        return true
      case 3: // Reproducción - opcional
        return true
      case 4: // Genealogía - opcional
        return true
      default:
        return true
    }
  }

  const nextStep = async () => {
    console.log('🔄 nextStep llamado - Paso actual:', currentStep)
    const isValid = await validateStep(currentStep)
    console.log('✓ Validación paso', currentStep, ':', isValid ? 'VÁLIDO' : 'INVÁLIDO')
    if (isValid) {
      const newStep = Math.min(currentStep + 1, totalSteps)
      console.log('➡️ Avanzando a paso:', newStep)
      setCurrentStep(newStep)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = await validateStep(currentStep)
    if (isValid) {
      handleAddCattle()
      setCurrentStep(1) // Reset para próximo uso
      setNumberExists(false)
    }
  }

  const handleClose = () => {
    setVisible(false)
    setCurrentStep(1)
    setNumberExists(false)
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Información Básica'
      case 2:
        return 'Clasificación'
      case 3:
        return 'Información Reproductiva (Opcional)'
      case 4:
        return 'Genealogía (Opcional)'
      case 5:
        return 'Confirmar y Guardar'
      default:
        return ''
    }
  }

  return (
    <CModal alignment="center" visible={visible} onClose={handleClose} backdrop="static" size="lg">
      <CModalHeader>
        <CModalTitle>Nuevo Bovino - {getStepTitle()}</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody>
          {/* Progress bar */}
          <div className="mb-4">
            <CProgress>
              <CProgressBar value={(currentStep / totalSteps) * 100} color="success">
                Paso {currentStep} de {totalSteps}
              </CProgressBar>
            </CProgress>
          </div>

          {/* Step 1: Información Básica */}
          {currentStep === 1 && (
            <>
              <CAlert color="info" className="mb-3">
                <strong>Paso 1:</strong> Ingrese la información básica del bovino
              </CAlert>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Número de Arete *</CFormLabel>
                  <CFormInput
                    placeholder="Ej: 8020"
                    value={addCattleForm.numeroBovino}
                    onChange={(e) => {
                      setAddCattleForm({ ...addCattleForm, numeroBovino: e.target.value })
                      setNumberExists(false) // Reset al cambiar
                    }}
                    onBlur={() => {
                      if (addCattleForm.numeroBovino) {
                        checkBovinoNumber(addCattleForm.numeroBovino)
                      }
                    }}
                    required
                  />
                  {checkingNumber && (
                    <small className="text-info d-flex align-items-center mt-1">
                      <CSpinner size="sm" className="me-1" />
                      Verificando número...
                    </small>
                  )}
                  {!checkingNumber && numberExists && (
                    <small className="text-danger d-flex align-items-center mt-1">
                      <CIcon icon={cilWarning} className="me-1" />
                      Este número ya está registrado
                    </small>
                  )}
                  {!checkingNumber && addCattleForm.numeroBovino && !numberExists && (
                    <small className="text-success d-flex align-items-center mt-1">
                      <CIcon icon={cilCheckCircle} className="me-1" />
                      Número disponible
                    </small>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Fecha de Nacimiento *</CFormLabel>
                  <CFormInput
                    type="date"
                    value={addCattleForm.fechaNacimiento}
                    onChange={(e) =>
                      setAddCattleForm({ ...addCattleForm, fechaNacimiento: e.target.value })
                    }
                    max={today}
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Raza *</CFormLabel>
                  <CFormSelect
                    value={addCattleForm.idRazaBovino}
                    onChange={(e) =>
                      setAddCattleForm({ ...addCattleForm, idRazaBovino: Number(e.target.value) })
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
              </CRow>
            </>
          )}

          {/* Step 2: Clasificación */}
          {currentStep === 2 && (
            <>
              <CAlert color="info" className="mb-3">
                <strong>Paso 2:</strong> Clasifique el bovino
              </CAlert>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Color *</CFormLabel>
                  <CFormSelect
                    value={addCattleForm.idColorBovino}
                    onChange={(e) =>
                      setAddCattleForm({ ...addCattleForm, idColorBovino: Number(e.target.value) })
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
                <CCol md={6}>
                  <CFormLabel>Peso (Kg) *</CFormLabel>
                  <CFormInput
                    type="number"
                    placeholder="Peso en kilogramos"
                    value={addCattleForm.pesoKilo}
                    onChange={(e) =>
                      setAddCattleForm({
                        ...addCattleForm,
                        pesoKilo: parseFloat(e.target.value) || '',
                      })
                    }
                    step="0.01"
                    min="0"
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Etapa *</CFormLabel>
                  <CFormSelect
                    value={addCattleForm.idEtapaBovino}
                    onChange={(e) =>
                      setAddCattleForm({ ...addCattleForm, idEtapaBovino: Number(e.target.value) })
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
                <CCol md={6}>
                  <CFormLabel>Estado *</CFormLabel>
                  <CFormSelect
                    value={addCattleForm.idEstadoBovino}
                    onChange={(e) =>
                      setAddCattleForm({ ...addCattleForm, idEstadoBovino: Number(e.target.value) })
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

              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Sexo *</CFormLabel>
                  <div>
                    <CFormCheck
                      type="radio"
                      name="sexo"
                      id="sexoMacho"
                      label="Macho"
                      value="Macho"
                      checked={addCattleForm.sexo === 'Macho'}
                      onChange={(e) => setAddCattleForm({ ...addCattleForm, sexo: e.target.value })}
                      inline
                    />
                    <CFormCheck
                      type="radio"
                      name="sexo"
                      id="sexoHembra"
                      label="Hembra"
                      value="Hembra"
                      checked={addCattleForm.sexo === 'Hembra'}
                      onChange={(e) => setAddCattleForm({ ...addCattleForm, sexo: e.target.value })}
                      inline
                    />
                  </div>
                </CCol>
              </CRow>
            </>
          )}

          {/* Step 4: Genealogía */}
          {currentStep === 4 && (
            <>
              <CAlert color="success" className="mb-3">
                <strong>Paso 4:</strong> Registre la genealogía (opcional)
              </CAlert>

              {/* Padre */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Padre (Sire)</CFormLabel>
                  <div className="mb-2">
                    <CFormCheck
                      type="radio"
                      name="tipoPadre"
                      id="padreFinca"
                      label="De la finca"
                      checked={!addCattleForm.padreExterno}
                      onChange={() =>
                        setAddCattleForm({
                          ...addCattleForm,
                          padreExterno: false,
                          ttrPadreExterno: '',
                        })
                      }
                      inline
                    />
                    <CFormCheck
                      type="radio"
                      name="tipoPadre"
                      id="padreExterno"
                      label="Externo (fuera de la finca)"
                      checked={addCattleForm.padreExterno === true}
                      onChange={() =>
                        setAddCattleForm({ ...addCattleForm, padreExterno: true, idPadre: null })
                      }
                      inline
                    />
                  </div>
                  {addCattleForm.padreExterno ? (
                    <>
                      <CFormInput
                        placeholder="Nombre del padre externo"
                        value={addCattleForm.ttrPadreExterno || ''}
                        onChange={(e) =>
                          setAddCattleForm({ ...addCattleForm, ttrPadreExterno: e.target.value })
                        }
                      />
                      <small className="text-muted">Ingrese el nombre/identificación</small>
                    </>
                  ) : (
                    <>
                      <SearchableSelect
                        options={males.map((macho) => ({
                          value: macho.ttrIdbovino,
                          label: `${macho.ttrNumerobv} - ${macho.razaNombre}`,
                        }))}
                        value={addCattleForm.idPadre}
                        onChange={(value) => setAddCattleForm({ ...addCattleForm, idPadre: value })}
                        placeholder="Buscar toro reproductor..."
                        emptyMessage="No se encontraron machos"
                      />
                      <small className="text-muted">Escriba para buscar el toro</small>
                    </>
                  )}
                </CCol>
              </CRow>

              {/* Madre */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Madre (Dam)</CFormLabel>
                  <div className="mb-2">
                    <CFormCheck
                      type="radio"
                      name="tipoMadre"
                      id="madreFinca"
                      label="De la finca"
                      checked={!addCattleForm.madreExterna}
                      onChange={() =>
                        setAddCattleForm({
                          ...addCattleForm,
                          madreExterna: false,
                          ttrMadreExterna: '',
                        })
                      }
                      inline
                    />
                    <CFormCheck
                      type="radio"
                      name="tipoMadre"
                      id="madreExterna"
                      label="Externa (fuera de la finca)"
                      checked={addCattleForm.madreExterna === true}
                      onChange={() =>
                        setAddCattleForm({ ...addCattleForm, madreExterna: true, idMadre: null })
                      }
                      inline
                    />
                  </div>
                  {addCattleForm.madreExterna ? (
                    <>
                      <CFormInput
                        placeholder="Nombre de la madre externa"
                        value={addCattleForm.ttrMadreExterna || ''}
                        onChange={(e) =>
                          setAddCattleForm({ ...addCattleForm, ttrMadreExterna: e.target.value })
                        }
                      />
                      <small className="text-muted">Ingrese el nombre/identificación</small>
                    </>
                  ) : (
                    <>
                      <SearchableSelect
                        options={females.map((hembra) => ({
                          value: hembra.ttrIdbovino,
                          label: `${hembra.ttrNumerobv} - ${hembra.razaNombre}`,
                        }))}
                        value={addCattleForm.idMadre}
                        onChange={(value) => setAddCattleForm({ ...addCattleForm, idMadre: value })}
                        placeholder="Buscar vaca madre..."
                        emptyMessage="No se encontraron hembras"
                      />
                      <small className="text-muted">Escriba para buscar la vaca</small>
                    </>
                  )}
                </CCol>
              </CRow>
            </>
          )}

          {/* Step 3: Información Reproductiva */}
          {currentStep === 3 && (
            <>
              <CAlert color="success" className="mb-3">
                <strong>Paso 3:</strong> Información reproductiva{' '}
                {addCattleForm.sexo !== 'Hembra' && '(solo para hembras)'}
              </CAlert>

              {addCattleForm.sexo === 'Hembra' ? (
                <>
                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CFormLabel>Número de Partos</CFormLabel>
                      <CFormInput
                        type="number"
                        min="0"
                        placeholder="0"
                        value={addCattleForm.numPartos || 0}
                        onChange={(e) =>
                          setAddCattleForm({
                            ...addCattleForm,
                            numPartos: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      <small className="text-muted">Cantidad de partos registrados</small>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel>Fecha Último Parto</CFormLabel>
                      <CFormInput
                        type="date"
                        value={addCattleForm.fecUltimoParto || ''}
                        onChange={(e) =>
                          setAddCattleForm({ ...addCattleForm, fecUltimoParto: e.target.value })
                        }
                        max={today}
                      />
                      <small className="text-muted">Fecha del parto más reciente</small>
                    </CCol>
                  </CRow>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">
                    La información reproductiva solo aplica para hembras.
                    <br />
                    Puede guardar el bovino o regresar para modificar datos.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Step 5: Confirmación */}
          {currentStep === 5 && (
            <>
              <CAlert color="primary" className="mb-3">
                <strong>Paso 5:</strong> Revise los datos antes de guardar
              </CAlert>

              <div className="border rounded p-3 bg-light">
                <h6 className="text-success mb-3">📋 Resumen del Bovino</h6>

                <CRow className="mb-2">
                  <CCol md={6}>
                    <strong>Número de Arete:</strong>
                  </CCol>
                  <CCol md={6}>{addCattleForm.numeroBovino}</CCol>
                </CRow>

                <CRow className="mb-2">
                  <CCol md={6}>
                    <strong>Sexo:</strong>
                  </CCol>
                  <CCol md={6}>{addCattleForm.sexo || 'No especificado'}</CCol>
                </CRow>

                <CRow className="mb-2">
                  <CCol md={6}>
                    <strong>Fecha de Nacimiento:</strong>
                  </CCol>
                  <CCol md={6}>{addCattleForm.fechaNacimiento}</CCol>
                </CRow>

                <CRow className="mb-2">
                  <CCol md={6}>
                    <strong>Peso:</strong>
                  </CCol>
                  <CCol md={6}>{addCattleForm.pesoKilo} kg</CCol>
                </CRow>

                {addCattleForm.sexo === 'Hembra' && addCattleForm.numPartos > 0 && (
                  <>
                    <hr />
                    <h6 className="text-info mb-2">🐄 Información Reproductiva</h6>
                    <CRow className="mb-2">
                      <CCol md={6}>
                        <strong>Número de Partos:</strong>
                      </CCol>
                      <CCol md={6}>{addCattleForm.numPartos}</CCol>
                    </CRow>
                    {addCattleForm.fecUltimoParto && (
                      <CRow className="mb-2">
                        <CCol md={6}>
                          <strong>Último Parto:</strong>
                        </CCol>
                        <CCol md={6}>{addCattleForm.fecUltimoParto}</CCol>
                      </CRow>
                    )}
                  </>
                )}

                {(addCattleForm.idPadre ||
                  addCattleForm.ttrPadreExterno ||
                  addCattleForm.idMadre ||
                  addCattleForm.ttrMadreExterna) && (
                  <>
                    <hr />
                    <h6 className="text-warning mb-2">🌳 Genealogía</h6>
                    {(addCattleForm.idPadre || addCattleForm.ttrPadreExterno) && (
                      <CRow className="mb-2">
                        <CCol md={6}>
                          <strong>Padre:</strong>
                        </CCol>
                        <CCol md={6}>
                          {addCattleForm.ttrPadreExterno ||
                            (addCattleForm.idPadre &&
                              males.find((m) => m.ttrIdbovino === addCattleForm.idPadre)
                                ?.ttrNumerobv) ||
                            'No especificado'}
                        </CCol>
                      </CRow>
                    )}
                    {(addCattleForm.idMadre || addCattleForm.ttrMadreExterna) && (
                      <CRow className="mb-2">
                        <CCol md={6}>
                          <strong>Madre:</strong>
                        </CCol>
                        <CCol md={6}>
                          {addCattleForm.ttrMadreExterna ||
                            (addCattleForm.idMadre &&
                              females.find((f) => f.ttrIdbovino === addCattleForm.idMadre)
                                ?.ttrNumerobv) ||
                            'No especificado'}
                        </CCol>
                      </CRow>
                    )}
                  </>
                )}
              </div>

              <CAlert color="info" className="mt-3 mb-0">
                <small>
                  ℹ️ Si los datos son correctos, haga clic en "Guardar Bovino". Si desea modificar
                  algo, use el botón "Anterior".
                </small>
              </CAlert>
            </>
          )}
        </CModalBody>
        <CModalFooter className="d-flex justify-content-between">
          <CButton color="secondary" onClick={handleClose}>
            Cancelar
          </CButton>
          <div>
            {currentStep > 1 && (
              <CButton color="light" onClick={prevStep} className="me-2">
                <CIcon icon={cilArrowLeft} className="me-1" />
                Anterior
              </CButton>
            )}
            {currentStep < totalSteps ? (
              <CButton color="success" onClick={nextStep} type="button">
                Siguiente
                <CIcon icon={cilArrowRight} className="ms-1" />
              </CButton>
            ) : (
              <CButton color="success" type="submit">
                <CIcon icon={cilSave} className="me-1" />
                Guardar Bovino
              </CButton>
            )}
          </div>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default AddCattleModal
