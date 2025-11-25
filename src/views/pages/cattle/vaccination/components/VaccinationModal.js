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
  CBadge,
} from '@coreui/react'
import { CustomTableModal } from 'src/components'
import EmployeeSearchSelect from './EmployeeSearchSelect'
import VaccineSearchSelect from './VaccineSearchSelect'
import TreatmentSearchSelect from './TreatmentSearchSelect'
import { format } from 'date-fns' // Importar format
import { es } from 'date-fns/locale' // Importar el locale español

const VaccinationModal = ({
  visible,
  onClose,
  editMode,
  selectedDate,
  formData,
  setFormData,
  employees,
  allCattle,
  handleSelectCattle,
  onSubmit,
  onDelete,
  cattleModalProps,
  tiposVacuna,
  tratamientos,
  handleAddVacuna,
  handleAddTratamiento,
  visibleReadOnlyCattleModal,
  setVisibleReadOnlyCattleModal,
  readOnlyCattleDetails,
}) => {
  const { visibleCattleModal, setVisibleCattleModal } = cattleModalProps

  const cattleColumns = [
    { key: 'id', label: 'ID' },
    { key: 'ttrNumerobv', label: 'Número de Bovino' },
    { key: 'razaNombre', label: 'Raza' },
  ]

  const selectedCattleObjects = formData.cattleIds
    .map((id) => allCattle.find((b) => b.id === id))
    .filter(Boolean)

  const formattedSelectedDate = selectedDate
    ? format(selectedDate, 'dd MMMM yyyy', { locale: es })
    : 'N/A'

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={onClose} backdrop="static">
        <CModalHeader className="modal-module">
          <CModalTitle className="typograhy-color-title">
            {editMode ? 'Editar Evento de Vacunación' : 'Registrar Vacunación'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            <strong>Fecha:</strong> {formattedSelectedDate}
          </p>
          <CForm>
            <div className="mb-3">
              <CButton
                className="button-no-hover-green text-white"
                onClick={() => {
                  console.log(
                    'Botón "Seleccionar Bovinos" clickeado. Estableciendo visibleCattleModal a true.',
                  )
                  setVisibleCattleModal(true)
                }}
              >
                Seleccionar Bovinos
              </CButton>
              <div className="mt-2">
                {selectedCattleObjects.length > 0 ? (
                  selectedCattleObjects.map((b) => (
                    <CBadge key={b.id} color="info" className="me-1 mb-1">
                      {b.ttrNumerobv || b.id} - {b.razaNombre}
                    </CBadge>
                  ))
                ) : (
                  <small className="text-muted">Ningún bovino seleccionado.</small>
                )}
              </div>
            </div>
            <h6 className="typography-color-title mb-2">Seleccionar Empleado</h6>
            <EmployeeSearchSelect
              employees={employees}
              selectedEmployeeId={formData.employeeId}
              onSelectEmployee={(id) => setFormData({ ...formData, employeeId: id })}
              placeholder="Buscar y seleccionar empleado..."
            />
            <div className="mb-3"></div>

            <CFormInput
              className="modal-name mb-3 custom-select"
              placeholder="Diagnóstico"
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />

            <div className="mb-3">
              <TreatmentSearchSelect
                treatments={tratamientos}
                selectedTreatmentName={formData.treatment}
                onSelectTreatment={(name) => setFormData({ ...formData, treatment: name })}
                onAddTreatment={handleAddTratamiento}
                placeholder="Buscar y seleccionar tratamiento..."
              />
            </div>

            <div className="mb-3">
              <VaccineSearchSelect
                vaccines={tiposVacuna}
                selectedVaccineName={formData.vaccine}
                onSelectVaccine={(name) => setFormData({ ...formData, vaccine: name })}
                onAddVaccine={handleAddVacuna}
                placeholder="Buscar y seleccionar vacuna..."
              />
            </div>

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
          title="Seleccionar Bovinos"
          searchPlaceholder="Buscar bovinos..."
        />
      )}

      {visibleReadOnlyCattleModal && (
        <CustomTableModal
          visible={visibleReadOnlyCattleModal}
          onClose={() => setVisibleReadOnlyCattleModal(false)}
          data={readOnlyCattleDetails}
          columns={cattleColumns}
          title="Bovinos Asociados"
          searchPlaceholder="Buscar bovinos..."
          readOnly={true}
        />
      )}
    </>
  )
}

export default VaccinationModal
