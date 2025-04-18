"use client"

import { useState, useEffect, useCallback } from "react"
import NewsCard from "@/app/component/newcard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface News {
  image: string
  title: string
  text: string
}

interface NewsGridProps {
  newsData: News[]
  itemsPerPage?: number
}

export default function NewsGrid({ newsData, itemsPerPage = 6 }: NewsGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [displayedItems, setDisplayedItems] = useState<News[]>([])
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)

  const totalPages = Math.ceil(newsData.length / itemsPerPage)

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Function to get paginated data
  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return newsData.slice(startIndex, endIndex)
  }, [currentPage, itemsPerPage, newsData])

  // Update displayed items when page changes or on initial load
  useEffect(() => {
    setDisplayedItems(getPaginatedData())
  }, [currentPage, getPaginatedData])

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Generate page numbers to display
  const getPageNumbers = useCallback(() => {
    // Determine how many page numbers to show based on screen size
    let maxVisiblePages

    if (windowWidth < 480) {
      maxVisiblePages = 3 // Mobile phones
    } else if (windowWidth < 768) {
      maxVisiblePages = 5 // Larger phones and small tablets
    } else {
      maxVisiblePages = 7 // Tablets and desktops
    }

    // For very large number of pages, we need to be more selective
    if (totalPages <= maxVisiblePages) {
      // If we have fewer pages than our max, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      // Calculate the window of pages to show around the current page
      const sidePages = Math.floor((maxVisiblePages - 3) / 2) // -3 for first, last, and current

      let startPage = Math.max(2, currentPage - sidePages)
      let endPage = Math.min(totalPages - 1, currentPage + sidePages)

      // Adjust if we're near the beginning
      if (currentPage - sidePages < 2) {
        endPage = Math.min(totalPages - 1, 1 + maxVisiblePages - 2)
      }

      // Adjust if we're near the end
      if (currentPage + sidePages > totalPages - 1) {
        startPage = Math.max(2, totalPages - maxVisiblePages + 2)
      }

      // Build the array of page numbers to display
      const pageNumbers = [1] // Always include first page

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push(-1) // -1 represents ellipsis
      }

      // Add the window of page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push(-2) // -2 represents ellipsis (using different value to avoid React key warning)
      }

      // Always include last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages)
      }

      return pageNumbers
    }
  }, [currentPage, totalPages, windowWidth])

  // Demo function to show what happens with many pages
  const renderPaginationDemo = () => {
    // This is just for demonstration - not actually used in the component
    const demoTotalPages = 100
    const demoCurrentPage = 50

    return (
      <div className="mt-8 p-4 border border-dashed border-gray-300 rounded-md">
        <h3 className="text-lg font-medium mb-2">Pagination with many pages (example: 100 pages)</h3>
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
          <Button variant="outline" size="icon" className="border-green-500 text-green-500 h-9 w-9">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="border-green-500 text-green-500 h-9 w-9 p-0">
            1
          </Button>

          <span className="text-gray-500">...</span>

          <Button variant="outline" className="border-green-500 text-green-500 h-9 w-9 p-0">
            48
          </Button>

          <Button variant="outline" className="border-green-500 text-green-500 h-9 w-9 p-0">
            49
          </Button>

          <Button variant="default" className="bg-green-500 hover:bg-green-600 h-9 w-9 p-0">
            50
          </Button>

          <Button variant="outline" className="border-green-500 text-green-500 h-9 w-9 p-0">
            51
          </Button>

          <Button variant="outline" className="border-green-500 text-green-500 h-9 w-9 p-0">
            52
          </Button>

          <span className="text-gray-500">...</span>

          <Button variant="outline" className="border-green-500 text-green-500 h-9 w-9 p-0">
            100
          </Button>

          <Button variant="outline" size="icon" className="border-green-500 text-green-500 h-9 w-9">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">Page 50 of 100</div>
      </div>
    )
  }

  return (
    <div>
      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((news, index) => (
          <NewsCard key={index} image={news.image} title={news.title} text={news.text} />
        ))}
      </div>

      {/* Pagination for all screen sizes */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-green-500 text-green-500 hover:bg-green-50 h-9 w-9"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers().map((page, index) => {
            // Render ellipsis
            if (page === -1 || page === -2) {
              return (
                <span key={`ellipsis-${index}`} className="text-gray-500">
                  ...
                </span>
              )
            }

            // Render page number
            return (
              <Button
                key={`page-${page}`}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? "bg-green-500 hover:bg-green-600 h-9 w-9 p-0"
                    : "border-green-500 text-green-500 hover:bg-green-50 h-9 w-9 p-0"
                }
              >
                {page}
              </Button>
            )
          })}

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-green-500 text-green-500 hover:bg-green-50 h-9 w-9"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Page indicator for all screens */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>

      {/* Demo of pagination with many pages */}
      {/* {renderPaginationDemo()} */}
    </div>
  )
}
