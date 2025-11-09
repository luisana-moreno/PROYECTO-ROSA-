import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow } from '@coreui/react'

const InventoryForm = ({
  addInventory,
  setAddInventory,
  insumoType,
  setInsumoType,
  categoriasInsumo,
  newCategoryName,
  setNewCategoryName,
}) => {
  console.log('Categorías de Insumo en InventoryForm:', categoriasInsumo)
  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value
    const selectedCategory = categoriasInsumo.find((cat) => cat.nombre === selectedCategoryName)
    setAddInventory({
      ...addInventory,
      categoria_nombre: selectedCategoryName,
      ttrIdcatein: selectedCategory ? selectedCategory.id : '',
    })
    if (selectedCategoryName !== 'Otro') {
      setNewCategoryName('')
    }
  }

  console.log(categoriasInsumo)

  const handleInsumoTypeChange = (e) => {
    const type = e.target.value
    setInsumoType(type)
    setAddInventory((prev) => ({ ...prev, type: type }))
  }

  return (
    <div>
      <CRow className="g-3 mt-2">
        <h4 className="text-green mt-1 me-5">Registro de Inventario</h4>
        <CCol md={6}>
          <CFormSelect
            className="modal-name custom-select"
            placeholder="Tipo de Movimiento"
            aria-label="Tipo de Movimiento"
            value={insumoType}
            onChange={handleInsumoTypeChange}
          >
            <option value="">Seleccione el tipo de movimiento</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </CFormSelect>
          <small className="text-muted">Seleccione el tipo de movimiento.</small>
        </CCol>
        {insumoType === 'Ingreso' && (
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              placeholder="Categoría de Insumo"
              aria-label="Categoría de Insumo"
              value={addInventory.categoria_nombre || ''}
              onChange={handleCategoryChange}
            >
              <option value="">Seleccione la categoría de insumo</option>
              {categoriasInsumo.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
              <option key="otro-categoria" value="Otro">
                Otro
              </option>
            </CFormSelect>
            <small className="text-muted">Seleccione la categoría del insumo.</small>
          </CCol>
        )}
      </CRow>

      {addInventory.categoria_nombre === 'Otro' && insumoType === 'Ingreso' && (
        <CRow className="g-3 mt-2">
          <CCol md={12}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Nueva Categoría"
              aria-label="Nueva Categoría"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <small className="text-muted">Ingrese el nombre de la nueva categoría.</small>
          </CCol>
        </CRow>
      )}

      {insumoType === 'Ingreso' && (
        <>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                placeholder="Nombre del Insumo"
                aria-label="Nombre del Insumo"
                value={addInventory.ttrNominsum || ''}
                onChange={(e) => setAddInventory({ ...addInventory, ttrNominsum: e.target.value })}
              />
              <small className="text-muted">Ingrese el nombre del insumo.</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                placeholder="Cantidad"
                aria-label="Cantidad"
                type="number"
                value={addInventory.ttrCantidad || ''}
                onChange={(e) => setAddInventory({ ...addInventory, ttrCantidad: e.target.value })}
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
                value={addInventory.ttrFechaven || ''}
                onChange={(e) => setAddInventory({ ...addInventory, ttrFechaven: e.target.value })}
              />
              <small className="text-muted">Ingrese la fecha de vencimiento.</small>
            </CCol>
          </CRow>
        </>
      )}

      {insumoType === 'Egreso' && (
        <>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                placeholder="ID Empleado"
                aria-label="ID Empleado"
                type="number"
                value={addInventory.idempreg || ''}
                onChange={(e) => setAddInventory({ ...addInventory, idempreg: e.target.value })}
              />
              <small className="text-muted">Ingrese el ID del empleado.</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                type="date"
                placeholder="Fecha de Pago"
                aria-label="Fecha de Pago"
                value={addInventory.fechpago || ''}
                onChange={(e) => setAddInventory({ ...addInventory, fechpago: e.target.value })}
              />
              <small className="text-muted">Ingrese la fecha de pago.</small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                placeholder="ID Tipo de Pago"
                aria-label="ID Tipo de Pago"
                type="number"
                value={addInventory.idtippag || ''}
                onChange={(e) => setAddInventory({ ...addInventory, idtippag: e.target.value })}
              />
              <small className="text-muted">Ingrese el ID del tipo de pago.</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                placeholder="ID Nómina Referencia"
                aria-label="ID Nómina Referencia"
                type="number"
                value={addInventory.idnomref || ''}
                onChange={(e) => setAddInventory({ ...addInventory, idnomref: e.target.value })}
              />
              <small className="text-muted">Ingrese el ID de la nómina de referencia.</small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                placeholder="ID Pago Referencia"
                aria-label="ID Pago Referencia"
                type="number"
                value={addInventory.idpagref || ''}
                onChange={(e) => setAddInventory({ ...addInventory, idpagref: e.target.value })}
              />
              <small className="text-muted">Ingrese el ID del pago de referencia.</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                type="datetime-local"
                placeholder="Fecha de Creación"
                aria-label="Fecha de Creación"
                value={addInventory.fechcrea || ''}
                onChange={(e) => setAddInventory({ ...addInventory, fechcrea: e.target.value })}
              />
              <small className="text-muted">Ingrese la fecha de creación.</small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                type="datetime-local"
                placeholder="Fecha de Actualización"
                aria-label="Fecha de Actualización"
                value={addInventory.fechupda || ''}
                onChange={(e) => setAddInventory({ ...addInventory, fechupda: e.target.value })}
              />
              <small className="text-muted">Ingrese la fecha de actualización.</small>
            </CCol>
          </CRow>
        </>
      )}
    </div>
  )
}

export default InventoryForm
