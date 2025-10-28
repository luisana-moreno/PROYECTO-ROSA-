import React, { useState, useEffect } from 'react';
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
  CAlert,
} from '@coreui/react';
import { helpFetch } from 'src/helpper/helpFetch'
const { get, post, put, del } = helpFetch()

const SectionOne = ({ addPasture, setAddPasture }) => (
  <div>
    <CRow className="g-3 mt-2">
      <h4 className="text-green mt-1 me-5">Registrar Potrero</h4>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Nombre del Potrero"
          aria-label="Nombre del Potrero"
          value={addPasture.name || ''}
          onChange={(e) => setAddPasture({ ...addPasture, name: e.target.value })}
        />
        <small className="text-muted">Ingrese el nombre del potrero.</small>
      </CCol>
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Estado"
          aria-label="Estado"
          value={addPasture.state || ''}
          onChange={(e) => setAddPasture({ ...addPasture, state: e.target.value })}
        >
          <option value="">Seleccione el estado</option>
          <option value="Disponible">Disponible</option>
          <option value="En mantenimiento">En mantenimiento</option>
          <option value="En uso">En uso</option>
        </CFormSelect>
        <small className="text-muted">Seleccione el estado del potrero.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Lote"
          aria-label="Lote"
          value={addPasture.lot || ''}
          onChange={(e) => setAddPasture({ ...addPasture, lot: e.target.value })}
        />
        <small className="text-muted">Ingrese el lote asignado.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Responsable"
          aria-label="Responsable"
          value={addPasture.responsible || ''}
          onChange={(e) => setAddPasture({ ...addPasture, responsible: e.target.value })}
        />
        <small className="text-muted">Ingrese el responsable del potrero.</small>
      </CCol>
    </CRow>
  </div>
);

const EditSectionOne = ({ currentPasture, setCurrentPasture }) => (
  <div>
    <CRow className="g-3 mt-2">
      <h4 className="text-green mt-1 me-5">Editar Potrero</h4>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Nombre del Potrero"
          aria-label="Nombre del Potrero"
          value={currentPasture?.name || ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, name: e.target.value })}
        />
        <small className="text-muted">Ingrese el nombre del potrero.</small>
      </CCol>
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Estado"
          aria-label="Estado"
          value={currentPasture?.state || ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, state: e.target.value })}
        >
          <option value="">Seleccione el estado</option>
          <option value="Disponible">Disponible</option>
          <option value="En mantenimiento">En mantenimiento</option>
          <option value="En uso">En uso</option>
        </CFormSelect>
        <small className="text-muted">Seleccione el estado del potrero.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Lote"
          aria-label="Lote"
          value={currentPasture?.lot || ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, lot: e.target.value })}
        />
        <small className="text-muted">Ingrese el lote asignado.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Responsable"
          aria-label="Responsable"
          value={currentPasture?.responsible || ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, responsible: e.target.value })}
        />
        <small className="text-muted">Ingrese el responsable del potrero.</small>
      </CCol>
    </CRow>
  </div>
);

const Pastures = () => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentEditSection, setEditCurrentSection] = useState(0);
  const [currentPasture, setCurrentPasture] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [pastures, setPastures] = useState([]);
  const [addPasture, setAddPasture] = useState({
    name: '',
    state: '',
    lot: '',
    responsible: '',
  });
  const [toast, setToast] = useState({ show: false, message: '', color: 'success' });

  const showToast = (message, color = 'success') => {
    setToast({ show: true, message, color });
    setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500);
  };

  // Cargar potreros al iniciar
  useEffect(() => {
    get('pastures').then(data => {
      if (data) setPastures(data)
    })
  }, [])

  const sections = [<SectionOne addPasture={addPasture} setAddPasture={setAddPasture} />];
  const editsections = [<EditSectionOne currentPasture={currentPasture} setCurrentPasture={setCurrentPasture} />];

  // Agregar potrero
  const handleAddPasture = () => {
    post('pastures', addPasture).then(newPasture => {
      if (newPasture) setPastures([...pastures, newPasture])
      setAddPasture({ name: '', state: '', lot: '', responsible: '' });
      setVisible(false);
      showToast('Potrero agregado correctamente', 'success');
    })
  };

  // Editar potrero
  const handleEditPasture = () => {
    if (!currentPasture || !currentPasture.id) {
      showToast("No potrero seleccionado para editar.", "warning");
      return;
    }
    put('pastures', currentPasture.id, currentPasture).then(updated => {
      if (updated) setPastures(pastures.map(p => p.id === updated.id ? updated : p))
      setEditVisible(false);
      showToast('Potrero editado correctamente', 'info');
    })
  };

  // Eliminar potrero
  const handleDeletePasture = () => {
    if (!currentPasture || !currentPasture.id) {
      showToast("No potrero seleccionado para eliminar.", "warning");
      return;
    }
    if (deleteConfirmation === 'confirmar') {
      del('pastures', currentPasture.id).then(() => {
        setPastures(pastures.filter(p => p.id !== currentPasture.id))
        setDeleteVisible(false);
        showToast('Potrero eliminado exitosamente', 'danger');
      })
    } else {
      showToast('Debe escribir "confirmar" para eliminar', 'warning');
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Gestión de Potreros
          <CButton className="button-no-hover-green text-white" onClick={() => setVisible(!visible)}>
            Crear Potrero
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
              <CTableHeaderCell>Lote</CTableHeaderCell>
              <CTableHeaderCell>Responsable</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {pastures.map((pasture) => (
              <CTableRow key={pasture.id}>
                <CTableDataCell>{pasture.name}</CTableDataCell>
                <CTableDataCell>{pasture.state}</CTableDataCell>
                <CTableDataCell>{pasture.lot}</CTableDataCell>
                <CTableDataCell>{pasture.responsible}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex">
                    <CButton
                      className="me-2 mb-2"
                      size="sm"
                      color="info"
                      variant="outline"
                      onClick={() => {
                        setCurrentPasture(pasture);
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
                        setCurrentPasture(pasture);
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
      <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Registrar Potrero</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>{sections[currentSection]}</CModalBody>
        <CModalFooter>
          <CButton className="button-no-hover-green text-white" onClick={handleAddPasture}>
            Agregar
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal alignment="center" scrollable visible={editVisible} onClose={() => setEditVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Potrero</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>{editsections[currentEditSection]}</CModalBody>
        <CModalFooter>
          <CButton className="button-no-hover-green text-white" onClick={handleEditPasture}>
            Guardar cambios
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
        <CModalHeader>
          <CModalTitle>Eliminar Potrero</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>Por favor escriba "confirmar" para eliminar el potrero</h6>
          <CFormInput
            placeholder="confirmar"
            className="modal-border"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton className="button-no-hover green" onClick={() => setDeleteVisible(false)}>
            Cancelar
          </CButton>
          <CButton className="button-no-hover-green" onClick={handleDeletePasture}>
            Eliminar
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

export default Pastures;

