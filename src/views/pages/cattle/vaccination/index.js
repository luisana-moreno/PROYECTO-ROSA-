import React from 'react'
import { CAlert } from '@coreui/react'
import useVaccination from './hooks/useVaccination'
import VaccinationCalendar from './components/VaccinationCalendar'
import VaccinationModal from './components/VaccinationModal'
import DeleteVaccinationModal from './components/DeleteVaccinationModal'

const Vaccination = () => {
  const {
    visibleVaccination,
    setVisibleVaccination,
    editMode,
    selectedDate,
    vaccinationEvents,
    formData,
    setFormData,
    toast,
    confirmDelete,
    deleteConfirmation,
    setDeleteConfirmation,
    employees,
    cattle,
    handleDateClick,
    handleEventClick,
    handleSubmit,
    handleDelete,
    handleConfirmDelete,
    cancelDelete,
    closeModal,
    // Eliminado: setVisibleCattleModal, visibleCattleModal
  } = useVaccination()

  const { visibleCattleModal, setVisibleCattleModal } = useVaccination() // Desestructurar aquí para pasar como objeto

  return (
    <>
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            minWidth: 300,
          }}
        >
          <CAlert color={toast.color} className="text-center m-0">
            {toast.message}
          </CAlert>
        </div>
      )}
      <VaccinationCalendar
        vaccinationEvents={vaccinationEvents}
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
      />

      <VaccinationModal
        visible={visibleVaccination}
        onClose={closeModal}
        editMode={editMode}
        selectedDate={selectedDate}
        formData={formData}
        setFormData={setFormData}
        employees={employees}
        cattle={cattle}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        cattleModalProps={{ visibleCattleModal, setVisibleCattleModal }}
      />

      <DeleteVaccinationModal
        visible={confirmDelete}
        onClose={cancelDelete}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  )
}

export default Vaccination
