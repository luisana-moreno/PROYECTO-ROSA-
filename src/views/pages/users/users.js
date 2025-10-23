import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react';
import { helpFetch } from 'src/helpper/helpFetch'
const { get, post, put, del } = helpFetch()
import {
  cilPlus,
} from '@coreui/icons'
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
  CTableBody,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react';

const SectionOne = ({ addUser, setAddUser }) =>
  <div>
    <CRow className="g-3 mt-2">
      <h4 className='text-green mt-1 me-5'>Usuarios Registrados</h4>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Nombre"
          aria-label="Nombre"
          value={addUser.TTR_NOMBREU}
          onChange={(e) => setAddUser({ ...addUser, TTR_NOMBREU: e.target.value })}
        />
        <small className="text-muted">Ingrese el nombre.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Apellido"
          aria-label="Apellido"
          value={addUser.TTR_APELLID}
          onChange={(e) => setAddUser({ ...addUser, TTR_APELLID: e.target.value })}
        />
        <small className="text-muted">Ingrese el apellido.</small>
      </CCol>
    </CRow>
    <CRow className="users-las-name g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Correo"
          aria-label="Correo"
          value={addUser.TTR_CORREOE}
          onChange={(e) => setAddUser({ ...addUser, TTR_CORREOE: e.target.value })} />
        <small className="text-muted">Ingrese el correo.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Telefono"
          aria-label="Telefono"
          value={addUser.TTR_TELEFON}
          onChange={(e) => setAddUser({ ...addUser, TTR_TELEFON: e.target.value })} />
        <small className="text-muted">Ingrese el telefono.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Cargo"
          aria-label="Cargo"
          value={addUser.TTR_NOMBREC}
          onChange={(e) => setAddUser({ ...addUser, TTR_NOMBREC: e.target.value })} />
        <small className="text-muted">Ingrese el cargo.</small>
      </CCol>
    </CRow>
  </div>;

const EditSectionOne = ({ currentUser, setCurrentUser }) =>
  <div>
    <CRow className="g-3 mt-2">
      <h4 className='text-green mt-1 me-5'>Editar Datos del Usuario</h4>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Nombre"
          aria-label="Nombre"
          value={currentUser?.TTR_NOMBREU || ''}
          onChange={(e) => setCurrentUser({ ...currentUser, TTR_NOMBREU: e.target.value })} />
        <small className="text-muted">Ingrese el primer nombre.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Apellido"
          aria-label="Apellido"
          value={currentUser?.TTR_APELLID || ''}
          onChange={(e) => setCurrentUser({ ...currentUser, TTR_APELLID: e.target.value })} />
        <small className="text-muted">Ingrese el segundo nombre.</small>
      </CCol>
      <CRow className="users-las-name g-3 mt-2">
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="Correo"
            aria-label="Correo"
            value={currentUser?.TTR_CORREOE || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, TTR_CORREOE: e.target.value })} />
          <small className="text-muted">Ingrese el correo.</small>
        </CCol>
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="Telefono"
            aria-label="Telefono"
            value={currentUser?.TTR_TELEFON || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, TTR_TELEFON: e.target.value })} />
          <small className="text-muted">Ingrese el telefono.</small>
        </CCol>
      </CRow>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Cargo"
          aria-label="Cargo"
          value={currentUser?.TTR_NOMBREC || ''}
          onChange={(e) => setCurrentUser({ ...currentUser, TTR_NOMBREC: e.target.value })} />
        <small className="text-muted">Ingrese el cargo.</small>
      </CCol>
    </CRow>
  </div>;

const Users = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentEditSection, setEditCurrentSection] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [user, setUser] = useState([])
  const [addUser, setAddUser] = useState({
    TTR_NOMBREU: '',
    TTR_APELLID: '',
    TTR_CORREOE: '',
    TTR_TELEFON: '',
    TTR_NOMBREC: ''
  })

  // Cargar usuarios al iniciar
  useEffect(() => {
    get('user').then(data => {
      if (data) setUser(data)
    })
  }, [])

  // Agregar usuario
  const handleAddUser = () => {
    post('user', addUser).then(newUser => {
      if (newUser) setUser([...user, newUser])
      setAddUser({
        TTR_NOMBREU: '',
        TTR_APELLID: '',
        TTR_CORREOE: '',
        TTR_TELEFON: '',
        TTR_NOMBREC: ''
      })
      setVisible(false)
    })
  }

  // Editar usuario
  const handleEditUser = () => {
    if (!currentUser || !currentUser.id) {
      console.error("No user selected for editing.");
      return;
    }
    put('user', currentUser.id, currentUser).then(updated => {
      if (updated) setUser(user.map(u => u.id === updated.id ? updated : u))
      setEditVisible(false)
    })
  }

  // Eliminar usuario
  const handleDeleteUser = () => {
    if (!currentUser || !currentUser.id) {
      console.error("No user selected for deletion.");
      return;
    }
    if (deleteConfirmation === 'confirmar') {
      del('user', currentUser.id).then(() => {
        setUser(user.filter(u => u.id !== currentUser.id))
        setDeleteVisible(false)
      })
    } else {
      console.error("Delete confirmation failed.");
    }
  }

  const sections = [
    <SectionOne addUser={addUser} setAddUser={setAddUser} />
  ]
  const editsections = [
    <EditSectionOne currentUser={currentUser} setCurrentUser={setCurrentUser} />
  ]

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Gestion de Usuarios
          <CButton className='button-no-hover-green text-white' onClick={() => setVisible(!visible)} >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Usuario
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='text-green'>Nombre</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Apellido</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Correo</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Telefono</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Cargo</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {user.map((usr) => (
              <CTableRow key={usr.id}>
                <CTableDataCell>{usr?.TTR_NOMBREU || ''}</CTableDataCell>
                <CTableDataCell>{usr?.TTR_APELLID || ''}</CTableDataCell>
                <CTableDataCell>{usr?.TTR_CORREOE || ''}</CTableDataCell>
                <CTableDataCell>{usr?.TTR_TELEFON || ''}</CTableDataCell>
                <CTableDataCell>{usr?.TTR_NOMBREC || ''}</CTableDataCell>
                <CTableDataCell>
                  <div className='d-flex'>
                    <CButton
                      className='me-2 mb-2'
                      size='sm' color='info'
                      variant='outline'
                      onClick={() => {
                        setCurrentUser(usr);
                        setEditVisible(true);
                      }}>
                      Editar
                    </CButton>
                    <CButton
                      className='me-2 mb-2'
                      size='sm'
                      color='danger'
                      variant='outline'
                      onClick={() => { setCurrentUser(usr); setDeleteVisible(true); }}>
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
        <CModalHeader className='modal-module'>
          <CModalTitle className='typography-color'>
            Registro de Usuarios
          </CModalTitle>
        </CModalHeader>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {sections[currentSection]}
        </CModalBody>
        <CModalFooter>
          <CButton
            className='button-no-hover-green text-white'
            onClick={handleAddUser}>
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
        <CModalHeader className='modal-module'>
          <CModalTitle className='text-white'>
            Editar Usuario
          </CModalTitle>
        </CModalHeader>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {editsections[currentEditSection]}
        </CModalBody>
        <CModalFooter>
          <CButton
            className='button-no-hover-green text-white'
            onClick={handleEditUser}>
            Guardar cambios
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
      >
        <CModalHeader className='modal-module'>
          <CModalTitle className='typography-color'>
            Eliminar Usuario
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>
            Por favor escriba "confirmar" para eliminar el usuario
          </h6>
          <CFormInput
            placeholder="confirmar"
            className='modal-border'
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)} />
        </CModalBody>
        <CModalFooter>
          <CButton
            className='button-no-hover green'
            onClick={() => setDeleteVisible(false)}>
            <h6 className='typography-color'>Cancelar</h6>
          </CButton>
          <CButton
            className='button-no-hover-green'
            onClick={handleDeleteUser}>
            <h6 className='typography-color'>Eliminar</h6>
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}
export default Users;