import { helpFetch } from '../helpper/helpFetch'

const api = helpFetch()
const BASE_URL = 'dashboard'

export const dashboardService = { 
  getDashboardData: async (token) => {
    try {
      const response = await api.get(BASE_URL)
      if (!response.error) {
        return response
      } else {
        console.error('Error fetching dashboard data:', response)
        return null
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      return null
    }
  },

  getProductionHistory: async (periodo = 'mes') => {
    try {
      const response = await api.get(`${BASE_URL}/production-history?periodo=${periodo}`)
      if (!response.error) {
        return response
      } else {
        console.error('Error fetching production history:', response)
        return []
      }
    } catch (error) {
      console.error('Error fetching production history:', error)
      return []
    }
  },

  getFinancialSummary: async () => {
    try {
      const response = await api.get(`${BASE_URL}/financial-summary`)
      if (!response.error) {
        return response
      } else {
        console.error('Error fetching financial summary:', response)
        return []
      }
    } catch (error) {
      console.error('Error fetching financial summary:', error)
      return []
    }
  },

  getHealthAlerts: async () => {
    try {
      const response = await api.get(`${BASE_URL}/health-alerts`)
      if (!response.error) {
        return response
      } else {
        console.error('Error fetching health alerts:', response)
        return { vacunas: [], visitas: [], partos: [] }
      }
    } catch (error) {
      console.error('Error fetching health alerts:', error)
      return { vacunas: [], visitas: [], partos: [] }
    }
  },

  getInventoryAlerts: async () => {
    try {
      const response = await api.get(`${BASE_URL}/inventory-alerts`)
      if (!response.error) {
        return response
      } else {
        console.error('Error fetching inventory alerts:', response)
        return []
      }
    } catch (error) {
      console.error('Error fetching inventory alerts:', error)
      return []
    }
  },
}
