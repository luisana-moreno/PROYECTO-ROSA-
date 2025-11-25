"use client"
import { CForm, CFormLabel, CFormSelect, CFormInput, CButton, CRow, CCol } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilCheckAlt, cilX } from "@coreui/icons"

const PastureActivityForm = ({
  selectedPasture,
  selectedLot,
  setSelectedLot,
  startDate,
  setStartDate,
  selectedBovines,
  setSelectedBovines,
  lots,
  bovines,
  onAssign,
  onMarkExit,
  loading,
}) => {
  return (
    <CForm className="mb-4">
      <div className="mb-3">
        <CFormLabel>Potrero Seleccionado</CFormLabel>
        <CFormInput
          type="text"
          value={selectedPasture ? selectedPasture.codigo : "Seleccione un potrero"}
          disabled
          readOnly
        />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="selectLot">Lote</CFormLabel>
        <CFormSelect
          id="selectLot"
          value={selectedLot ? selectedLot.id : ""}
          onChange={(e) => setSelectedLot(lots.find((l) => l.id === Number.parseInt(e.target.value)))}
          disabled={!selectedPasture || loading}
        >
          <option value="">Seleccione un lote</option>
          {lots.map((l) => (
            <option key={l.id} value={l.id}>
              {l.nombre} ({l.bovinos} bovinos)
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
          disabled={!selectedPasture || loading}
        />
      </div>

      <div className="mb-3">
        <CFormLabel>Bovinos Seleccionados</CFormLabel>
        <div
          className="mb-2"
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          {bovines.length > 0 ? (
            bovines.map((bovine) => (
              <div key={bovine.id} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`bovine-${bovine.id}`}
                  checked={selectedBovines.some((b) => b.id === bovine.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBovines([...selectedBovines, bovine])
                    } else {
                      setSelectedBovines(selectedBovines.filter((b) => b.id !== bovine.id))
                    }
                  }}
                  disabled={!selectedPasture || loading}
                />
                <label className="form-check-label" htmlFor={`bovine-${bovine.id}`}>
                  Bovino {bovine.numero}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted mb-0">No hay bovinos disponibles</p>
          )}
        </div>
        <small className="text-muted">{selectedBovines.length} bovinos seleccionados</small>
      </div>

      <CRow className="g-2">
        <CCol xs="auto">
          <CButton
            className="button-no-hover-green text-white"
            onClick={onAssign}
            disabled={!selectedPasture || !selectedLot || !startDate || selectedBovines.length === 0 || loading}
          >
            <CIcon icon={cilCheckAlt} className="me-2" />
            {loading ? "Asignando..." : "Asignar"}
          </CButton>
        </CCol>
        <CCol xs="auto">
          <CButton
            color="danger"
            variant="outline"
            onClick={() => onMarkExit(selectedPasture?.id)}
            disabled={!selectedPasture || loading}
          >
            <CIcon icon={cilX} className="me-2" />
            Marcar Salida
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default PastureActivityForm
