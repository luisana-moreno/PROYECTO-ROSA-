import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { formatDateToYYYYMMDD } from './dateFormatter' // Assuming this exists, or use standard date

export const generateMilkProductionReport = (dashboardData) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const today = new Date().toLocaleDateString('es-ES')

  // --- Header ---
  doc.setFontSize(22)
  doc.setTextColor(40, 167, 69) // Green color
  doc.text('Finca "La Milagrosa" - Reporte de Producción', pageWidth / 2, 20, { align: 'center' })

  doc.setFontSize(12)
  doc.setTextColor(100)
  doc.text(`Fecha del Reporte: ${today}`, pageWidth / 2, 28, { align: 'center' })

  doc.setDrawColor(200)
  doc.line(15, 32, pageWidth - 15, 32)

  // --- Resumen Ejecutivo ---
  doc.setFontSize(14)
  doc.setTextColor(0)
  doc.text('Resumen de Producción', 14, 45)

  const productionToday = Number(dashboardData.leche.litros_hoy).toFixed(1)
  const weeklyAvg = Number(dashboardData.leche.promedio_semana).toFixed(1)
  const topBovine = dashboardData.top_bovine || { numero: 'N/A', total_litros: 0 }

  const summaryData = [
    ['Producción de Hoy', `${productionToday} L`],
    ['Promedio Semanal', `${weeklyAvg} L`],
    ['Vaca Líder (Mes)', `#${topBovine.numero} (${Number(topBovine.total_litros).toFixed(1)} L)`],
  ]

  doc.autoTable({
    startY: 50,
    head: [['Indicador', 'Valor']],
    body: summaryData,
    theme: 'plain',
    styles: { fontSize: 11, cellPadding: 3 },
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 80 }, 1: { cellWidth: 'auto' } },
  })

  // --- Historial de Producción (Tabla) ---
  const finalY = doc.lastAutoTable.finalY + 15
  doc.setFontSize(14)
  doc.text('Historial de Producción (Últimos 30 Días)', 14, finalY)

  // Preparar datos de la tabla
  const tableRows = dashboardData.produccion_historial.map((item) => [
    item.fecha,
    `${Number(item.litros).toFixed(1)} L`,
  ])

  doc.autoTable({
    startY: finalY + 5,
    head: [['Fecha', 'Litros Producidos']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [46, 184, 92] }, // CoreUI Green
    styles: { fontSize: 10, halign: 'center' },
  })

  // --- Footer ---
  const pageCount = doc.internal.getNumberOfPages()
  doc.setFontSize(10)
  doc.setTextColor(150)
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text(`Página ${i} de ${pageCount}`, pageWidth / 2, doc.internal.pageSize.height - 10, {
      align: 'center',
    })
  }

  // Guardar PDF
  doc.save(`reporte_produccion_leche_${today.replace(/\//g, '-')}.pdf`)
}
