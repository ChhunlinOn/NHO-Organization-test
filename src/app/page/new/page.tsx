"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import NewsGrid from "@/app/component/newgrid"

interface News {
  image: string
  title: string
  text: string
}

export default function NewsPage() {
  // Generate a large dataset for demonstration
  const generateLargeNewsData = () => {
    const baseData = [
      {
        image: "/nho.jpg",
        title: "Farm Support for Sustainable Development",
        text: "here are over 150 million orphaned children worldwide, separated from their families by death, abandonment, or displacement. These children are among the most vulnerable, facing exploitation,",
      },
      {
        image: "/nho.jpg",
        title: "Agricultural Innovation",
        text: "New farming techniques are helping communities build sustainable food systems while protecting natural resources and improving livelihoods.",
      },
      {
        image: "/nho.jpg",
        title: "Rural Development Programs",
        text: "Supporting rural communities through education, infrastructure, and economic opportunities to create lasting positive change.",
      },
    ]

    // Create a larger dataset by duplicating and modifying the base data
    const largeData: News[] = []
    for (let i = 0; i < 30; i++) {
      baseData.forEach((item) => {
        largeData.push({
          ...item,
          title: `${item.title} - Edition ${i + 1}`,
        })
      })
    }

    return largeData
  }

  const newsData = generateLargeNewsData()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-green-500 mb-2">NEWS</h1>
        <p className="text-gray-600">Recall our news, in Cambodia and around the world</p>
      </div>

      {/* Featured Article Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-gray-500">03/05/2025</p>
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 leading-tight">
            Improving, Not Abandoning, Residential Orphan Care
          </h1>
          <p className="text-gray-700 leading-relaxed">
            There are over 150 million orphaned children worldwide, separated from their families by death, abandonment,
            or displacement. These children are among the most vulnerable, facing exploitation, disease, and death.
          </p>
          <Button variant="outline" className="mt-4 border-green-500 text-green-500 hover:bg-green-50">
            Read More
          </Button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="/nho.jpg"
            alt="Children playing in water"
            width={600}
            height={400}
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* News Grid with Pagination */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-green-500 mb-6">Latest News</h2>
        <NewsGrid newsData={newsData} itemsPerPage={6} />
      </div>
    </div>
  )
}
