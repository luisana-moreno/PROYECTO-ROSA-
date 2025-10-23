import React, { useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilPlus,
    cilFilter,
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
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
} from '@coreui/react';

const SectionInventory = ({ addInventory, setAddInventory, insumoType, setInsumoType }) => (
    <div>
        <CRow className="g-3 mt-2">
            <h4 className="text-green mt-1 me-5">Registro de Inventario</h4>
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
            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    placeholder="Nuevo Insumo"
                    aria-label="Nuevo Insumo"
                    value={addInventory.newInsumo || ''}
                    onChange={(e) => setAddInventory({ ...addInventory, newInsumo: e.target.value })}
                    disabled={insumoType !== 'Otro'}
                />
                <small className="text-muted">
                    {insumoType === 'Otro'
                        ? 'Ingrese el nuevo insumo.'
                        : 'Este campo solo está disponible si selecciona "Otro".'}
                </small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    placeholder="Nombre del Insumo"
                    aria-label="Nombre del Insumo"
                    value={addInventory.name || ''}
                    onChange={(e) => setAddInventory({ ...addInventory, name: e.target.value })}
                />
                <small className="text-muted">Ingrese el nombre del insumo.</small>
            </CCol>
            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    placeholder="Cantidad"
                    aria-label="Cantidad"
                    type="number"
                    value={addInventory.quantity || ''}
                    onChange={(e) => setAddInventory({ ...addInventory, quantity: e.target.value })}
                />
                <small className="text-muted">Ingrese la cantidad.</small>
            </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    type="date"
                    placeholder="Fecha de Ingreso"
                    aria-label="Fecha de Ingreso"
                    value={addInventory.entryDate || ''}
                    onChange={(e) => setAddInventory({ ...addInventory, entryDate: e.target.value })}
                />
                <small className="text-muted">Ingrese la fecha de ingreso.</small>
            </CCol>
            <CCol md={6}>
                <CFormInput
                    className="modal-name custom-select"
                    type="date"
                    placeholder="Fecha de Egreso"
                    aria-label="Fecha de Egreso"
                    value={addInventory.exitDate || ''}
                    onChange={(e) => setAddInventory({ ...addInventory, exitDate: e.target.value })}
                />
                <small className="text-muted">Ingrese la fecha de egreso.</small>
            </CCol>
        </CRow>
    </div>
);

const Inventory = () => {
    const [visibleInventory, setVisibleInventory] = useState(false);
    const [editVisibleInventory, setEditVisibleInventory] = useState(false);
    const [deleteVisibleInventory, setDeleteVisibleInventory] = useState(false);
    const [currentInventory, setCurrentInventory] = useState(null);
    const [deleteConfirmationInventory, setDeleteConfirmationInventory] = useState('');
    const [inventory, setInventory] = useState([
        {
            id: 1,
            type: 'Ingreso',
            category: 'Alimentos',
            name: 'Maíz',
            quantity: 100,
            entryDate: '2025-06-01',
            exitDate: '',
        },
        {
            id: 2,
            type: 'Egreso',
            category: 'Vacunas',
            name: 'Vacuna A',
            quantity: 50,
            entryDate: '',
            exitDate: '2025-05-10',
        },
    ]);
    const [addInventory, setAddInventory] = useState({});
    const [insumoType, setInsumoType] = useState('');
    const [activeKey, setActiveKey] = useState(1);
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        date: '',
    });

    const handleAddInventory = () => {
        setInventory([...inventory, { id: inventory.length + 1, ...addInventory }]);
        setAddInventory({});
        setVisibleInventory(false);
    };

    const handleEditInventory = () => {
        setInventory(
            inventory.map((item) =>
                item.id === currentInventory.id ? currentInventory : item
            )
        );
        setEditVisibleInventory(false);
    };

    const handleDeleteInventory = () => {
        if (deleteConfirmationInventory === 'confirmar') {
            setInventory(inventory.filter((item) => item.id !== currentInventory.id));
            setDeleteVisibleInventory(false);
        } else {
            console.error('Delete confirmation failed.');
        }
    };

    const filteredInventory = inventory.filter((item) => {
        const matchesType = filters.type ? item.type === filters.type : true;
        const matchesCategory = filters.category ? item.category === filters.category : true;
        return matchesType && matchesCategory;
    });

    return (
        <CCard>
            <CCardHeader>
                <h4 className="typography-color-title  mb-0 d-flex justify-content-between align-items-center">
                    Registro de Inventario
                    <CButton className="button-no-hover-green text-white" onClick={() => setVisibleInventory(true)}>
                        <CIcon icon={cilPlus} className="me-2" />
                        Agregar Registro
                    </CButton>
                </h4>
            </CCardHeader>
            <CCardBody>
                <CRow className="mb-3">
                    <CCol md={3}>
                        <CFormSelect
                            className="modal-name custom-select"
                            placeholder="Tipo"
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="">Filtrar por tipo</option>
                            <option value="Ingreso">Ingreso</option>
                            <option value="Egreso">Egreso</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                        <CFormSelect
                            className="modal-name custom-select"
                            placeholder="Categoría"
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        >
                            <option value="">Filtrar por categoría</option>
                            <option value="Alimentos">Alimentos</option>
                            <option value="Vacunas">Vacunas</option>
                            <option value="Herramientas">Herramientas</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                        <CButton className="button-no-hover-green text-white" onClick={() => setFilters({ type: '', category: '', date: '' })}>
                            <CIcon icon={cilFilter} className="me-2" />
                            Limpiar Filtros
                        </CButton>
                    </CCol>
                </CRow>
                <CNav variant="tabs" role="tablist">
                    <CNavItem>
                        <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                            Ingresos
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                            Egresos
                        </CNavLink>
                    </CNavItem>
                </CNav>
                <CTabContent>
                    <CTabPane visible={activeKey === 1}>
                        <CTable hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                                    <CTableHeaderCell>Categoría</CTableHeaderCell>
                                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                                    <CTableHeaderCell>Cantidad</CTableHeaderCell>
                                    <CTableHeaderCell>Fecha de Ingreso</CTableHeaderCell>
                                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {filteredInventory
                                    .filter((item) => item.type === 'Ingreso')
                                    .map((item) => (
                                        <CTableRow key={item.id}>
                                            <CTableDataCell>{item.type}</CTableDataCell>
                                            <CTableDataCell>{item.category}</CTableDataCell>
                                            <CTableDataCell>{item.name}</CTableDataCell>
                                            <CTableDataCell>{item.quantity}</CTableDataCell>
                                            <CTableDataCell>{item.entryDate}</CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex">
                                                    <CButton
                                                        className="me-2 mb-2"
                                                        size="sm"
                                                        color="info"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setCurrentInventory(item);
                                                            setEditVisibleInventory(true);
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
                                                            setCurrentInventory(item);
                                                            setDeleteVisibleInventory(true);
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
                    </CTabPane>
                    <CTabPane visible={activeKey === 2}>
                        <CTable hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                                    <CTableHeaderCell>Categoría</CTableHeaderCell>
                                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                                    <CTableHeaderCell>Cantidad</CTableHeaderCell>
                                    <CTableHeaderCell>Fecha de Egreso</CTableHeaderCell>
                                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {filteredInventory
                                    .filter((item) => item.type === 'Egreso')
                                    .map((item) => (
                                        <CTableRow key={item.id}>
                                            <CTableDataCell>{item.type}</CTableDataCell>
                                            <CTableDataCell>{item.category}</CTableDataCell>
                                            <CTableDataCell>{item.name}</CTableDataCell>
                                            <CTableDataCell>{item.quantity}</CTableDataCell>
                                            <CTableDataCell>{item.exitDate}</CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex">
                                                    <CButton
                                                        className="me-2 mb-2"
                                                        size="sm"
                                                        color="info"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setCurrentInventory(item);
                                                            setEditVisibleInventory(true);
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
                                                            setCurrentInventory(item);
                                                            setDeleteVisibleInventory(true);
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
                    </CTabPane>
                </CTabContent>
            </CCardBody>
            <CModal alignment="center" scrollable visible={visibleInventory} onClose={() => setVisibleInventory(false)}>
                <CModalHeader className='modal-module'>
                    <CModalTitle className='typography-color'>Registro de Inventario</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <SectionInventory addInventory={addInventory} setAddInventory={setAddInventory} insumoType={insumoType} setInsumoType={setInsumoType} />
                </CModalBody>
                <CModalFooter>
                    <CButton className="button-no-hover-green text-white" onClick={handleAddInventory}>
                        Guardar
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal alignment="center" scrollable visible={editVisibleInventory} onClose={() => setEditVisibleInventory(false)}>
                <CModalHeader className='modal-module'>
                    <CModalTitle className='typography-color'>Editar Registro</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <SectionInventory addInventory={currentInventory} setAddInventory={setCurrentInventory} insumoType={currentInventory?.type || ''} setInsumoType={(type) => setCurrentInventory({ ...currentInventory, type })} />
                </CModalBody>
                <CModalFooter>
                    <CButton className="button-no-hover-green text-white" onClick={handleEditInventory}>
                        Guardar cambios
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal visible={deleteVisibleInventory} onClose={() => setDeleteVisibleInventory(false)}>
                <CModalHeader className='modal-module'>
                    <CModalTitle className='typography-color'>Eliminar Registro</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <h6>Por favor escriba "confirmar" para eliminar el registro</h6>
                    <CFormInput
                        placeholder="confirmar"
                        className="modal-border"
                        value={deleteConfirmationInventory}
                        onChange={(e) => setDeleteConfirmationInventory(e.target.value)}
                    />
                </CModalBody>
                <CModalFooter>
                    <CButton className="button-no-hover green" onClick={() => setDeleteVisibleInventory(false)}>
                        Cancelar
                    </CButton>
                    <CButton className="button-no-hover-green" onClick={handleDeleteInventory}>
                        Eliminar
                    </CButton>
                </CModalFooter>
            </CModal>
        </CCard>
    );
};

export default Inventory;