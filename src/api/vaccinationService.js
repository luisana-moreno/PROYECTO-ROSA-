import { regmedicosService } from './regmedicosService'

// Re-exportar todos los servicios de regmedicosService
export const vaccinationService = {
  ...regmedicosService,
}
