"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import NewsGrid from "@/app/component/newgrid"
import { useState } from "react"

interface News {
  image: string
  title: string
  text: string
}

export default function NewsPage() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const generateLargeNewsData = () => {
    const baseData = [
      {
        image: "/nho.jpg",
        title: "Farm Support for Sustainable Development",
        text: "There are over 150 million orphaned children worldwide, separated from their families by death, abandonment, or displacement. These children are among the most vulnerable, facing exploitation, disease, and death. Agricultural development programs are working to create sustainable food systems that can support these vulnerable communities. Through innovative farming techniques, water conservation methods, and community-based agricultural training, these programs are helping families become self-sufficient and break the cycle of poverty. The integration of modern technology with traditional farming knowledge has proven particularly effective in regions where children are at risk of abandonment due to economic hardship. These comprehensive programs not only address immediate food security needs but also create long-term economic opportunities that keep families together and communities strong.",
      },
      {
        image: "/nho.jpg",
        title: "Agricultural Innovation and Community Resilience",
        text: "New farming techniques are helping communities build sustainable food systems while protecting natural resources and improving livelihoods. Climate-smart agriculture practices are being implemented across rural communities to address the growing challenges of climate change, soil degradation, and water scarcity. These innovative approaches include crop rotation systems, integrated pest management, drought-resistant seed varieties, and precision farming technologies that maximize yield while minimizing environmental impact. Community-based training programs are empowering local farmers with the knowledge and tools needed to adapt to changing conditions and maintain productive agricultural systems. The success of these programs has been measured not only in increased crop yields but also in improved nutrition outcomes for children and families, reduced migration to urban areas, and strengthened community resilience in the face of environmental and economic challenges.",
      },
      {
        image: "/nho.jpg",
        title: "Rural Development and Educational Opportunities",
        text: "Supporting rural communities through education, infrastructure, and economic opportunities to create lasting positive change. Comprehensive rural development initiatives are addressing the interconnected challenges of poverty, limited access to education, and lack of economic opportunities that often lead to family separation and child vulnerability. These programs focus on building schools, training teachers, providing educational materials, and creating pathways for higher education and vocational training. Infrastructure development includes improving roads, water systems, healthcare facilities, and communication networks that connect rural communities to broader economic opportunities. Microfinance programs and cooperative development initiatives are helping families start small businesses and develop sustainable income sources. The holistic approach recognizes that protecting children and strengthening families requires addressing the root causes of poverty and creating environments where communities can thrive independently.",
      },
    ]

    // Create a larger dataset by duplicating and modifying the base data
    const largeData: News[] = []
    for (let i = 0; i < 15; i++) {
      baseData.forEach((item, index) => {
        largeData.push({
          ...item,
          title: `${item.title} - Region ${i + 1}`,
        })
      })
    }

    return largeData
  }

  const newsData = generateLargeNewsData()

  const handleFeaturedReadMore = () => {
    console.log("[v0] Featured article Read More clicked")
    setIsOverlayOpen(true)
  }

  const handleCloseOverlay = () => {
    console.log("[v0] Overlay closed")
    setIsOverlayOpen(false)
  }

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
          <Button
            variant="outline"
            className="mt-4 border-green-500 text-green-500 hover:bg-green-50 bg-transparent"
            onClick={handleFeaturedReadMore}
          >
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

      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 mb-2">03/05/2025</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-green-500 leading-tight">
                    Improving, Not Abandoning, Residential Orphan Care
                  </h2>
                </div>
                <Button variant="ghost" onClick={handleCloseOverlay} className="text-gray-500 hover:text-gray-700">
                  ✕
                </Button>
              </div>

              <div className="mb-6">
                <Image
                  src="/nho.jpg"
                  alt="Children playing in water"
                  width={800}
                  height={400}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  There are over 150 million orphaned children worldwide, separated from their families by death,
                  abandonment, or displacement. These children are among the most vulnerable, facing exploitation,
                  disease, and death.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Residential orphan care has long been a critical safety net for these children, providing shelter,
                  food, education, and protection when family-based care is not available. However, the quality and
                  approach of orphan care varies significantly across different regions and organizations. Many
                  facilities struggle with inadequate funding, insufficient staff training, and outdated care models
                  that fail to address the complex needs of traumatized children.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Rather than abandoning residential care entirely, the focus should be on improving existing systems
                  while simultaneously strengthening family preservation and community-based alternatives. This includes
                  better training for caregivers, improved living conditions, educational opportunities, and
                  psychological support for children who have experienced trauma. Research has consistently shown that
                  children thrive best in family environments, but when this is not possible, high-quality institutional
                  care can provide essential stability and support.
                </p>
              
               
               
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
