import { useState, useEffect } from 'react'

export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [data])

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  return {
    currentPage,
    totalPages,
    currentData: currentData(),
    goToPage,
    setCurrentPage,
  }
}
