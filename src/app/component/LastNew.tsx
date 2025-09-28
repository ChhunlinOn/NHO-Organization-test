"use client"

import Link from "next/link"
import Image from "next/image"
import { CalendarDays, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

interface News {
  id: number
  image: string
  title: string
  text: string
  date: string
  category: string
  excerpt: string
  created_at: string
  updated_at: string
}

export default function LatestNews() {
  const [newsData, setNewsData] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch latest news from API
  const fetchLatestNews = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/news/public?limit=4')
      
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      
      const data = await response.json()
      setNewsData(data.news || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching news:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLatestNews()
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">Latest News & Updates</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Loading latest news...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">Latest News & Updates</h2>
          <p className="text-xl text-gray-700 mb-6">Error loading news</p>
          <button
            onClick={fetchLatestNews}
            className="px-6 py-3 bg-[#43A047] text-white font-semibold rounded-full hover:bg-[#388E3C]"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  // Show empty state
  if (newsData.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">Latest News & Updates</h2>
          <p className="text-xl text-gray-700">No news articles yet. Check back later!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">Latest News & Updates</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Stay informed about our impactful work and the lives being transformed in Cambodia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsData.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image || "/Camp.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute top-4 left-4 bg-[#43A047] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 flex items-center mb-3">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {article.date}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-[#43A047] transition-colors duration-200">
                  <Link href={`/news/${article.id}`}>{article.title}</Link>
                </h3>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">{article.excerpt}</p>
                <Link
                  href={`/page/new/${article.id}`}
                  className="inline-flex items-center text-[#43A047] font-semibold hover:underline transition-colors duration-200"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/page/new"
            className="inline-flex items-center px-8 py-4 bg-[#43A047] text-white font-semibold rounded-full hover:bg-[#388E3C] transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            View All News
            <ArrowRight className="w-5 h-5 ml-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}