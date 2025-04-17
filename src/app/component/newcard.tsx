import Image from "next/image"
import { Button } from "@/components/ui/button"

interface NewsCardProps {
  image: string
  title: string
  text: string
}

export default function NewsCard({ image, title, text }: NewsCardProps) {
  return (
    <div className="border-2 border-green-500 p-4 rounded-sm h-full">
      {/* Image */}
      <div className="mb-4">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-green-500 mb-3">{title}</h2>

      {/* Text Content */}
      <p className="text-gray-800 mb-4">{text}</p>

      {/* Read More Button */}
      <Button variant="outline" className="mt-4 border-green-500 text-green-500 hover:bg-green-50">
            Read More
          </Button>
    </div>
  )
}
