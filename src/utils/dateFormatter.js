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
  const d = new Date(date)
  const dayOfWeek = d.getDay() // 0 para domingo, 1 para lunes, ..., 6 para sábado

  // Calcular el inicio de la semana (lunes)
  // Si hoy es domingo (0), restar 6 días para obtener el lunes anterior.
  // De lo contrario, restar (dayOfWeek - 1) días para obtener el lunes actual.
  const startOfWeek = new Date(d)
  startOfWeek.setDate(d.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  startOfWeek.setHours(0, 0, 0, 0) // Normalizar al inicio del día

  // Calcular el fin de la semana (domingo)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999) // Normalizar al final del día

  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  const startFormatted = startOfWeek.toLocaleDateString('es-ES', options)
  const endFormatted = endOfWeek.toLocaleDateString('es-ES', options)

  return `${startFormatted.replace('.', '')} - ${endFormatted.replace('.', '')}`
}

export const getWeekDaysWithDates = (date) => {
  const d = new Date(date)
  const dayOfWeek = d.getDay() // 0 para domingo, 1 para lunes, ..., 6 para sábado

  const startOfWeek = new Date(d)
  startOfWeek.setDate(d.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  startOfWeek.setHours(0, 0, 0, 0)

  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek)
    currentDay.setDate(startOfWeek.getDate() + i)
    const dayName = getDayName(currentDay)
    const formattedDate = `${String(currentDay.getDate()).padStart(2, '0')}/${String(
      currentDay.getMonth() + 1,
    ).padStart(2, '0')}`
    weekDays.push({ name: dayName, date: formattedDate })
  }
  return weekDays
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

export const formatHoursToHHMMSS = (hours) => {
  if (typeof hours !== 'number' || isNaN(hours)) {
    return '00:00:00'
  }

  const totalSeconds = Math.round(hours * 3600)
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  const pad = (num) => String(num).padStart(2, '0')

  return `${pad(h)}:${pad(m)}:${pad(s)}`
}
