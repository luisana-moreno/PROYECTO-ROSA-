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
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'
import { clientService } from '../../../api/clientService'

const AddClientModal = ({ visible, setVisible, addClient, setAddClient, handleAddClient }) => {
  const [clientTypeSelected, setClientTypeSelected] = useState('')
  const [documentExists, setDocumentExists] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (!visible) {
      setClientTypeSelected('')
      setDocumentExists(false)
      setAddClient({
        client_type: '',
        company_name: '',
        firts_name: '',
        Firts_Las_Name: '',
        Document_Number: '',
        Rif: '',
        Phone: '',
        Address: '',
        email: '',
      })
    }
  }, [visible, setAddClient])

  const handleClientTypeChange = (type) => {
    setClientTypeSelected(type)
    setAddClient((prev) => ({ ...prev, client_type: type }))
    setDocumentExists(false)
  }

  const handleDocumentBlur = async (documento) => {
    if (!documento) return

    setIsVerifying(true)
    try {
      const result = await clientService.checkClientDocument(documento)
      if (result.exists) {
        setDocumentExists(true)
        toast.warning(result.message)
      } else {
        setDocumentExists(false)
      }
    } catch (error) {
      console.error('Error verifying document:', error)
      toast.error('Error al verificar el documento')
    } finally {
      setIsVerifying(false)
    }
  }

  const validateForm = () => {
    if (!clientTypeSelected) {
      toast.error('Debe seleccionar un tipo de cliente.')
      return false
    }

    if (clientTypeSelected === 'Company') {
      if (!addClient.company_name) {
        toast.error('El nombre de la empresa es requerido.')
        return false
      }
      if (!addClient.Rif || !/^\d{9,10}$/.test(addClient.Rif)) {
        toast.error('El RIF debe tener formato válido.')
        return false
      }
    } else if (clientTypeSelected === 'Person') {
      if (!addClient.firts_name) {
        toast.error('El nombre es requerido.')
        return false
      }
      if (!addClient.Firts_Las_Name) {
        toast.error('El apellido es requerido.')
        return false
      }
      if (!addClient.Document_Number || !/^\d{7,10}$/.test(addClient.Document_Number)) {
        toast.error('El número de documento debe tener formato válido.')
        return false
      }
    }

    if (!addClient.Phone || !/^\d{11}$/.test(addClient.Phone)) {
      toast.error('El teléfono debe tener 11 dígitos numéricos.')
      return false
    }
    if (!addClient.Address) {
      toast.error('La dirección es requerida.')
      return false
    }
    if (!addClient.email || !/\S+@\S+\.\S+/.test(addClient.email)) {
      toast.error('El email no es válido.')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      handleAddClient()
    }
  }

  const isDocumentEntered =
    clientTypeSelected === 'Person' ? !!addClient.Document_Number : !!addClient.Rif

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => setVisible(false)}
      backdrop="static"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Nuevo Cliente</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <CAlert color="info" className="mb-4">
            <strong>Información:</strong> Seleccione el tipo de cliente y complete todos los campos
            requeridos.
          </CAlert>

          {/* Tipo de Cliente */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Tipo de Cliente *</CFormLabel>
              <CFormSelect
                value={clientTypeSelected || ''}
                onChange={(e) => handleClientTypeChange(e.target.value)}
                required
              >
                <option value="">Seleccione el tipo de cliente</option>
                <option value="Company">Jurídico (Empresa)</option>
                <option value="Person">Natural (Persona)</option>
              </CFormSelect>
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
                    value={addClient.firts_name}
                    onChange={(e) => setAddClient({ ...addClient, firts_name: e.target.value })}
                    disabled={documentExists || !addClient.Document_Number}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Apellido *</CFormLabel>
                  <CFormInput
                    placeholder="Ingrese el apellido"
                    value={addClient.Firts_Las_Name}
                    onChange={(e) => setAddClient({ ...addClient, Firts_Las_Name: e.target.value })}
                    disabled={documentExists || !addClient.Document_Number}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Número de Documento *</CFormLabel>
                  <CFormInput
                    placeholder="Ingrese el número de documento"
                    value={addClient.Document_Number}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        setAddClient({ ...addClient, Document_Number: value })
                      }
                    }}
                    onBlur={() => handleDocumentBlur(addClient.Document_Number)}
                    maxLength={10}
                    required
                  />
                  <small className="text-muted">Ingrese solo números</small>
                  {isVerifying && (
                    <small className="text-info d-block">Verificando documento...</small>
                  )}
                  {documentExists && (
                    <small className="text-danger d-block">Este documento ya está registrado</small>
                  )}
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
                    placeholder="Ingrese el nombre de la empresa"
                    value={addClient.company_name}
                    onChange={(e) => setAddClient({ ...addClient, company_name: e.target.value })}
                    disabled={documentExists || !addClient.Rif}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>RIF *</CFormLabel>
                  <CFormInput
                    placeholder="Ingrese el RIF"
                    value={addClient.Rif}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        setAddClient({ ...addClient, Rif: value })
                      }
                    }}
                    onBlur={() => handleDocumentBlur(addClient.Rif)}
                    maxLength={10}
                    required
                  />
                  <small className="text-muted">Ingrese solo números</small>
                  {isVerifying && <small className="text-info d-block">Verificando RIF...</small>}
                  {documentExists && (
                    <small className="text-danger d-block">Este RIF ya está registrado</small>
                  )}
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
                    value={addClient.Phone}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d*$/.test(value) && value.length <= 11) {
                        setAddClient({ ...addClient, Phone: value })
                      }
                    }}
                    maxLength={11}
                    disabled={documentExists || !isDocumentEntered}
                    required
                  />
                  <small className="text-muted">Debe tener 11 dígitos</small>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Email *</CFormLabel>
                  <CFormInput
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={addClient.email}
                    onChange={(e) => setAddClient({ ...addClient, email: e.target.value })}
                    disabled={documentExists || !isDocumentEntered}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Dirección *</CFormLabel>
                  <CFormInput
                    placeholder="Ingrese la dirección"
                    value={addClient.Address}
                    onChange={(e) => setAddClient({ ...addClient, Address: e.target.value })}
                    disabled={documentExists || !isDocumentEntered}
                    required
                  />
                </CCol>
              </CRow>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="success" type="submit" disabled={!clientTypeSelected || documentExists}>
            <CIcon icon={cilSave} className="me-2" />
            Guardar Cliente
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default AddClientModal
