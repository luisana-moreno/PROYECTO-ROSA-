const API_URL = import.meta.env.VITE_API_URL

export const pdfService = {
  exportCattleExpedientPdf: async (cattleId) => {
    console.log('pdfService: exportCattleExpedientPdf llamado con cattleId:', cattleId)
    const response = await fetch(`${API_URL}/jobs/cattle-expedient/${cattleId}`, {
      method: 'GET',
      // No es necesario especificar 'Content-Type' para una solicitud GET que espera un archivo binario.
      // Si se necesita un token de autorización, iría aquí, por ejemplo:
      // headers: {
      //   'Authorization': `Bearer ${yourAuthToken}`
      // }
    })
    if (!response.ok) {
      // Intentar leer el error como JSON si el servidor lo envía así
      const errorText = await response.text() // Leer como texto para evitar errores de parseo JSON si no es JSON
      let errorMessage = `Error ${response.status} al exportar expediente de bovino a PDF.`
      try {
        const errorData = JSON.parse(errorText)
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        // No es JSON, usar el texto plano o el mensaje por defecto
        errorMessage = errorText || errorMessage
      }
      throw new Error(errorMessage)
    }
    return response.blob() // Devuelve el contenido de la respuesta como un Blob
  },
}
