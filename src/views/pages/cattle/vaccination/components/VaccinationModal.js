import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CBadge, // Importar CBadge
} from '@coreui/react'
import { CustomTableModal } from 'src/components' // Importar CustomTableModal

const VaccinationModal = ({
  visible,
  onClose,
  editMode,
  selectedDate,
  formData,
  setFormData,
  employees,
  allCattle, // Cambiado a allCattle
  handleSelectCattle, // Nuevo prop
  onSubmit,
  onDelete,
  cattleModalProps, // Nuevo prop para visibleCattleModal y setVisibleCattleModal
}) => {
  const { visibleCattleModal, setVisibleCattleModal } = cattleModalProps
  console.log('visibleCattleModal en VaccinationModal:', visibleCattleModal)
  const cattleColumns = [
    { key: 'id', label: 'ID' },
    { key: 'cattle_number', label: 'Número de Bovino' },
    { key: 'breed_bovine', label: 'Raza' },
  ]

  // Obtener los objetos de bovinos seleccionados para mostrar en el modal
  const selectedCattleObjects = formData.cattleIds
    .map((id) => allCattle.find((b) => b.id === id))
    .filter(Boolean)

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={onClose}>
        <CModalHeader className="modal-module">
          <CModalTitle className="typograhy-color-title">
            {editMode ? 'Editar Evento de Vacunación' : 'Registrar Vacunación'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            <strong>Fecha:</strong> {selectedDate}
          </p>
          <CForm>
            <div className="mb-3">
              <CButton
                className="button-no-hover-green text-white"
                onClick={() => setVisibleCattleModal(true)}
              >
                Seleccionar Bovinos
              </CButton>
              <div className="mt-2">
                {selectedCattleObjects.length > 0 ? (
                  selectedCattleObjects.map((b) => (
                    <CBadge key={b.id} color="info" className="me-1 mb-1">
                      {b.cattle_number || b.id} - {b.breed_bovine}
                    </CBadge>
                  ))
                ) : (
                  <small className="text-muted">Ningún bovino seleccionado.</small>
                )}
              </div>
            </div>

            <CFormSelect
              className="modal-name mb-3 custom-select"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            >
              <option value="">Seleccione el empleado</option>
              {employees.map((emp) => (
                <option key={emp.ttr_idemplo} value={emp.ttr_idemplo}>
                  {emp.ttr_nombrel} {emp.ttr_apellid} ({emp.cargo_nombre})
                </option>
              ))}
            </CFormSelect>
            <CFormInput
              className="modal-name mb-3 custom-select"
              placeholder="Diagnóstico"
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />
            <CFormInput
              className="modal-name mb-3 custom-select"
              placeholder="Tratamiento"
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
            />
            <CFormInput
              className="modal-name mb-3 custom-select"
              type="text"
              placeholder="Vacuna"
              name="vaccine"
              value={formData.vaccine}
              onChange={(e) => setFormData({ ...formData, vaccine: e.target.value })}
            />
            <CFormInput
              className="modal-name mb-3"
              type="date"
              placeholder="Fecha de Vacunación"
              name="date_vaccination"
              value={formData.date_vaccination}
              onChange={(e) => setFormData({ ...formData, date_vaccination: e.target.value })}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          {editMode && (
            <CButton className="button-no-hover-green" color="danger" onClick={onDelete}>
              Eliminar
            </CButton>
          )}
          <CButton className="button-no-hover-green" onClick={onClose}>
            Cerrar
          </CButton>
          <CButton className="button-no-hover-green" onClick={onSubmit}>
            {editMode ? 'Guardar Cambios' : 'Registrar'}
          </CButton>
        </CModalFooter>
      </CModal>

      {visibleCattleModal && (
        <CustomTableModal
          visible={visibleCattleModal}
          onClose={() => setVisibleCattleModal(false)}
          data={allCattle}
          columns={cattleColumns}
          onSelect={handleSelectCattle}
          selectedItems={selectedCattleObjects}
          setSelectedItems={(selected) =>
            setFormData((prev) => ({ ...prev, cattleIds: selected.map((item) => item.id) }))
          }
          title="Seleccionar Bovinos"
          searchPlaceholder="Buscar bovinos..."
        />
      )}
    </>
  )
}

export default VaccinationModal
