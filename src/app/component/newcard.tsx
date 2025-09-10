"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NewsCardProps {
  image: string
  title: string
  text: string
}

export default function NewsCard({ image, title, text }: NewsCardProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const handleReadMore = () => {
    console.log("[v0] NewsCard Read More clicked:", title)
    setIsOverlayOpen(true)
  }

  const handleCloseOverlay = () => {
    console.log("[v0] NewsCard overlay closed")
    setIsOverlayOpen(false)
  }

  const truncatedText = text.length > 100 ? text.substring(0, 100) + "..." : text

  return (
    <>
      <div className="border-2 border-green-500 p-4 rounded-sm h-full">
        {/* Image */}
        <div className="mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-500 mb-3">{title}</h2>

        <p className="text-gray-800 mb-4">{truncatedText}</p>

        <Button
          variant="outline"
          className="mt-4 border-green-500 text-green-500 hover:bg-green-50 bg-transparent"
          onClick={handleReadMore}
        >
          Read More
        </Button>
      </div>

      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-green-500 leading-tight">{title}</h2>
                </div>
                <Button variant="ghost" onClick={handleCloseOverlay} className="text-gray-500 hover:text-gray-700">
                  ✕
                </Button>
              </div>

              <div className="mb-6">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">{text}</p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This comprehensive program represents a significant step forward in addressing the complex challenges
                  facing vulnerable communities worldwide. Through careful planning, community engagement, and
                  evidence-based approaches, these initiatives are creating sustainable solutions that protect children
                  and strengthen families for generations to come.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The long-term vision extends beyond immediate program outcomes to encompass broader social change and
                  community transformation. By addressing root causes of vulnerability and building resilient systems,
                  these initiatives contribute to a future where all children have the opportunity to grow up in safe,
                  nurturing environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
