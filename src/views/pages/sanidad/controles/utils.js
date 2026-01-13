import { cilMedicalCross, cilHeart, cilBug, cilDrop } from '@coreui/icons'

export const getIconByCode = (codigo) => {
  const icons = {
    VACUNACION: cilMedicalCross,
    MASTITIS: cilHeart,
    DESPARASITACION: cilBug,
    BANO_GARRAPATAS: cilDrop,
  }
  return icons[codigo] || cilMedicalCross
}

export const getColorByCode = (codigo) => {
  const colores = {
    VACUNACION: 'primary',
    MASTITIS: 'danger',
    DESPARASITACION: 'success',
    BANO_GARRAPATAS: 'warning',
  }
  return colores[codigo] || 'secondary'
}

export const getOpcionesResultado = (codigo) => {
  const opciones = {
    VACUNACION: ['Aplicada', 'No Aplicada', 'Reacción Leve', 'Reacción Grave'],
    MASTITIS: ['Positivo', 'Negativo', 'Sospechoso'],
    DESPARASITACION: ['Aplicada', 'No Aplicada'],
    BANO_GARRAPATAS: ['Aplicado', 'No Aplicado'],
    DIAGNOSTICO: ['Positivo', 'Negativo', 'Indeterminado', 'Sano', 'Enfermo'],
    CHEQUEO: ['Sano', 'Enfermo', 'En Observación'],
  }
  return opciones[codigo] || null
}

export const validarControl = (formData, aplicacion, tipoCodigo) => {
  const error = {}
  let isValid = true

  if (aplicacion === 'INDIVIDUAL' && !formData.ttr_idbovino) {
    return { isValid: false, error: 'Debe seleccionar un bovino' }
  }
  if (aplicacion === 'LOTE' && !formData.ttr_idlote) {
    return { isValid: false, error: 'Debe seleccionar un lote' }
  }
  if (!formData.ttr_fechacon) {
    return { isValid: false, error: 'La fecha es obligatoria' }
  }

  // Validar fecha futura? No necesariamente invalido, pero raro
  const fechaControl = new Date(formData.ttr_fechacon)
  const hoy = new Date()
  // if (fechaControl > hoy) return { isValid: false, error: 'La fecha del control no puede ser futura' }

  if (formData.ttr_proxfech) {
    const proxima = new Date(formData.ttr_proxfech)
    if (proxima <= fechaControl) {
      return { isValid: false, error: 'La próxima fecha debe ser posterior a la fecha del control' }
    }
  }

  if (!formData.ttr_idempldo) return { isValid: false, error: 'Debe seleccionar un empleado' }

  // Producto opcional para ciertos tipos
  const tiposSinProducto = ['MASTITIS', 'DIAGNOSTICO', 'CHEQUEO', 'PESAJE', 'PALPACION']
  if (!formData.ttr_producto && !tiposSinProducto.includes(tipoCodigo)) {
    return { isValid: false, error: 'El producto es obligatorio' }
  }
  if (!formData.ttr_dosis) return { isValid: false, error: 'La dosis es obligatoria' }

  // Validar dosis numerica positiva
  // La dosis a veces es texto (ej. "2ml"). Si es campo numérico, parsearlo.
  // Asumamos que el backend espera string, pero si el usuario pone "-5" es raro.
  // Si formData.ttr_dosis es string "5ml", no podemos validar > 0 facilmente.
  // Si es number input, sí. En el form usa <CFormInput type="text">.
  // Dejaré validación simple de 'required'.

  if (!formData.ttr_viaadmin)
    return { isValid: false, error: 'La vía de administración es obligatoria' }
  if (!formData.ttr_resultado) return { isValid: false, error: 'El resultado es obligatorio' }

  return { isValid: true, error: null }
}
