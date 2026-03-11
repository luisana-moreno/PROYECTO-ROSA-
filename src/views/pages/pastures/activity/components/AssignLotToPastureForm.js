import React from 'react'
import {
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CButton,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react'
import PropTypes from 'prop-types'
import CustomTableModal from 'src/components/CustomTableModal'

const AssignLotToPastureForm = ({
  pastures,
  lots,
  bovines,
  selectedPasture,
  setSelectedPasture,
  selectedLot,
  setSelectedLot,
  startDate,
  setStartDate,
  selectedBovines,
  setSelectedBovines,
  bovineModalVisible,
  setBovineModalVisible,
  handleAssignLotToPasture,
  loading,
}) => {
  const bovineColumns = [
    { key: 'numero', label: 'Número de Bovino' },
    // Puedes añadir más columnas si la API de bovinos devuelve más datos relevantes
  ]

  return (
    <CForm>
      <div className="mb-3">
        <CFormLabel htmlFor="selectPasture">Potrero</CFormLabel>
        <CFormSelect
          id="selectPasture"
          value={selectedPasture ? selectedPasture.id : ''}
          onChange={(e) =>
            setSelectedPasture(pastures.find((p) => p.id === parseInt(e.target.value)))
          }
          disabled={loading}
        >
          <option value="">Seleccione un potrero</option>
          {pastures.map((p) => (
            <option key={p.id} value={p.id}>
              {p.codigo}
            </option>
          ))}
        </CFormSelect>
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="selectLot">Lote</CFormLabel>
        <CFormSelect
          id="selectLot"
          value={selectedLot ? selectedLot.id : ''}
          onChange={(e) => setSelectedLot(lots.find((l) => l.id === parseInt(e.target.value)))}
          disabled={loading}
        >
          <option value="">Seleccione un lote</option>
          {lots.map((l) => (
            <option key={l.id} value={l.id}>
              {l.nombre}
            </option>
          ))}
        </CFormSelect>
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="startDate">Fecha de Inicio</CFormLabel>
        <CFormInput
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <CFormLabel>Bovinos en el Lote</CFormLabel>
        <CButton
          color="info"
          variant="outline"
          className="mb-2 w-100"
          onClick={() => setBovineModalVisible(true)}
          disabled={loading}
        >
          Seleccionar Bovinos ({selectedBovines.length})
        </CButton>
        <CRow>
          {selectedBovines.map((bovine) => (
            <CCol xs="auto" key={bovine.id} className="mb-1">
              <CBadge color="primary" className="p-2">
                {bovine.numero}
                <CButton
                  color="transparent"
                  className="p-0 ms-2 text-white"
                  onClick={() =>
                    setSelectedBovines(selectedBovines.filter((b) => b.id !== bovine.id))
                  }
                  disabled={loading}
                >
                  &times;
                </CButton>
              </CBadge>
            </CCol>
          ))}
        </CRow>
      </div>

      <CButton
        className="button-no-hover-green text-white w-100"
        onClick={handleAssignLotToPasture}
        disabled={loading}
      >
        {loading ? 'Asignando...' : 'Asignar Lote y Bovinos'}
      </CButton>

      <CustomTableModal
        visible={bovineModalVisible}
        onClose={() => setBovineModalVisible(false)}
        data={bovines}
        columns={bovineColumns}
        onSelect={setSelectedBovines}
        selectedItems={selectedBovines}
        title="Seleccionar Bovinos"
        searchPlaceholder="Buscar bovino por número"
      />
    </CForm>
  )
}

AssignLotToPastureForm.propTypes = {
  pastures: PropTypes.array.isRequired,
  lots: PropTypes.array.isRequired,
  bovines: PropTypes.array.isRequired,
  pastureStates: PropTypes.array.isRequired, // Aunque no se usa directamente aquí, es parte del hook
  selectedPasture: PropTypes.object,
  setSelectedPasture: PropTypes.func.isRequired,
  selectedLot: PropTypes.object,
  setSelectedLot: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
  selectedBovines: PropTypes.array.isRequired,
  setSelectedBovines: PropTypes.func.isRequired,
  bovineModalVisible: PropTypes.bool.isRequired,
  setBovineModalVisible: PropTypes.func.isRequired,
  handleAssignLotToPasture: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default AssignLotToPastureForm
