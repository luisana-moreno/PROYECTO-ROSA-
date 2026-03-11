import React from 'react'
import useVaccination from './hooks/useVaccination'
import VaccinationCalendar from './components/VaccinationCalendar'
import VaccinationModal from './components/VaccinationModal'
import DeleteVaccinationModal from './components/DeleteVaccinationModal'
import DayOptionsModal from './components/DayOptionsModal'
import VaccinationDetailsModal from './components/VaccinationDetailsModal' // Importar el nuevo modal de detalles

const Vaccination = () => {
  const {
    visibleVaccination,
    setVisibleVaccination,
    editMode,
    selectedDate,
    vaccinationEvents,
    formData,
    setFormData,
    confirmDelete,
    deleteConfirmation,
    setDeleteConfirmation,
    employees,
    allCattle,
    visibleCattleModal,
    setVisibleCattleModal,
    handleDateClick,
    handleEventClick,
    handleSubmit,
    handleDelete,
    handleConfirmDelete,
    cancelDelete,
    closeModal,
    handleSelectCattle,
    tiposVacuna,
    tratamientos,
    handleAddVacuna,
    handleAddTratamiento,
    visibleDayOptionsModal,
    setVisibleDayOptionsModal,
    dayOptionsDate,
    handleRegisterOptionClick,
    handleViewDetailsOptionClick,
    handleEditRecord,
    visibleVaccinationDetailsModal,
    setVisibleVaccinationDetailsModal,
    vaccinationDetails,
    handleViewCattleDetails, // Nueva prop para el modal de detalles
    visibleReadOnlyCattleModal,
    setVisibleReadOnlyCattleModal,
    readOnlyCattleDetails,
  } = useVaccination()

  return (
    <>
      <VaccinationCalendar
        vaccinationEvents={vaccinationEvents}
        handleDateClick={handleDateClick}
        // handleEventClick ya no es necesario aquí, el comportamiento de clic en evento se maneja desde DayOptionsModal
      />

      <DayOptionsModal
        visible={visibleDayOptionsModal}
        onClose={() => setVisibleDayOptionsModal(false)}
        selectedDate={dayOptionsDate}
        onRegister={handleRegisterOptionClick}
        onViewDetails={handleViewDetailsOptionClick}
      />

      <VaccinationDetailsModal
        visible={visibleVaccinationDetailsModal}
        onClose={() => setVisibleVaccinationDetailsModal(false)}
        records={vaccinationDetails}
        selectedDate={dayOptionsDate}
        onShowAssociatedBovinos={handleViewCattleDetails} // Pasar la función para ver bovinos
        onEditRecord={handleEditRecord}
        onDeleteRecord={handleDelete}
      />

      <VaccinationModal
        visible={visibleVaccination}
        onClose={closeModal}
        editMode={editMode}
        selectedDate={selectedDate}
        formData={formData}
        setFormData={setFormData}
        employees={employees}
        allCattle={allCattle}
        handleSelectCattle={handleSelectCattle}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        cattleModalProps={{ visibleCattleModal, setVisibleCattleModal }}
        tiposVacuna={tiposVacuna}
        tratamientos={tratamientos}
        handleAddVacuna={handleAddVacuna}
        handleAddTratamiento={handleAddTratamiento}
        visibleReadOnlyCattleModal={visibleReadOnlyCattleModal}
        setVisibleReadOnlyCattleModal={setVisibleReadOnlyCattleModal}
        readOnlyCattleDetails={readOnlyCattleDetails}
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
