import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react';
import { helpFetch } from 'src/helpper/helpFetch'
const { get, post, put, del } = helpFetch()
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CFormSelect,
  CTableBody,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CAlert
} from '@coreui/react';
import {
  cilPlus,
} from '@coreui/icons'

const SectionOne = ({ addEmployee, setAddEmployee }) => (
  <div>
    <CRow
      className="g-3 mt-2">
      <h4 className='text-green mt-1 me-5'>
      Datos Personales del empleado
      </h4>

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Primer Nombre"
          aria-label="primer nombre"
          value={addEmployee.firts_name}
          onChange={(e) => setAddEmployee({ ...addEmployee, firts_name: e.target.value })}
        />
        <small
          className="text-muted">
          Ingrese el primer nombre.
        </small>
      </CCol>

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Segundo Nombre"
          aria-label="segundo nombre"
          value={addEmployee.Middle_Name}
          onChange={(e) => setAddEmployee({ ...addEmployee, Middle_Name: e.target.value })}
        />

        <small
          className="text-muted">
          Ingrese el segundo nombre.
        </small>
      </CCol>
    </CRow>
    <CRow className="employees-las-name g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="primer apellido"
          aria-label="primer apellido"
          value={addEmployee.Firts_Las_Name}
          onChange={(e) => setAddEmployee({ ...addEmployee, Firts_Las_Name: e.target.value })} />
        <small
          className="text-muted">
          Ingrese el primer apellido.
        </small>
      </CCol>

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="segundo apellido"
          aria-label="segundo apellido"
          value={addEmployee.Second_Las_Name}
          onChange={(e) => setAddEmployee({ ...addEmployee, Second_Las_Name: e.target.value })} />
        <small
          className="text-muted">
          Ingrese el segundo apellido.
        </small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="numero de documento"
          aria-label="numero de documento"
          value={addEmployee.Document_Number}
          onChange={(e) => setAddEmployee({ ...addEmployee, Document_Number: e.target.value })} />
        <small
          className="text-muted">
          Ingrese el numero de documento.
        </small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          type="date"
          aria-label="fecha de nacimiento"
          placeholder="fecha de nacimiento"
          value={addEmployee.Date_Birth}
          onChange={(e) => setAddEmployee({ ...addEmployee, Date_Birth: e.target.value })} />
        <small className="text-muted">
        Ingrese la fecha de nacimiento.
        </small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Telefono"
          aria-label="Telefono"
          value={addEmployee.Phone}
          onChange={(e) => setAddEmployee({ ...addEmployee, Phone: e.target.value })} />
        <small
          className="text-muted">
          Ingrese el numero de Telefono.
        </small>

      </CCol>

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Direccion"
          aria-label="Direccion"
          value={addEmployee.Address}
          onChange={(e) => setAddEmployee({ ...addEmployee, Address: e.target.value })} />
        <small
          className="text-muted">
          Ingrese la Direccion.
        </small>

      </CCol>

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          type='date'
          placeholder="Fecha de Contrato"
          aria-label="Fecha de Contrato"
          value={addEmployee.Date_contrate}
          onChange={(e) => setAddEmployee({ ...addEmployee, Date_contrate: e.target.value })} />
        <small
          className="text-muted">
          Ingrese la fecha de Contratoo.
        </small>
      </CCol>

      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="cargo"
          aria-label="cargo"
          value={addEmployee.Position}
          onChange={(e) => setAddEmployee({ ...addEmployee, Position: e.target.value })} 
          >
          <option value="">Seleccione el cargo</option>
          <option value="Administrador">Administrador</option>
          <option value="Gerente de lacteos">Gerente de lacteos</option>
          <option value="Veterinario">Veterinario</option>
          <option value="Gerente de transporte">Gerente de transporte</option>
          <option value="Gerente de Potreros">Gerente de Potreros</option>
          <option value="Gerente de Mantenimiento">Gerente de Mantenimiento</option>
          <option value="trabajador de campo">Trabajador de campo </option>
        </CFormSelect>
        <small
          className="text-muted">
          Ingrese el cargo.
        </small>
      </CCol>
    </CRow>
  </div>);


const EditSectionOne = ({ currentEmployee, setCurrentEmployee }) =>
  <div>
    <CRow className="g-3 mt-2">
      <h4 className='text-green mt-1 me-5'>
        Editar Datos Personales
      </h4>

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="primer nombre"
          aria-label="primer nombre"
          value={currentEmployee?.firts_name || ''}
          onChange={(e) => setCurrentEmployee({ ...currentEmployee, firts_name: e.target.value })} />
        <small
          className="text-muted">
          Ingrese el primer nombre.
        </small>
      </CCol>

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="segundo nombre"
          aria-label="segundo nombre"
          value={currentEmployee?.Middle_Name || ''}
          onChange={(e) => setCurrentEmployee({ ...currentEmployee, Middle_Name: e.target.value })} />
        <small
          className="text-muted">
          Ingrese el segundo nombre.
        </small>
      </CCol>

      <CRow className="employees-las-name g-3 mt-2">
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="primer apellido"
            aria-label="primer apellido"
            value={currentEmployee?.Firts_Las_Name || ''}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee, Firts_Las_Name: e.target.value })} />
          <small
            className="text-muted">
            Ingrese el primer Apellido.
          </small>
        </CCol>

        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="segundo apellido"
            aria-label="segundo apellido"
            value={currentEmployee?.Second_Las_Name || ''}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee, Second_Las_Name: e.target.value })} />
          <small
            className="text-muted">
            Ingrese el segundo Apellido.
          </small>
        </CCol>
      </CRow>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="numero de documento"
          aria-label="numero de documento"
          value={currentEmployee?.Document_Number || ''}
          onChange={(e) => setCurrentEmployee({ ...currentEmployee, Document_Number: e.target.value })} />
        <small
          className="text-muted">
          Ingrese el numero de documento.
        </small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          type="date"
          placeholder="fecha de nacimiento"
          aria-label="fecha de nacimiento"
          value={currentEmployee?.Date_Birth || ''}
          onChange={(e) => setCurrentEmployee({ ...currentEmployee, Date_Birth: e.target.value })} />
        <small
          className="text-muted">
          Ingrese la fecha de nacimiento.
        </small>
      </CCol>
    </CRow>
    <CRow className="employees-las-name g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Telefono"
          aria-label="Telefono"
          value={currentEmployee?.Phone || ''}
          onChange={(e) => setCurrentEmployee({ ...currentEmployee, Phone: e.target.value })} />
        <small
          className="text-muted">
          Ingrese el numero de telefono.
        </small>
      </CCol>

      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Direccion"
          aria-label="Direccion"
          value={currentEmployee?.Address || ''}
          onChange={(e) => setCurrentEmployee({ ...currentEmployee, Address: e.target.value })} />
        <small
          className="text-muted">
          Ingrese la direccion.
        </small>
      </CCol>

      <CCol md={6}>
        <CFormInput
          className="modal-nam custom-selecte"
          type='date'
          placeholder="Fecha de Contrato"
          aria-label="Fecha de Contrato"
          value={currentEmployee?.Date_contrate || ''}
          onChange={(e) => setCurrentEmployee({ ...currentEmployee, Date_contrate: e.target.value })} />
        <small
          className="text-muted">
          Ingrese la fecha de contrato.
        </small>
      </CCol>
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="cargo"
          aria-label="cargo"
          value={currentEmployee?.Position || ''}
          onChange={(e) => setAddEmployee({ ...currentEmployee, Position: e.target.value })} 
          >
          <option value="">Seleccione el cargo</option>
          <option value="Administrador">Administrador</option>
          <option value="Gerente de lacteos">Gerente de lacteos</option>
          <option value="Veterinario">Veterinario</option>
          <option value="Gerente de transporte">Gerente de transporte</option>
          <option value="Gerente de Potreros">Gerente de Potreros</option>
          <option value="Gerente de Mantenimiento">Gerente de Mantenimiento</option>
          <option value="trabajador de campo">Trabajador de campo </option>
        </CFormSelect>
        <small
          className="text-muted">
          Ingrese el cargo.
        </small>
      </CCol>
    </CRow>
  </div>;


const Employees = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [viewVisible, setViewVisible] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentEditSection, setEditCurrentSection] = useState(0)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [employee, setEmployee] = useState([])
  const [addEmployee, setAddEmployee] = useState({
    firts_name: '',
    Middle_Name: '',
    Firts_Las_Name: '',
    Second_Las_Name: '',
    Document_Number: '',
    Date_Birth: '',
    Phone: '',
    Address: '',
    Date_contrate: '',
    Position: '',
    Contact_Person: '',
  })
  const [toast, setToast] = useState({ show: false, message: '', color: 'success' });

  const showToast = (message, color = 'success') => {
    setToast({ show: true, message, color });
    setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500);
  };

  // Cargar empleados al iniciar
  useEffect(() => {
    get('employee').then(data => {
      if (data) setEmployee(data)
    })
  }, [])

  const sections = [
    <SectionOne addEmployee={addEmployee} setAddEmployee={setAddEmployee} />
  ]
  const editsections = [
    <EditSectionOne currentEmployee={currentEmployee} setCurrentEmployee={setCurrentEmployee} />
  ]

  // Agregar empleado
  const handleAddEmployee = () => {
    post('employee', addEmployee).then(newEmp => {
      if (newEmp) setEmployee([...employee, newEmp])
      setAddEmployee({
        firts_name: '',
        Middle_Name: '',
        Firts_Las_Name: '',
        Second_Las_Name: '',
        Document_Number: '',
        Date_Birth: '',
        Phone: '',
        Address: '',
        Date_contrate: '',
        Position: '',
        Contact_Person: '',
      })
      setVisible(false)
      showToast('Registro agregado correctamente', 'success')
    })
  }

  // Editar empleado
  const handleEditEmployee = () => {
    if (!currentEmployee || !currentEmployee.id) {
      showToast("No employee selected for editing.", "warning");
      return;
    }
    put('employee', currentEmployee.id, currentEmployee).then(updated => {
      if (updated) setEmployee(employee.map(emp => emp.id === updated.id ? updated : emp))
      setEditVisible(false)
      showToast('Registro editado correctamente', 'info')
    })
  }

  // Eliminar empleado
  const handleDeleteEmployee = () => {
    if (!currentEmployee || !currentEmployee.id) {
      showToast("No employee selected for deletion.", "warning");
      return;
    }
    if (deleteConfirmation === 'confirmar') {
      del('employee', currentEmployee.id).then(() => {
        setEmployee(employee.filter(emp => emp.id !== currentEmployee.id))
        setDeleteVisible(false)
        showToast('Empleado eliminado exitosamente', 'danger')
      })
    } else {
      showToast('Debe escribir "confirmar" para eliminar', 'warning')
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Gestion de Empleados
          <CButton className='button-no-hover-green text-white' onClick={() => setVisible(!visible)} >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Empleado
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='text-green'>Nombre Completo</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Cargo</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Fecha de Contrato</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Teléfono</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employee.map((employees) => (
              <CTableRow key={employees.Document_Number}>
                <CTableDataCell>
                  {`${employees?.firts_name || ''} ${employees?.Middle_Name || ''} ${employees?.Firts_Las_Name || ''} ${employees?.Second_Las_Name || ''}`}
                </CTableDataCell>
                <CTableDataCell>{employees?.Position || ''}</CTableDataCell>
                <CTableDataCell>{employees?.Date_contrate || ''}</CTableDataCell>
                <CTableDataCell>{employees?.Phone || ''}</CTableDataCell>
                <CTableDataCell>
                  <div className='d-flex'>
                    <CButton
                      className='me-2 mb-2'
                      size='sm'
                      color='info'
                      variant='outline'
                      onClick={() => {
                        setCurrentEmployee(employees);
                        setViewVisible(true);
                      }}>
                      Visualizar
                    </CButton>
                    <CButton
                      className='me-2 mb-2'
                      size='sm'
                      color='info'
                      variant='outline'
                      onClick={() => {
                        setCurrentEmployee(employees);
                        setEditVisible(true);
                      }}>
                      Editar
                    </CButton>
                    <CButton
                      className='me-2 mb-2'
                      size='sm'
                      color='danger'
                      variant='outline'
                      onClick={() => {
                        setCurrentEmployee(employees);
                        setDeleteVisible(true);
                      }}>
                      Eliminar
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}

      >
        <CModalHeader
          className='modal-module'>
          <CModalTitle className='typography-color'>
            Registro de Empleados
          </CModalTitle>
        </CModalHeader>

        <CModalBody
          style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {sections[currentSection]}
        </CModalBody>

        <CModalFooter>
          <CButton
            className='button-no-hover-green text-white'
            onClick={handleAddEmployee}>
            Agregar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        alignment="center"
        scrollable
        visible={editVisible}
        onClose={() => setEditVisible(false)}

      >
        <CModalHeader
          className='modal-module'>
          <CModalTitle className='text-white'>
            Editar Empleado
          </CModalTitle>
        </CModalHeader>


        <CModalBody
          style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {editsections[currentEditSection]}
        </CModalBody>

        <CModalFooter>
          <CButton
            className='button-no-hover-green text-white'
            onClick={handleEditEmployee}>
            Guardar cambios
          </CButton>

        </CModalFooter>
      </CModal>
      <CModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
      >
        <CModalHeader className='modal-module'>
          <CModalTitle
            className='typography-color'>
            Eliminar Empleado
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <h6>
            Por favor escriba "confirmar" para eliminar el empleado
          </h6>
          <CFormInput
            placeholder="confirmar"
            className='modal-border'
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)} /> {/* detectar cambios*/}
        </CModalBody>

        <CModalFooter>
          <CButton
            className='button-no-hover green'
            onClick={() => setDeleteVisible(false)}>
            <h6
              className='typography-color'>
              Cancelar
            </h6>
          </CButton>

          <CButton
            className='button-no-hover-green'
            onClick={handleDeleteEmployee}>
            <h6 className='typography-color'>
              Eliminar
            </h6>
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal alignment="center" scrollable visible={viewVisible} onClose={() => setViewVisible(false)}>
        <CModalHeader>
          <CModalTitle>Detalles del Empleado</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {currentEmployee ? (
            <>
              <p><strong>Nombre Completo:</strong> {`${currentEmployee.firts_name} ${currentEmployee.Middle_Name} ${currentEmployee.Firts_Las_Name} ${currentEmployee.Second_Las_Name}`}</p>
              <p><strong>Primer Nombre:</strong> {currentEmployee.firts_name}</p>
              <p><strong>Segundo Nombre:</strong> {currentEmployee.Middle_Name}</p>
              <p><strong>Primer Apellido:</strong> {currentEmployee.Firts_Las_Name}</p>
              <p><strong>Segundo Apellido:</strong> {currentEmployee.Second_Las_Name}</p>
              <p><strong>Número de Documento:</strong> {currentEmployee.Document_Number}</p>
              <p><strong>Fecha de Nacimiento:</strong> {currentEmployee.Date_Birth}</p>
              <p><strong>Teléfono:</strong> {currentEmployee.Phone}</p>
              <p><strong>Dirección:</strong> {currentEmployee.Address}</p>
              <p><strong>Fecha de Contrato:</strong> {currentEmployee.Date_contrate}</p>
              <p><strong>Cargo:</strong> {currentEmployee.Position}</p>
              <p><strong>Persona de Contacto:</strong> {currentEmployee.Contact_Person}</p>
            </>
          ) : (
            <p>No hay detalles disponibles.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton className="button-no-hover-green text-white" onClick={() => setViewVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          minWidth: 300,
        }}>
          <CAlert color={toast.color} className="text-center m-0">
            {toast.message}
          </CAlert>
        </div>
      )}
    </CCard>

  )
}
export default Employees;