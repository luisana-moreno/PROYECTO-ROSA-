import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'

const EditClientModal = ({
  editVisible,
  setEditVisible,
  currentClient,
  setCurrentClient,
  handleEditClient,
}) => {
  const [clientTypeSelected, setClientTypeSelected] = useState('')

  useEffect(() => {
    if (editVisible && currentClient) {
      setClientTypeSelected(currentClient.client_type || '')
    } else if (!editVisible) {
      setClientTypeSelected('')
    }
  }, [editVisible, currentClient])

  const handleClientTypeChange = (type) => {
    setClientTypeSelected(type)
    setCurrentClient((prev) => ({ ...prev, client_type: type }))
  }

  const validateForm = () => {
    if (!clientTypeSelected) {
      toast.error('El tipo de cliente es requerido.')
      return false
    }

    if (clientTypeSelected === 'Company') {
      if (!currentClient.company_name) {
        toast.error('El nombre de la empresa es requerido.')
        return false
      }
      if (!currentClient.Rif || !/^\d{9,10}$/.test(currentClient.Rif)) {
        toast.error('El RIF no es válido.')
        return false
      }
    } else if (clientTypeSelected === 'Person') {
      if (!currentClient.firts_name) {
        toast.error('El nombre es requerido.')
        return false
      }
      if (!currentClient.Firts_Las_Name) {
        toast.error('El apellido es requerido.')
        return false
      }
      if (!currentClient.Document_Number || !/^\d{7,10}$/.test(currentClient.Document_Number)) {
        toast.error('El documento no es válido.')
        return false
      }
    }

    if (!currentClient.Phone || !/^\d{11}$/.test(currentClient.Phone)) {
      toast.error('El teléfono debe tener 11 dígitos numéricos.')
      return false
    }
    if (!currentClient.Address) {
      toast.error('La dirección es requerida.')
      return false
    }
    if (!currentClient.email || !/\S+@\S+\.\S+/.test(currentClient.email)) {
      toast.error('El email no es válido.')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      handleEditClient()
    }
  }

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
        <CModalTitle>Editar Cliente</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Tipo de Cliente (Select simple o deshabilitado si no se puede cambiar) */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Tipo de Cliente</CFormLabel>
              <CFormSelect
                value={clientTypeSelected || ''}
                onChange={(e) => handleClientTypeChange(e.target.value)}
                disabled={!!currentClient?.client_type}
              >
                <option value="">Seleccione el tipo de cliente</option>
                <option value="Company">Jurídico (Empresa)</option>
                <option value="Person">Natural (Persona)</option>
              </CFormSelect>
              {currentClient?.client_type && (
                <small className="text-muted">El tipo de cliente no se puede cambiar</small>
              )}
            </CCol>
          </CRow>

          {/* Campos para Persona Natural */}
          {clientTypeSelected === 'Person' && (
            <>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Nombre *</CFormLabel>
                  <CFormInput
                    placeholder="Ingrese el nombre"
                    value={currentClient?.firts_name || ''}
                    onChange={(e) =>
                      setCurrentClient({ ...currentClient, firts_name: e.target.value })
                    }
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Apellido *</CFormLabel>
                  <CFormInput
                    placeholder="Ingrese el apellido"
                    value={currentClient?.Firts_Las_Name || ''}
                    onChange={(e) =>
                      setCurrentClient({ ...currentClient, Firts_Las_Name: e.target.value })
                    }
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Número de Documento *</CFormLabel>
                  <CFormInput
                    placeholder="Número de documento"
                    value={currentClient?.Document_Number || ''}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        setCurrentClient({ ...currentClient, Document_Number: value })
                      }
                    }}
                    maxLength={10}
                    required
                  />
                </CCol>
              </CRow>
            </>
          )}

          {/* Campos para Persona Jurídica */}
          {clientTypeSelected === 'Company' && (
            <>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Nombre de la Empresa *</CFormLabel>
                  <CFormInput
                    placeholder="Nombre de la empresa"
                    value={currentClient?.company_name || ''}
                    onChange={(e) =>
                      setCurrentClient({ ...currentClient, company_name: e.target.value })
                    }
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>RIF *</CFormLabel>
                  <CFormInput
                    placeholder="RIF"
                    value={currentClient?.Rif || ''}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        setCurrentClient({ ...currentClient, Rif: value })
                      }
                    }}
                    maxLength={10}
                    required
                  />
                </CCol>
              </CRow>
            </>
          )}

          {/* Campos Comunes */}
          {clientTypeSelected && (
            <>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Teléfono *</CFormLabel>
                  <CFormInput
                    placeholder="04121234567"
                    value={currentClient?.Phone || ''}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d*$/.test(value) && value.length <= 11) {
                        setCurrentClient({ ...currentClient, Phone: value })
                      }
                    }}
                    maxLength={11}
                    required
                  />
                  <small className="text-muted">Debe tener 11 dígitos</small>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Email *</CFormLabel>
                  <CFormInput
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={currentClient?.email || ''}
                    onChange={(e) => setCurrentClient({ ...currentClient, email: e.target.value })}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Dirección *</CFormLabel>
                  <CFormInput
                    placeholder="Ingrese la dirección"
                    value={currentClient?.Address || ''}
                    onChange={(e) =>
                      setCurrentClient({ ...currentClient, Address: e.target.value })
                    }
                    required
                  />
                </CCol>
              </CRow>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="success" type="submit" disabled={!clientTypeSelected}>
            <CIcon icon={cilSave} className="me-2" />
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default EditClientModal
