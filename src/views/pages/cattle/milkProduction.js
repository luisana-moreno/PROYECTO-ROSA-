import React, { useState } from 'react';
import { helpFetch } from 'src/helpper/helpFetch'
const { get, post, put, del } = helpFetch()
import {
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CFormInput,
    CFormSelect,
    CRow,
    CCol,
    CAlert
} from '@coreui/react';

const MilkProduction = () => {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [milkRecords, setMilkRecords] = useState([
        { id: 1, type: 'Bovino', identifier: '1001', day: 'lunes', liters: 50, morningStart: '06:00', morningEnd: '08:00', afternoonStart: '14:00', afternoonEnd: '16:00' },
        { id: 2, type: 'Lote', identifier: 'Lote A', day: 'martes', liters: 120, morningStart: '06:00', morningEnd: '08:00', afternoonStart: '14:00', afternoonEnd: '16:00' },
    ]);
    const [newRecord, setNewRecord] = useState({
        type: 'Bovino', // Bovino o Lote
        identifier: '',
        day: '',
        liters: '',
        morningStart: '',
        morningEnd: '',
        afternoonStart: '',
        afternoonEnd: '',
    });

    const [toast, setToast] = useState({ show: false, message: '', color: 'success' });
    const showToast = (message, color = 'success') => {
        setToast({ show: true, message, color });
        setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500);
    };

    const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

    const handleAddRecord = () => {
        setMilkRecords([...milkRecords, { id: milkRecords.length + 1, ...newRecord }]);
        setNewRecord({
            type: 'Bovino',
            identifier: '',
            day: '',
            liters: '',
            morningStart: '',
            morningEnd: '',
            afternoonStart: '',
            afternoonEnd: '',
        });
        setVisible(false);
        showToast('Registro agregado correctamente', 'success');
    };

    const handleEditRecord = () => {
        setMilkRecords(
            milkRecords.map((record) =>
                record.id === currentRecord.id ? currentRecord : record
            )
        );
        setEditVisible(false);
        showToast('Registro editado correctamente', 'info');
    };

    const handleDeleteRecord = () => {
        if (deleteConfirmation === 'confirmar') {
            setMilkRecords(milkRecords.filter((record) => record.id !== currentRecord.id));
            setDeleteVisible(false);
            showToast('Registro eliminado correctamente', 'danger');
        } else {
            showToast('Debe escribir "confirmar" para eliminar', 'warning');
        }
    };

    return (
        <CCard>
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
            <CCardHeader>
                <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
                    Registro de Producción de Leche
                    <CButton className="button-no-hover-green text-white" onClick={() => setVisible(true)}>
                        Agregar Registro
                    </CButton>
                </h4>
            </CCardHeader>
            <CCardBody>
                <CTable hover responsive className="shadow-sm">
                    <CTableHead className="table-header-custom">
                        <CTableRow>
                            <CTableHeaderCell className='text-green'>Tipo</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Identificador</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Día</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Litros</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Inicio Mañana</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Fin Mañana</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Inicio Tarde</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Fin Tarde</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Acciones</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {milkRecords.map((record) => (
                            <CTableRow key={record.id}>
                                <CTableDataCell>{record.type}</CTableDataCell>
                                <CTableDataCell>{record.identifier}</CTableDataCell>
                                <CTableDataCell>{record.day}</CTableDataCell>
                                <CTableDataCell>{record.liters}</CTableDataCell>
                                <CTableDataCell>{record.morningStart}</CTableDataCell>
                                <CTableDataCell>{record.morningEnd}</CTableDataCell>
                                <CTableDataCell>{record.afternoonStart}</CTableDataCell>
                                <CTableDataCell>{record.afternoonEnd}</CTableDataCell>
                                <CTableDataCell>
                                    <div className="d-flex">
                                        <CButton
                                            className="me-2 mb-2"
                                            size="sm"
                                            color="info"
                                            variant="outline"
                                            onClick={() => {
                                                setCurrentRecord(record);
                                                setEditVisible(true);
                                            }}
                                        >
                                            <h6>Editar</h6>
                                        </CButton>
                                        <CButton
                                            className="me-2 mb-2"
                                            size="sm"
                                            color="danger"
                                            variant="outline"
                                            onClick={() => {
                                                setCurrentRecord(record);
                                                setDeleteVisible(true);
                                            }}
                                        >
                                            <h6>Eliminar</h6>
                                        </CButton>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>

            {/* Modal para agregar registro */}
            <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)} className="modern-modal">
                <CModalHeader className='modern-modal-header'>
                    <CModalTitle className='modern-modal-title'>Agregar Registro</CModalTitle>
                </CModalHeader>
                <CModalBody className="modern-modal-body">
                    <CRow className="g-3 mt-2">
                        <CCol md={6}>
                            <CFormSelect
                                className="modal-name custom-select"
                                value={newRecord.type}
                                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                            >
                                <option value="">Seleccione el tipo de registro</option>
                                <option value="Bovino">Bovino</option>
                                <option value="Lote">Lote</option>
                            </CFormSelect>
                            <small className="text-muted">Seleccione el tipo de registro.</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                placeholder={newRecord.type === 'Bovino' ? 'Número de Bovino' : 'Número de Lote'}
                                value={newRecord.identifier}
                                onChange={(e) => setNewRecord({ ...newRecord, identifier: e.target.value })}
                            />
                            <small className="text-muted">
                                {newRecord.type === 'Bovino'
                                    ? 'Ingrese el número de bovino.'
                                    : 'Ingrese el número de lote.'}
                            </small>
                        </CCol>
                    </CRow>
                    <CRow className="g-3 mt-2">
                        <CCol md={6}>
                            <CFormSelect
                                className="modal-name custom-select"
                                value={newRecord.day}
                                onChange={(e) => setNewRecord({ ...newRecord, day: e.target.value })}
                            >
                                <option value="">Seleccione el día</option>
                                {days.map((day) => (
                                    <option key={day} value={day}>
                                        {day.charAt(0).toUpperCase() + day.slice(1)}
                                    </option>
                                ))}
                            </CFormSelect>
                            <small className="text-muted">Seleccione el día de la semana.</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="number"
                                placeholder="Cantidad de Litros"
                                value={newRecord.liters}
                                onChange={(e) => setNewRecord({ ...newRecord, liters: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la cantidad de litros producidos.</small>
                        </CCol>
                    </CRow>
                    <CRow className="g-3 mt-2">
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="time"
                                placeholder="Inicio Mañana"
                                value={newRecord.morningStart}
                                onChange={(e) => setNewRecord({ ...newRecord, morningStart: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la hora de inicio del ordeño en la mañana.</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="time"
                                placeholder="Fin Mañana"
                                value={newRecord.morningEnd}
                                onChange={(e) => setNewRecord({ ...newRecord, morningEnd: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la hora de finalización del ordeño en la mañana.</small>
                        </CCol>
                    </CRow>
                    <CRow className="g-3 mt-2">
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="time"
                                placeholder="Inicio Tarde"
                                value={newRecord.afternoonStart}
                                onChange={(e) => setNewRecord({ ...newRecord, afternoonStart: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la hora de inicio del ordeño en la tarde.</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="time"
                                placeholder="Fin Tarde"
                                value={newRecord.afternoonEnd}
                                onChange={(e) => setNewRecord({ ...newRecord, afternoonEnd: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la hora de finalización del ordeño en la tarde.</small>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter className="modern-modal-footer">
                    <CButton className="button-no-hover-green text-white" onClick={handleAddRecord}>
                        Agregar
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Modal para editar registro */}
            <CModal alignment="center" scrollable visible={editVisible} onClose={() => setEditVisible(false)} className="modern-modal">
                <CModalHeader className='modern-modal-header'>
                    <CModalTitle className='modern-modal-title'>Editar Registro</CModalTitle>
                </CModalHeader>
                <CModalBody className="modern-modal-body">
                    <CRow className="g-3 mt-2">
                        <CCol md={6}>
                            <CFormSelect
                                className="modal-name custom-select"
                                value={currentRecord?.type || ''}
                                onChange={(e) => setCurrentRecord({ ...currentRecord, type: e.target.value })}
                            >
                                <option value="">Seleccione el tipo de registro</option>
                                <option value="Bovino">Bovino</option>
                                <option value="Lote">Lote</option>
                            </CFormSelect>
                            <small className="text-muted">Seleccione el tipo de registro.</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                placeholder={currentRecord?.type === 'Bovino' ? 'Número de Bovino' : 'Número de Lote'}
                                value={currentRecord?.identifier || ''}
                                onChange={(e) => setCurrentRecord({ ...currentRecord, identifier: e.target.value })}
                            />
                            <small className="text-muted">
                                {currentRecord?.type === 'Bovino'
                                    ? 'Ingrese el número de bovino.'
                                    : 'Ingrese el número de lote.'}
                            </small>
                        </CCol>
                    </CRow>
                    <CRow className="g-3 mt-2">
                        <CCol md={6}>
                            <CFormSelect
                                className="modal-name custom-select"
                                value={currentRecord?.day || ''}
                                onChange={(e) => setCurrentRecord({ ...currentRecord, day: e.target.value })}
                            >
                                <option value="">Seleccione el día</option>
                                {days.map((day) => (
                                    <option key={day} value={day}>
                                        {day.charAt(0).toUpperCase() + day.slice(1)}
                                    </option>
                                ))}
                            </CFormSelect>
                            <small className="text-muted">Seleccione el día de la semana.</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="number"
                                placeholder="Cantidad de Litros"
                                value={currentRecord?.liters || ''}
                                onChange={(e) => setCurrentRecord({ ...currentRecord, liters: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la cantidad de litros producidos.</small>
                        </CCol>
                    </CRow>
                    <CRow className="g-3 mt-2">
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="time"
                                placeholder="Inicio Mañana"
                                value={currentRecord?.morningStart || ''}
                                onChange={(e) => setCurrentRecord({ ...currentRecord, morningStart: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la hora de inicio del ordeño en la mañana.</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="time"
                                placeholder="Fin Mañana"
                                value={currentRecord?.morningEnd || ''}
                                onChange={(e) => setCurrentRecord({ ...currentRecord, morningEnd: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la hora de finalización del ordeño en la mañana.</small>
                        </CCol>
                    </CRow>
                    <CRow className="g-3 mt-2">
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="time"
                                placeholder="Inicio Tarde"
                                value={currentRecord?.afternoonStart || ''}
                                onChange={(e) => setCurrentRecord({ ...currentRecord, afternoonStart: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la hora de inicio del ordeño en la tarde.</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                className="modal-name custom-select"
                                type="time"
                                placeholder="Fin Tarde"
                                value={currentRecord?.afternoonEnd || ''}
                                onChange={(e) => setCurrentRecord({ ...currentRecord, afternoonEnd: e.target.value })}
                            />
                            <small className="text-muted">Ingrese la hora de finalización del ordeño en la tarde.</small>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter className="modern-modal-footer">
                    <CButton className="button-no-hover-green text-white" onClick={handleEditRecord}>
                        Guardar cambios
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Modal para eliminar registro */}
            <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)} className="modern-modal">
                <CModalHeader className='modern-modal-header'>
                    <CModalTitle className='modern-modal-title'>Eliminar Registro</CModalTitle>
                </CModalHeader>
                <CModalBody className="modern-modal-body">
                    <h6>Por favor escriba "confirmar" para eliminar el registro</h6>
                    <CFormInput
                        placeholder="confirmar"
                        className="modal-border"
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                    />
                </CModalBody>
                <CModalFooter className="modern-modal-footer">
                    <CButton className="button-no-hover green" onClick={() => setDeleteVisible(false)}>
                        <h6 className='typography-color'>Cancelar</h6>
                    </CButton>
                    <CButton className="button-no-hover-green" onClick={handleDeleteRecord}>
                        <h6 className='typography-color'>Eliminar</h6>
                    </CButton>
                </CModalFooter>
            </CModal>
        </CCard>
    );
};

export default MilkProduction;
