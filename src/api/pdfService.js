const API_URL = import.meta.env.VITE_API_URL

export const pdfService = {
  exportCattleExpedientPdf: async (cattleId) => {
    console.log('pdfService: exportCattleExpedientPdf llamado con cattleId:', cattleId)
    const response = await fetch(`${API_URL}/jobs/cattle-expedient/${cattleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al exportar expediente de bovino a PDF')
    }
    return response // Retorna la respuesta completa para manejar el blob en el frontend
  },
}
