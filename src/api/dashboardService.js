import { helpFetch } from '../helpper/helpFetch'

const api = helpFetch()
const BASE_URL = 'dashboard'

export const dashboardService = {
  getDashboardData: async () => {
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
}
