import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CForm,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'
import { employeeService } from '../../../../api/employeeService'
import ImageUpload from 'src/components/ImageUpload'

const AddEmployeeModal = ({
  visible,
  setVisible,
  addEmployee,
  setAddEmployee,
  handleAddEmployee,
  positions,
}) => {
  const today = new Date().toISOString().split('T')[0]
  const [idExists, setIdExists] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)

  const handleChange = (e) => {
    setAddEmployee({ ...addEmployee, [e.target.name]: e.target.value })
  }

  const handleDocumentChange = (e) => {
    setAddEmployee({ ...addEmployee, ttrDocumen: e.target.value.replace(/\D/g, '') })
  }

  const handlePhoneChange = (e) => {
    setAddEmployee({ ...addEmployee, ttrTelefon: e.target.value.replace(/\D/g, '') })
  }

  const handlePositionChange = (e) => {
    setAddEmployee({
      ...addEmployee,
      ttrIdcargp: e.target.value === '' ? '' : parseInt(e.target.value, 10),
    })
  }

  const handleIdBlur = async () => {
    if (!addEmployee.ttrDocumen) return

    setIsVerifying(true)
    try {
      const result = await employeeService.checkEmployeeId(addEmployee.ttrDocumen)
      if (result.exists) {
        setIdExists(true)
        toast.warning(result.message)
      } else {
        setIdExists(false)
      }
    } catch (error) {
      console.error('Error verifying ID:', error)
      toast.error('Error al verificar el documento')
    } finally {
      setIsVerifying(false)
    }
  }

  const handlePhotoUpload = async (file) => {
    setPhotoFile(file)
    return Promise.resolve()
  }

  const handlePhotoDelete = async () => {
    setPhotoFile(null)
    return Promise.resolve()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddEmployee(photoFile)
  }

  const handleClose = () => {
    setVisible(false)
    setIdExists(false)
    setPhotoFile(null)
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={handleClose}
      backdrop="static"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Nuevo Empleado</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <CAlert color="info" className="mb-4">
            <strong>Información:</strong> Complete todos los campos para registrar un nuevo
            empleado.
          </CAlert>

          {/* Documento */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Número de Documento *</CFormLabel>
              <CFormInput
                placeholder="Ingrese el número de documento"
                name="ttrDocumen"
                value={addEmployee.ttrDocumen}
                onChange={handleDocumentChange}
                onBlur={handleIdBlur}
                maxLength={8}
                required
              />
              <small className="text-muted">Máximo 8 dígitos</small>
              {isVerifying && <small className="text-info d-block">Verificando documento...</small>}
              {idExists && (
                <small className="text-danger d-block">Este documento ya está registrado</small>
              )}
            </CCol>
          </CRow>

          {/* Nombre y Apellido */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Nombre *</CFormLabel>
              <CFormInput
                placeholder="Ingrese el nombre"
                name="ttrNombrel"
                value={addEmployee.ttrNombrel}
                onChange={handleChange}
                maxLength={100}
                disabled={idExists || !addEmployee.ttrDocumen}
                required
              />
              <small className="text-muted">Máximo 100 caracteres</small>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Apellido *</CFormLabel>
              <CFormInput
                placeholder="Ingrese el apellido"
                name="ttrApellid"
                value={addEmployee.ttrApellid}
                onChange={handleChange}
                maxLength={100}
                disabled={idExists || !addEmployee.ttrDocumen}
                required
              />
              <small className="text-muted">Máximo 100 caracteres</small>
            </CCol>
          </CRow>

          {/* Fecha de Nacimiento y Teléfono */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Fecha de Nacimiento *</CFormLabel>
              <CFormInput
                type="date"
                name="ttrFecnaci"
                value={addEmployee.ttrFecnaci}
                onChange={handleChange}
                max={today}
                disabled={idExists || !addEmployee.ttrDocumen}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Teléfono *</CFormLabel>
              <CFormInput
                placeholder="04121234567"
                name="ttrTelefon"
                value={addEmployee.ttrTelefon}
                onChange={handlePhoneChange}
                maxLength={11}
                disabled={idExists || !addEmployee.ttrDocumen}
                required
              />
              <small className="text-muted">Máximo 11 dígitos</small>
            </CCol>
          </CRow>

          {/* Dirección y Fecha de Contrato */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Dirección *</CFormLabel>
              <CFormInput
                placeholder="Ingrese la dirección"
                name="ttrDirecci"
                value={addEmployee.ttrDirecci}
                onChange={handleChange}
                maxLength={255}
                disabled={idExists || !addEmployee.ttrDocumen}
                required
              />
              <small className="text-muted">Máximo 255 caracteres</small>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Fecha de Contrato *</CFormLabel>
              <CFormInput
                type="date"
                name="ttrFeccont"
                value={addEmployee.ttrFeccont}
                onChange={handleChange}
                max={today}
                disabled={idExists || !addEmployee.ttrDocumen}
                required
              />
            </CCol>
          </CRow>

          {/* Cargo */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Cargo *</CFormLabel>
              <CFormSelect
                name="ttrIdcargp"
                value={addEmployee.ttrIdcargp}
                onChange={handlePositionChange}
                disabled={idExists || !addEmployee.ttrDocumen}
                required
              >
                <option value="">Seleccione el cargo</option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.nombre}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          {/* Foto del Empleado (Opcional) */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Foto del Empleado (Opcional)</CFormLabel>
              <ImageUpload
                currentImageUrl={null}
                onUpload={handlePhotoUpload}
                onDelete={handlePhotoDelete}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Cancelar
          </CButton>
          <CButton color="success" type="submit" disabled={idExists}>
            <CIcon icon={cilSave} className="me-2" />
            Guardar Empleado
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default AddEmployeeModal
