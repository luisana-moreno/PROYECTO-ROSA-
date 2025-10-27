import React, { useState, useEffect } from 'react'
import { helpFetch } from 'src/helpper/helpFetch'
const { get, post, put, del } = helpFetch()
import CIcon from '@coreui/icons-react'
import {
  cilPlus, // <-- AGREGA ESTA LÍNEA
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
    CFormSelect,
    CTableBody,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CAlert
} from '@coreui/react';
const SectionOne = ({ addCattle, setAddCattle }) =>
    <div>
        <CRow
            className="g-3 mt-2">
            <h4 className='text-green mt-1 me-5'>
                Registro  del Bovino
            </h4>

            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    placeholder="Numero de Arete"
                    aria-label="Numero de Arete"
                    value={addCattle.number_Bovino}
                    onChange={(e) => setAddCattle({ ...addCattle, number_Bovino: e.target.value })}
                />
                <small
                    className="text-muted">
                    Ingrese el codigo del bovino.
                </small>
            </CCol>
            <CCol md={6}>
                <CFormInput
                        className="modal-name custom-select"
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        value={addCattle.date_birth}
                        onChange={(e) => setAddCattle({ ...addCattle, date_birth: e.target.value })}>
                        </CFormInput>
                    <small className="text-muted">
                        Ingrese la fecha .
                    </small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
        <CCol md={6}>
                
                <CFormSelect
                    className="modal-name custom-select"
                    placeholder="Raza"
                    aria-label="Raza"
                    value={addCattle.breed_bovine}
                    onChange={(e) => setAddCattle({ ...addCattle, breed_bovine: e.target.value })}
                >
                <option value="">Seleccione la Raza</option>
                <option value="Holstein">Holstein</option>
                <option value="Jersey">Jersey</option>
                <option value="Gyrolandas">Gyrolandas</option>
                <option value="Carora">Carora</option>
                <option value="Gyrhol">Gyrhol</option>
                <option value="">otras</option> 
                </CFormSelect>
                <small
                    className="text-muted">
                    Ingrese la raza.
                </small>
            </CCol>
            <CCol>
            <CFormInput
            className="modal-name custom-select"
            placeholder="Raza"
            aria-label="Raza"
            value={addCattle.breed_bovine}
            onChange={(e) => setAddCattle({ ...addCattle, breed_bovine: e.target.value })}>
            </CFormInput>
            <small
                    className="text-muted">
                    Ingrese la raza.
            </small>

            </CCol>
            <CCol md={6}>
                <CFormSelect
                    className="modal-name custom-select"
                    placeholder="Color"
                    aria-label="Color"
                    value={addCattle.color_cattle}
                    onChange={(e) => setAddCattle({ ...addCattle, color_cattle: e.target.value })} 
                    >
                <option value="">Seleccione el Color</option>
                <option value="Blanco con Negro">Blanco con Negro</option>
                <option value="Blanco con Marron">Blanco con Marron</option>
                <option value="Blanco con Rojo">Blanco con Rojo</option>
                <option value="Negro con Blanco">Negro con Blanco</option>
                <option value="Marron">Marron</option>
                <option value="">Otro</option>
                </CFormSelect>
                    
                <small
                    className="text-muted">
                    Please add cattle color.
                </small>
            </CCol>
            <CCol md={6}>
                <CFormInput
                        className="modal-name custom-select"
                        placeholder="Color"
                        aria-label="Color"
                        value={addCattle.color_cattle}
                        onChange={(e) => setAddCattle({ ...addCattle, color_cattle: e.target.value })} >
                        </CFormInput>
                    <small className="text-muted">
                        Ingrese el color .
                    </small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
            <CCol md={6}>
                <CFormInput
                        className="modal-name custom-select"
                        type="number" 
                        placeholder="Weight"
                        value={addCattle.weight}
                        onChange={(e) => setAddCattle({ ...addCattle, weight: parseFloat(e.target.value) || '' })}/>
                    <small className="text-muted">
                        Please add cattle weigth.
                    </small>
            </CCol>
            <CCol md={6}>
                <CFormSelect
                    className="modal-name custom-select"
                    placeholder="Etapa"
                    aria-label="Etapa"
                    value={addCattle.stage}
                    onChange={(e) => setAddCattle({ ...addCattle, stage: e.target.value })} 
                    >/
                <option value="">Seleccione la Etapa</option>
                <option value="Black">Becerro lactante</option>
                <option value="Brown">Becerro destetado</option>
                <option value="White">Mautas</option>
                <option value="Red">Novillas</option>
                <option value="Gray">Vacas Maduras</option>
                <option value="Mixed">Toros</option>
                </CFormSelect>
                <small
                    className="text-muted">
                    Please add cattle stage.
                </small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
            <CCol md={6}>
                <CFormSelect
                        className="modal-name custom-select"
                        placeholder="Statu Cattle"
                        value={addCattle.statu_cattle}
                        onChange={(e) => setAddCattle({ ...addCattle, statu_cattle: e.target.value })} 
                        >
                <option value="">Status cattle</option>
                <option value="En servicio">En servicio</option>
                <option value="No en servicio">No en servicio</option>
                <option value="En gestacion">En gestacion</option>
                <option value="En lactancia">En lactancia</option>
                <option value="En cuarentena">En cuarentena</option>
                <option value="Muerto">Muerto</option>
                </CFormSelect>
                    <small className="text-muted">
                        Please add statu cattle.
                    </small>
            </CCol>
        </CRow>

    </div>;


const EditSectionOne = ({ currentCattle, setCurrentCattle }) =>
  <div>
        <CRow
            className="g-3 mt-2">
            <h4 className='text-green mt-1 me-5'>
                Cattle Data
            </h4>

            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    placeholder="Numero de Arete"
                    aria-label="Numero de Arete"
                    value={currentCattle.number_Bovino}
                    onChange={(e) => setCurrentCattle({ ...currentCattle, number_Bovino: e.target.value })}
                />
                <small
                    className="text-muted">
                    Ingrese el codigo del bovino.
                </small>
            </CCol>
            <CCol md={6}>
                <CFormInput
                        className="modal-name custom-select"
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        value={currentCattle.date_birth}
                        onChange={(e) => setCurrentCattle({ ...currentCattle, date_birth: e.target.value })}>
                        </CFormInput>
                    <small className="text-muted">
                        Ingrese la fecha .
                    </small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
        <CCol md={6}>
                
                <CFormSelect
                    className="modal-name custom-select"
                    placeholder="Raza"
                    aria-label="Raza"
                    value={currentCattle.breed_bovine}
                    onChange={(e) => setCurrentCattle({ ...currentCattle, breed_bovine: e.target.value })}
                >
                <option value="">Seleccione la Raza</option>
                <option value="Holstein">Holstein</option>
                <option value="Jersey">Jersey</option>
                <option value="Gyrolandas">Gyrolandas</option>
                <option value="Carora">Carora</option>
                <option value="Gyrhol">Gyrhol</option>
                <option value="">otras</option> 
                </CFormSelect>
                <small
                    className="text-muted">
                    Ingrese la raza.
                </small>
            </CCol>
            <CCol>
            <CFormInput
            className="modal-name custom-select"
            placeholder="Raza"
            aria-label="Raza"
            value={currentCattle.breed_bovine}
            onChange={(e) => setCurrentCattle({ ...currentCattle, breed_bovine: e.target.value })}>
            </CFormInput>
            <small
                    className="text-muted">
                    Ingrese la raza.
            </small>

            </CCol>
            <CCol md={6}>
                <CFormSelect
                    className="modal-name custom-select"
                    placeholder="Color"
                    aria-label="Color"
                    value={currentCattle.color_cattle}
                    onChange={(e) => setCurrentCattle({ ...currentCattle, color_cattle: e.target.value })} 
                    >
                <option value="">Seleccione el Color</option>
                <option value="Blanco con Negro">Blanco con Negro</option>
                <option value="Blanco con Marron">Blanco con Marron</option>
                <option value="Blanco con Rojo">Blanco con Rojo</option>
                <option value="Negro con Blanco">Negro con Blanco</option>
                <option value="Marron">Marron</option>
                <option value="">Otro</option>
                </CFormSelect>
                    
                <small
                    className="text-muted">
                    Please add cattle color.
                </small>
            </CCol>
            <CCol md={6}>
                <CFormInput
                        className="modal-name custom-select"
                        placeholder="Color"
                        aria-label="Color"
                        value={currentCattle.color_cattle}
                        onChange={(e) => setCurrentCattle({ ...currentCattle, color_cattle: e.target.value })} >
                        </CFormInput>
                    <small className="text-muted">
                        Ingrese el color .
                    </small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
            <CCol md={6}>
                <CFormInput
                        className="modal-name custom-select"
                        type="number" 
                        placeholder="Weight"
                        value={currentCattle.weight}
                        onChange={(e) => setCurrentCattle({ ...currentCattle, weight: parseFloat(e.target.value) || '' })}/>
                    <small className="text-muted">
                        Please add cattle weigth.
                    </small>
            </CCol>
            <CCol md={6}>
                <CFormSelect
                    className="modal-name custom-select"
                    placeholder="Etapa"
                    aria-label="Etapa"
                    value={currentCattle.stage}
                    onChange={(e) => setCurrentCattle({ ...currentCattle, stage: e.target.value })} 
                    >/
                <option value="">Seleccione la Etapa</option>
                <option value="Black">Becerro lactante</option>
                <option value="Brown">Becerro destetado</option>
                <option value="White">Mautas</option>
                <option value="Red">Novillas</option>
                <option value="Gray">Vacas Maduras</option>
                <option value="Mixed">Toros</option>
                </CFormSelect>
                <small
                    className="text-muted">
                    Please add cattle stage.
                </small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
            <CCol md={6}>
                <CFormSelect
                        className="modal-name custom-select"
                        placeholder="Statu Cattle"
                        value={currentCattle.statu_cattle}
                        onChange={(e) => setCurrentCattle({ ...currentCattle, statu_cattle: e.target.value })} 
                        >
                <option value="">Status cattle</option>
                <option value="En servicio">En servicio</option>
                <option value="No en servicio">No en servicio</option>
                <option value="En gestacion">En gestacion</option>
                <option value="En lactancia">En lactancia</option>
                <option value="En cuarentena">En cuarentena</option>
                <option value="Muerto">Muerto</option>
                </CFormSelect>
                    <small className="text-muted">
                        Please add statu cattle.
                    </small>
            </CCol>

        </CRow>
    </div>

const Cattle = () => {
    const [visible, setVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [viewVisible, setViewVisible] = useState(false)
    const [currentSection, setCurrentSection] = useState(0)
    const [currentEditSection, setEditCurrentSection] = useState(0)
    const [currentCattle, setCurrentCattle] = useState(null)
    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    const [cattle, setCattle] = useState([])
    const [addCattle, setAddCattle] = useState({
        cattle_number: '',
        breed_bovine: '',
        date_birth: '',
        color_cattle: '',
        weight: '',
        stage: '',
        statu_cattle: ''

    })
    const [toast, setToast] = useState({ show: false, message: '', color: 'success' });

    const showToast = (message, color = 'success') => {
      setToast({ show: true, message, color });
      setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500);
    };

    // Cargar bovinos al iniciar
    useEffect(() => {
        get('cattle').then(data => {
            if (data) setCattle(data)
        })
    }, [])

    const sections = [
        <SectionOne addCattle={addCattle} setAddCattle={setAddCattle} />
    ]
    const editsections = [
        <EditSectionOne currentCattle={currentCattle} setCurrentCattle={setCurrentCattle} />
    ]

    // Agregar bovino
    const handleAddCattle = () => {
        post('cattle', addCattle).then(newCattle => {
            if (newCattle) setCattle([...cattle, newCattle])
            setAddCattle({
                cattle_number: '',
                breed_bovine: '',
                date_birth: '',
                color_cattle: '',
                weight: '',
                stage: '',
                statu_cattle: ''
            })
            setVisible(false)
            showToast('Registro agregado correctamente', 'success')
        })
    }

    // Editar bovino
    const handleEditCattle = () => {
        if (!currentCattle || !currentCattle.id) {
            showToast("No cattle selected for editing.", "warning");
            return;
        }
        put('cattle', currentCattle.id, currentCattle).then(updated => {
            if (updated) setCattle(cattle.map(c => c.id === updated.id ? updated : c))
            setEditVisible(false)
            showToast('Registro editado correctamente', 'info')
        })
    }

    // Eliminar bovino
    const handleDeleteCattle = () => {
        if (!currentCattle || !currentCattle.id) {
            showToast("No cattle selected for deletion.", "warning");
            return;
        }
        if (deleteConfirmation === 'confirmar') {
            del('cattle', currentCattle.id).then(() => {
                setCattle(cattle.filter(c => c.id !== currentCattle.id))
                setDeleteVisible(false)
                showToast('Bovino eliminado exitosamente', 'danger')
            })
        } else {
            showToast('Debe escribir "confirmar" para eliminar', 'warning')
        }
    }

    return (
        <CCard>
            <CCardHeader>
                <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
                    Registro de Ganado
                    <CButton className='button-no-hover-green text-white' onClick={() => setVisible(!visible)}>
                        <CIcon icon={cilPlus} className="me-2" />
                        Agregar Bovino
                    </CButton>
                </h4>
            </CCardHeader>

            <CCardBody>
                <CTable hover responsive>
                    <CTableHead className="table-header-custom">
                        <CTableRow>
                            <CTableHeaderCell className='text-green'>Cattle Number</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Breed Bovine</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Date-Birth</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Color</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Weight</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Stage</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Status Cattle</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {cattle.map((cattle) => (
                            <CTableRow key={cattle.cattle_number}>
                                <CTableDataCell>{cattle?.cattle_number || ''} </CTableDataCell>
                                <CTableDataCell>{cattle?.breed_bovine || ''} </CTableDataCell>
                                <CTableDataCell>{cattle?.date_birth || ''} </CTableDataCell>
                                <CTableDataCell>{cattle?.color_cattle|| ''} </CTableDataCell>
                                <CTableDataCell>{cattle?.weight || ''} </CTableDataCell>
                                <CTableDataCell>{cattle?.stage || ''} </CTableDataCell>
                                <CTableDataCell>{cattle?.statu_cattle || ''} </CTableDataCell>

                                <CTableDataCell>
                                    <div className='d-flex'>
                                        <CButton
                                            className='me-2 mb-2'
                                            size='sm' color='info'
                                            variant='outline'
                                            onClick={() => {
                                                setCurrentCattle(cattle);
                                                setEditVisible(true);
                                            }}>
                                            Editar
                                        </CButton>

                                        <CButton
                                            className='me-2 mb-2'
                                            size='sm'
                                            color='danger'
                                            variant='outline'
                                            onClick={() => { setCurrentCattle(cattle); setDeleteVisible(true); }}>
                                            Eliminar
                                        </CButton>

                                        <CButton
                                            className='me-2 mb-2'
                                            size='sm'
                                            color='primary'
                                            variant='outline'
                                            onClick={() => { setCurrentCattle(cattle); setViewVisible(true); }}>
                                            Visualizar
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
                className="modern-modal"
            >
                <CModalHeader className='modern-modal-header'>
                    <CModalTitle className='modern-modal-title'>
                        Datos del Bovino
                    </CModalTitle>
                </CModalHeader>

                <CModalBody className="modern-modal-body"
                    style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {sections[currentSection]}
                </CModalBody>

                <CModalFooter className="modern-modal-footer">
                    <CButton
                        className='button-no-hover-green text-white'
                        onClick={handleAddCattle}>
                        Agregar
                    </CButton>
                </CModalFooter>
            </CModal>

            <CModal
                alignment="center"
                scrollable
                visible={editVisible}
                onClose={() => setEditVisible(false)}
                className="modern-modal"
            >
                <CModalHeader className='modern-modal-header'>
                    <CModalTitle className='modern-modal-title'>
                        Editar Bovino
                    </CModalTitle>
                </CModalHeader>


                <CModalBody className="modern-modal-body"
                    style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {editsections[currentEditSection]}
                </CModalBody>

                <CModalFooter className="modern-modal-footer">
                    <CButton
                        className='button-no-hover-green text-white'
                        onClick={handleEditCattle}>
                        Guardar cambios
                    </CButton>

                </CModalFooter>
            </CModal>
            <CModal
                visible={deleteVisible}
                onClose={() => setDeleteVisible(false)}
                className="modern-modal"
            >
                <CModalHeader className='modern-modal-header'>
                    <CModalTitle className='modern-modal-title'>
                        Eliminar Bovino
                    </CModalTitle>
                </CModalHeader>
                <CModalBody className="modern-modal-body">
                    <h6>
                        Por favor escriba "confirmar" para eliminar el bovino
                    </h6>
                    <CFormInput
                        placeholder="confirmar"
                        className='modal-border'
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)} />
                </CModalBody>
                <CModalFooter className="modern-modal-footer">
                    <CButton
                        className='button-no-hover green'
                        onClick={() => setDeleteVisible(false)}>
                        <h6 className='typography-color'>
                            Cancelar
                        </h6>
                    </CButton>

                    <CButton
                        className='button-no-hover-green'
                        onClick={handleDeleteCattle}>
                        <h6 className='typography-color'>
                            Eliminar
                        </h6>
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal alignment="center" scrollable visible={viewVisible} onClose={() => setViewVisible(false)} className="modern-modal">
                <CModalHeader className='modern-modal-header'>
                    <CModalTitle className='modern-modal-title'>Detalles del Bovino</CModalTitle>
                </CModalHeader>
                <CModalBody className="modern-modal-body">
                    {currentCattle ? (
                        <>
                            <p><strong>Número de Arete:</strong> {currentCattle.cattle_number || currentCattle.number_Bovino}</p>
                            <p><strong>Raza:</strong> {currentCattle.breed_bovine}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {currentCattle.date_birth}</p>
                            <p><strong>Color:</strong> {currentCattle.color_cattle}</p>
                            <p><strong>Peso:</strong> {currentCattle.weight}</p>
                            <p><strong>Etapa:</strong> {currentCattle.stage}</p>
                            <p><strong>Estado:</strong> {currentCattle.statu_cattle}</p>
                        </>
                    ) : (
                        <p>No hay detalles disponibles.</p>
                    )}
                </CModalBody>
                <CModalFooter className="modern-modal-footer">
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
export default Cattle;
