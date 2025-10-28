import React, { useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilPlus,
    cilTag,
    cilWallet,
    cilCalendar,
} from '@coreui/icons';
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
} from '@coreui/react';

const SectionInsumo = ({ addFinance, setAddFinance, insumoType, setInsumoType }) => (
    <div>
        <CRow className="g-3 mt-2">
            <h4 className="text-green mt-1 me-5">Registro de Insumos</h4>
            <CCol md={6}>
                <CFormSelect
                    className="modal-name custom-select"
                    placeholder="Tipo de Insumo"
                    aria-label="Tipo de Insumo"
                    value={insumoType}
                    onChange={(e) => setInsumoType(e.target.value)}
                >
                    <option value="">Seleccione el tipo de insumo</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Vacunas">Vacunas</option>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Otro">Otro</option>
                </CFormSelect>
                <small className="text-muted">Seleccione el tipo de insumo.</small>
            </CCol>
            {insumoType === 'Otro' && (
                <CCol md={6}>
                    <CFormInput
                        className="modal-name custom-select"
                        placeholder="Nuevo Insumo"
                        aria-label="Nuevo Insumo"
                        value={addFinance.newInsumo || ''}
                        onChange={(e) => setAddFinance({ ...addFinance, newInsumo: e.target.value })}
                    />
                    <small className="text-muted">Ingrese el nuevo insumo.</small>
                </CCol>
            )}
        </CRow>
        <CRow className="g-3 mt-2">
            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    placeholder="Nombre del Insumo"
                    aria-label="Nombre del Insumo"
                    value={addFinance.name || ''}
                    onChange={(e) => setAddFinance({ ...addFinance, name: e.target.value })}
                />
                <small className="text-muted">Ingrese el nombre del insumo.</small>
            </CCol>
            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    placeholder="Cantidad"
                    aria-label="Cantidad"
                    type="number"
                    value={addFinance.quantity || ''}
                    onChange={(e) => setAddFinance({ ...addFinance, quantity: e.target.value })}
                />
                <small className="text-muted">Ingrese la cantidad.</small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    type="date"
                    placeholder="Fecha de Vencimiento"
                    aria-label="Fecha de Vencimiento"
                    value={addFinance.expirationDate || ''}
                    onChange={(e) => setAddFinance({ ...addFinance, expirationDate: e.target.value })}
                />
                <small className="text-muted">Ingrese la fecha de vencimiento.</small>
            </CCol>
            <CCol md={6}>
                <CFormSelect
                    className="modal-name custom-select"
                    placeholder="Estado de Pago"
                    aria-label="Estado de Pago"
                    value={addFinance.paymentStatus || ''}
                    onChange={(e) => setAddFinance({ ...addFinance, paymentStatus: e.target.value })}
                >
                    <option value="">Seleccione el estado de pago</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                </CFormSelect>
                <small className="text-muted">Seleccione el estado de pago.</small>
            </CCol>
        </CRow>
    </div>
);

const Finances = () => {
    const [visibleFinance, setVisibleFinance] = useState(false);
    const [editVisibleFinance, setEditVisibleFinance] = useState(false);
    const [deleteVisibleFinance, setDeleteVisibleFinance] = useState(false);
    const [currentFinance, setCurrentFinance] = useState(null);
    const [deleteConfirmationFinance, setDeleteConfirmationFinance] = useState('');
    const [finances, setFinances] = useState([
        {
            id: 1,
            type: 'Alimentos',
            name: 'Maíz',
            quantity: 100,
            expirationDate: '2025-06-01',
            paymentStatus: 'Pendiente',
        },
        {
            id: 2,
            type: 'Vacunas',
            name: 'Vacuna A',
            quantity: 50,
            expirationDate: '2025-12-01',
            paymentStatus: 'Pagado',
        },
    ]);
    const [addFinance, setAddFinance] = useState({});
    const [insumoType, setInsumoType] = useState('');

    const handleAddFinance = () => {
        setFinances([...finances, { id: finances.length + 1, ...addFinance }]);
        setAddFinance({});
        setVisibleFinance(false);
    };

    const handleEditFinance = () => {
        setFinances(
            finances.map((finance) =>
                finance.id === currentFinance.id ? currentFinance : finance
            )
        );
        setEditVisibleFinance(false);
    };

    const handleDeleteFinance = () => {
        if (deleteConfirmationFinance === 'confirmar') {
            setFinances(finances.filter((finance) => finance.id !== currentFinance.id));
            setDeleteVisibleFinance(false);
        } else {
            console.error('Delete confirmation failed.');
        }
    };

    return (
        <CCard>
            <CCardHeader>
                <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
                    Registro de Finanzas
                    <CButton className="button-no-hover-green text-white" onClick={() => setVisibleFinance(true)}>
                        <CIcon icon={cilPlus} className="me-2" />
                        Agregar Registro
                    </CButton>
                </h4>
            </CCardHeader>
            <CCardBody>
                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Tipo</CTableHeaderCell>
                            <CTableHeaderCell>Nombre</CTableHeaderCell>
                            <CTableHeaderCell>Cantidad</CTableHeaderCell>
                            <CTableHeaderCell>Fecha de Vencimiento</CTableHeaderCell>
                            <CTableHeaderCell>Estado de Pago</CTableHeaderCell>
                            <CTableHeaderCell>Acciones</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {finances.map((finance) => (
                            <CTableRow key={finance.id}>
                                <CTableDataCell>{finance.type}</CTableDataCell>
                                <CTableDataCell>{finance.name}</CTableDataCell>
                                <CTableDataCell>{finance.quantity}</CTableDataCell>
                                <CTableDataCell>{finance.expirationDate}</CTableDataCell>
                                <CTableDataCell>{finance.paymentStatus}</CTableDataCell>
                                <CTableDataCell>
                                    <div className="d-flex">
                                        <CButton
                                            className="me-2 mb-2"
                                            size="sm"
                                            color="info"
                                            variant="outline"
                                            onClick={() => {
                                                setCurrentFinance(finance);
                                                setEditVisibleFinance(true);
                                            }}
                                        >
                                            Editar
                                        </CButton>
                                        <CButton
                                            className="me-2 mb-2"
                                            size="sm"
                                            color="danger"
                                            variant="outline"
                                            onClick={() => {
                                                setCurrentFinance(finance);
                                                setDeleteVisibleFinance(true);
                                            }}
                                        >
                                            Eliminar
                                        </CButton>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
            <CModal alignment="center" scrollable visible={visibleFinance} onClose={() => setVisibleFinance(false)}>
                <CModalHeader>
                    <CModalTitle>Registro de Finanzas</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <SectionInsumo addFinance={addFinance} setAddFinance={setAddFinance} insumoType={insumoType} setInsumoType={setInsumoType} />
                </CModalBody>
                <CModalFooter>
                    <CButton className="button-no-hover-green text-white" onClick={handleAddFinance}>
                        Guardar
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal alignment="center" scrollable visible={editVisibleFinance} onClose={() => setEditVisibleFinance(false)}>
                <CModalHeader>
                    <CModalTitle>Editar Registro</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <SectionInsumo addFinance={currentFinance} setAddFinance={setCurrentFinance} insumoType={currentFinance?.type || ''} setInsumoType={(type) => setCurrentFinance({ ...currentFinance, type })} />
                </CModalBody>
                <CModalFooter>
                    <CButton className="button-no-hover-green text-white" onClick={handleEditFinance}>
                        Guardar cambios
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal visible={deleteVisibleFinance} onClose={() => setDeleteVisibleFinance(false)}>
                <CModalHeader>
                    <CModalTitle>Eliminar Registro</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <h6>Por favor escriba "confirmar" para eliminar el registro</h6>
                    <CFormInput
                        placeholder="confirmar"
                        className="modal-border"
                        value={deleteConfirmationFinance}
                        onChange={(e) => setDeleteConfirmationFinance(e.target.value)}
                    />
                </CModalBody>
                <CModalFooter>
                    <CButton className="button-no-hover green" onClick={() => setDeleteVisibleFinance(false)}>
                        Cancelar
                    </CButton>
                    <CButton className="button-no-hover-green" onClick={handleDeleteFinance}>
                        Eliminar
                    </CButton>
                </CModalFooter>
            </CModal>
        </CCard>
    );
};

export default Finances;