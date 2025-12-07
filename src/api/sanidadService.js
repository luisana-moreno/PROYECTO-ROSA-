import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// ==================== PLANES DE VACUNACIÓN ====================

export const getPlanesVacunacion = async () => {
  const response = await axios.get(`${API_URL}/sanidad/planes-vacunacion`)
  return response.data
}

export const getPlanesVacunacionActivos = async () => {
  const response = await axios.get(`${API_URL}/sanidad/planes-vacunacion/activos`)
  return response.data
}

export const getPlanVacunacionById = async (id) => {
  const response = await axios.get(`${API_URL}/sanidad/planes-vacunacion/${id}`)
  return response.data
}

export const createPlanVacunacion = async (planData) => {
  const response = await axios.post(`${API_URL}/sanidad/planes-vacunacion`, planData)
  return response.data
}

export const updatePlanVacunacion = async (id, planData) => {
  const response = await axios.put(`${API_URL}/sanidad/planes-vacunacion/${id}`, planData)
  return response.data
}

export const deletePlanVacunacion = async (id) => {
  const response = await axios.delete(`${API_URL}/sanidad/planes-vacunacion/${id}`)
  return response.data
}

export const togglePlanActivo = async (id, activo) => {
  const response = await axios.patch(`${API_URL}/sanidad/planes-vacunacion/${id}/toggle`, {
    activo,
  })
  return response.data
}

// ==================== VACUNACIONES ====================

export const getVacunaciones = async () => {
  const response = await axios.get(`${API_URL}/sanidad/vacunaciones`)
  return response.data
}

export const getVacunacionById = async (id) => {
  const response = await axios.get(`${API_URL}/sanidad/vacunaciones/${id}`)
  return response.data
}

export const getVacunacionesByBovino = async (idBovino) => {
  const response = await axios.get(`${API_URL}/sanidad/vacunaciones/bovino/${idBovino}`)
  return response.data
}

export const getVacunacionesProximas = async (dias = 30) => {
  const response = await axios.get(`${API_URL}/sanidad/vacunaciones/proximas?dias=${dias}`)
  return response.data
}

export const getVacunacionesVencidas = async () => {
  const response = await axios.get(`${API_URL}/sanidad/vacunaciones/vencidas`)
  return response.data
}

export const createVacunacion = async (vacunacionData) => {
  const response = await axios.post(`${API_URL}/sanidad/vacunaciones`, vacunacionData)
  return response.data
}

export const updateVacunacion = async (id, vacunacionData) => {
  const response = await axios.put(`${API_URL}/sanidad/vacunaciones/${id}`, vacunacionData)
  return response.data
}

export const deleteVacunacion = async (id) => {
  const response = await axios.delete(`${API_URL}/sanidad/vacunaciones/${id}`)
  return response.data
}

// ==================== PREÑEZ ====================

export const getPreneces = async () => {
  const response = await axios.get(`${API_URL}/sanidad/prenez`)
  return response.data
}

export const getPrenecesActivas = async () => {
  const response = await axios.get(`${API_URL}/sanidad/prenez/activas`)
  return response.data
}

export const getPrenezById = async (id) => {
  const response = await axios.get(`${API_URL}/sanidad/prenez/${id}`)
  return response.data
}

export const getPrenezByBovino = async (idBovino) => {
  const response = await axios.get(`${API_URL}/sanidad/prenez/bovino/${idBovino}`)
  return response.data
}

export const createPrenez = async (prenezData) => {
  const response = await axios.post(`${API_URL}/sanidad/prenez`, prenezData)
  return response.data
}

export const updatePrenez = async (id, prenezData) => {
  const response = await axios.put(`${API_URL}/sanidad/prenez/${id}`, prenezData)
  return response.data
}

export const deletePrenez = async (id) => {
  const response = await axios.delete(`${API_URL}/sanidad/prenez/${id}`)
  return response.data
}

export const addTratamientoPrenez = async (idPrenez, tratamientoData) => {
  const response = await axios.post(
    `${API_URL}/sanidad/prenez/${idPrenez}/tratamientos`,
    tratamientoData,
  )
  return response.data
}

export const getTratamientosPrenez = async (idPrenez) => {
  const response = await axios.get(`${API_URL}/sanidad/prenez/${idPrenez}/tratamientos`)
  return response.data
}

export const deleteTratamientoPrenez = async (idTratamiento) => {
  const response = await axios.delete(`${API_URL}/sanidad/prenez/tratamientos/${idTratamiento}`)
  return response.data
}

// ==================== VISITAS VETERINARIAS ====================

export const getVisitasVeterinarias = async () => {
  const response = await axios.get(`${API_URL}/sanidad/visitas-veterinarias`)
  return response.data
}

export const getVisitaVeterinariaById = async (id) => {
  const response = await axios.get(`${API_URL}/sanidad/visitas-veterinarias/${id}`)
  return response.data
}

export const getProximaVisitaVeterinaria = async () => {
  const response = await axios.get(`${API_URL}/sanidad/visitas-veterinarias/proxima`)
  return response.data
}

export const getBovinosVisita = async (id) => {
  const response = await axios.get(`${API_URL}/sanidad/visitas-veterinarias/${id}/bovinos`)
  return response.data
}

export const createVisitaVeterinaria = async (visitaData) => {
  const response = await axios.post(`${API_URL}/sanidad/visitas-veterinarias`, visitaData)
  return response.data
}

export const updateVisitaVeterinaria = async (id, visitaData) => {
  const response = await axios.put(`${API_URL}/sanidad/visitas-veterinarias/${id}`, visitaData)
  return response.data
}

export const deleteVisitaVeterinaria = async (id) => {
  const response = await axios.delete(`${API_URL}/sanidad/visitas-veterinarias/${id}`)
  return response.data
}

export const addBovinoVisita = async (idVisita, bovinoData) => {
  const response = await axios.post(
    `${API_URL}/sanidad/visitas-veterinarias/${idVisita}/bovinos`,
    bovinoData,
  )
  return response.data
}

// ==================== REPORTES ====================

export const getDashboardSanidad = async () => {
  const response = await axios.get(`${API_URL}/sanidad/reportes/dashboard`)
  return response.data
}

export const getVacunasProximasReporte = async (dias = 30) => {
  const response = await axios.get(`${API_URL}/sanidad/reportes/vacunas-proximas?dias=${dias}`)
  return response.data
}

export const getHistorialBovinoCompleto = async (idBovino) => {
  const response = await axios.get(`${API_URL}/sanidad/reportes/bovino/${idBovino}/historial`)
  return response.data
}

export const getCumplimientoVacunacion = async () => {
  const response = await axios.get(`${API_URL}/sanidad/reportes/cumplimiento-vacunacion`)
  return response.data
}

export const getBovinosAtencionRequerida = async () => {
  const response = await axios.get(`${API_URL}/sanidad/reportes/atencion-requerida`)
  return response.data
}

export default {
  // Planes de Vacunación
  getPlanesVacunacion,
  getPlanesVacunacionActivos,
  getPlanVacunacionById,
  createPlanVacunacion,
  updatePlanVacunacion,
  deletePlanVacunacion,
  togglePlanActivo,

  // Vacunaciones
  getVacunaciones,
  getVacunacionById,
  getVacunacionesByBovino,
  getVacunacionesProximas,
  getVacunacionesVencidas,
  createVacunacion,
  updateVacunacion,
  deleteVacunacion,

  // Preñez
  getPreneces,
  getPrenecesActivas,
  getPrenezById,
  getPrenezByBovino,
  createPrenez,
  updatePrenez,
  deletePrenez,
  addTratamientoPrenez,
  getTratamientosPrenez,
  deleteTratamientoPrenez,

  // Visitas Veterinarias
  getVisitasVeterinarias,
  getVisitaVeterinariaById,
  getProximaVisitaVeterinaria,
  getBovinosVisita,
  createVisitaVeterinaria,
  updateVisitaVeterinaria,
  deleteVisitaVeterinaria,
  addBovinoVisita,

  // Reportes
  getDashboardSanidad,
  getVacunasProximasReporte,
  getHistorialBovinoCompleto,
  getCumplimientoVacunacion,
  getBovinosAtencionRequerida,
}
