export const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Enero es 0
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export const formatDateToYYYYMMDD = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const getWeekRange = (date) => {
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)) // Lunes como primer día

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 4) // Viernes

  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  const startFormatted = startOfWeek.toLocaleDateString('es-ES', options)
  const endFormatted = endOfWeek.toLocaleDateString('es-ES', options)

  return `${startFormatted.replace('.', '')} - ${endFormatted.replace('.', '')}`
}

export const getDayName = (dateString) => {
  const date = new Date(dateString)
  const options = { weekday: 'long' }
  return date
    .toLocaleDateString('es-ES', options)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
