import React, { useState, useEffect } from 'react';
import { helpFetch } from 'src/helpper/helpFetch';
const { get, post, put, del } = helpFetch();
import CIcon from '@coreui/icons-react';
import {
  cilPlus,
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
  CAlert,
  CFormTextarea,
} from '@coreui/react';

const SectionOne = ({ addFinance, setAddFinance }) => (
  <div>
    <CRow className="g-3 mt-2">
      <h4 className="text-green mt-1 me-5">Registrar Movimiento Financiero</h4>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Descripción"
          aria-label="Descripción"
          value={addFinance.description || ''}
          onChange={(e) => setAddFinance({ ...addFinance, description: e.target.value })}
        />
        <small className="text-muted">Ingrese una descripción del movimiento.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          type="number"
          placeholder="Monto"
          aria-label="Monto"
          value={addFinance.amount || ''}
          onChange={(e) => setAddFinance({ ...addFinance, amount: parseFloat(e.target.value) || '' })}
        />
        <small className="text-muted">Ingrese el monto.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Tipo"
          aria-label="Tipo"
          value={addFinance.type || ''}
          onChange={(e) => setAddFinance({ ...addFinance, type: e.target.value })}
        >
          <option value="">Seleccione el tipo</option>
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </CFormSelect>
        <small className="text-muted">Seleccione el tipo de movimiento.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          type="date"
          placeholder="Fecha"
          aria-label="Fecha"
          value={addFinance.date || ''}
          onChange={(e) => setAddFinance({ ...addFinance, date: e.target.value })}
        />
        <small className="text-muted">Ingrese la fecha del movimiento.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={12}>
        <CFormTextarea
          className="modal-name custom-select"
          placeholder="Notas adicionales"
          aria-label="Notas adicionales"
          value={addFinance.notes || ''}
          onChange={(e) => setAddFinance({ ...addFinance, notes: e.target.value })}
          rows="3"
        ></CFormTextarea>
        <small className="text-muted">Notas adicionales sobre el movimiento.</small>
      </CCol>
    </CRow>
  </div>
);

const EditSectionOne = ({ currentFinance, setCurrentFinance }) => (
  <div>
    <CRow className="g-3 mt-2">
      <h4 className="text-green mt-1 me-5">Editar Movimiento Financiero</h4>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Descripción"
          aria-label="Descripción"
          value={currentFinance?.description || ''}
          onChange={(e) => setCurrentFinance({ ...currentFinance, description: e.target.value })}
        />
        <small className="text-muted">Ingrese una descripción del movimiento.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          type="number"
          placeholder="Monto"
          aria-label="Monto"
          value={currentFinance?.amount || ''}
          onChange={(e) => setCurrentFinance({ ...currentFinance, amount: parseFloat(e.target.value) || '' })}
        />
        <small className="text-muted">Ingrese el monto.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Tipo"
          aria-label="Tipo"
          value={currentFinance?.type || ''}
          onChange={(e) => setCurrentFinance({ ...currentFinance, type: e.target.value })}
        >
          <option value="">Seleccione el tipo</option>
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </CFormSelect>
        <small className="text-muted">Seleccione el tipo de movimiento.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          type="date"
          placeholder="Fecha"
          aria-label="Fecha"
          value={currentFinance?.date || ''}
          onChange={(e) => setCurrentFinance({ ...currentFinance, date: e.target.value })}
        />
        <small className="text-muted">Ingrese la fecha del movimiento.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={12}>
        <CFormTextarea
          className="modal-name custom-select"
          placeholder="Notas adicionales"
          aria-label="Notas adicionales"
          value={currentFinance?.notes || ''}
          onChange={(e) => setCurrentFinance({ ...currentFinance, notes: e.target.value })}
          rows="3"
        ></CFormTextarea>
        <small className="text-muted">Notas adicionales sobre el movimiento.</small>
      </CCol>
    </CRow>
  </div>
);

const Finance = () => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentEditSection, setEditCurrentSection] = useState(0);
  const [currentFinance, setCurrentFinance] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [finances, setFinances] = useState([]);
  const [addFinance, setAddFinance] = useState({
    description: '',
    amount: '',
    type: '',
    date: '',
    notes: '',
  });
  const [toast, setToast] = useState({ show: false, message: '', color: 'success' });

  const showToast = (message, color = 'success') => {
    setToast({ show: true, message, color });
    setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500);
  };

  // Cargar movimientos financieros al iniciar
  useEffect(() => {
    get('finance').then(data => {
      if (data) setFinances(data);
    });
  }, []);

  const sections = [<SectionOne addFinance={addFinance} setAddFinance={setAddFinance} />];
  const editsections = [<EditSectionOne currentFinance={currentFinance} setCurrentFinance={setCurrentFinance} />];

  // Agregar movimiento financiero
  const handleAddFinance = () => {
    post('finance', addFinance).then(newFinance => {
      if (newFinance) setFinances([...finances, newFinance]);
      setAddFinance({ description: '', amount: '', type: '', date: '', notes: '' });
      setVisible(false);
      showToast('Movimiento financiero agregado correctamente', 'success');
    });
  };

  // Editar movimiento financiero
  const handleEditFinance = () => {
    if (!currentFinance || !currentFinance.id) {
      showToast("No hay movimiento financiero seleccionado para editar.", "warning");
      return;
    }
    put('finance', currentFinance.id, currentFinance).then(updated => {
      if (updated) setFinances(finances.map(f => f.id === updated.id ? updated : f));
      setEditVisible(false);
      showToast('Movimiento financiero editado correctamente', 'info');
    });
  };

  // Eliminar movimiento financiero
  const handleDeleteFinance = () => {
    if (!currentFinance || !currentFinance.id) {
      showToast("No hay movimiento financiero seleccionado para eliminar.", "warning");
      return;
    }
    if (deleteConfirmation === 'confirmar') {
      del('finance', currentFinance.id).then(() => {
        setFinances(finances.filter(f => f.id !== currentFinance.id));
        setDeleteVisible(false);
        showToast('Movimiento financiero eliminado exitosamente', 'danger');
      });
    } else {
      showToast('Debe escribir "confirmar" para eliminar', 'warning');
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Gestión Financiera
          <CButton className="button-no-hover-green text-white" onClick={() => setVisible(!visible)}>
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Movimiento
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive className="shadow-sm">
          <CTableHead className="table-header-custom">
            <CTableRow>
              <CTableHeaderCell className='text-green'>Descripción</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Monto</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Tipo</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Fecha</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Notas</CTableHeaderCell>
              <CTableHeaderCell className='text-green'>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {finances.map((finance) => (
              <CTableRow key={finance.id}>
                <CTableDataCell>{finance.description}</CTableDataCell>
                <CTableDataCell>{finance.amount}</CTableDataCell>
                <CTableDataCell>{finance.type}</CTableDataCell>
                <CTableDataCell>{finance.date}</CTableDataCell>
                <CTableDataCell>{finance.notes}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex">
                    <CButton
                      className="me-2 mb-2"
                      size="sm"
                      color="info"
                      variant="outline"
                      onClick={() => {
                        setCurrentFinance(finance);
                        setEditVisible(true);
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
                        setDeleteVisible(true);
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
      <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)} className="modern-modal">
        <CModalHeader className='modern-modal-header'>
          <CModalTitle className='modern-modal-title'>Registrar Movimiento Financiero</CModalTitle>
        </CModalHeader>
        <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>{sections[currentSection]}</CModalBody>
        <CModalFooter className="modern-modal-footer">
          <CButton className="button-no-hover-green text-white" onClick={handleAddFinance}>
            Agregar
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal alignment="center" scrollable visible={editVisible} onClose={() => setEditVisible(false)} className="modern-modal">
        <CModalHeader className='modern-modal-header'>
          <CModalTitle className='modern-modal-title'>Editar Movimiento Financiero</CModalTitle>
        </CModalHeader>
        <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>{editsections[currentEditSection]}</CModalBody>
        <CModalFooter className="modern-modal-footer">
          <CButton className="button-no-hover-green text-white" onClick={handleEditFinance}>
            Guardar cambios
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)} className="modern-modal">
        <CModalHeader className='modern-modal-header'>
          <CModalTitle className='modern-modal-title'>Eliminar Movimiento Financiero</CModalTitle>
        </CModalHeader>
        <CModalBody className="modern-modal-body">
          <h6>Por favor escriba "confirmar" para eliminar el movimiento financiero</h6>
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
          <CButton className="button-no-hover-green" onClick={handleDeleteFinance}>
            <h6 className='typography-color'>Eliminar</h6>
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
  );
};

export default Finance;
