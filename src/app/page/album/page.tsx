"use client";

import Image from "next/image";

// Static album data
const albumsData = [
  {
    id: 1,
    title: "Kids Camp 2024",
    coverImage: "/logoNHCH.png",
    photoCount: 24,
    date: "2024-03-15",
    category: "Events",
    description: "Annual kids camp activities and fun moments",
  },
  {
    id: 2,
    title: "Vocational Training",
    coverImage: "/logoNHCH.png",
    photoCount: 18,
    date: "2024-02-10",
    category: "Programs",
    description: "Skills development and vocational training sessions",
  },
  {
    id: 3,
    title: "University Students",
    coverImage: "/logoNHCH.png",
    photoCount: 32,
    date: "2024-01-20",
    category: "Education",
    description: "Our sponsored university students and their achievements",
  },
  {
    id: 4,
    title: "Spiritual Development",
    coverImage: "/logoNHCH.png",
    photoCount: 15,
    date: "2024-03-01",
    category: "Spiritual",
    description: "Worship services and spiritual growth activities",
  },
  {
    id: 5,
    title: "/logoNHCH.png",
    coverImage: "/logoNHCH.png",
    photoCount: 22,
    date: "2024-02-28",
    category: "Events",
    description: "Community service and outreach programs",
  },
  {
    id: 6,
    title: "Daily Life at NHCH",
    coverImage: "/logoNHCH.png",
    photoCount: 45,
    date: "2024-03-10",
    category: "Lifestyle",
    description: "Everyday moments and life at New Hope Children's Homes",
  },
];

export default function AlbumPage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#43A047] mb-4">
            Photo Gallery
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Explore moments of hope, growth, and joy at New Hope Children&#39;s
            Homes. Browse through our albums to see the impact of your support.
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {albumsData.map((album) => (
            <div
              key={album.id}
              className="overflow-hidden bg-white rounded-lg shadow-md"
            >
              {/* Album Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={album.coverImage || "/placeholder.jpg"}
                  alt={album.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute px-2 py-1 text-sm text-white bg-black bg-opacity-50 rounded top-2 right-2">
                  {album.photoCount} photos
                </div>
              </div>

              {/* Album Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {album.title}
                  </h3>
                  <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                    {album.category}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-600">
                  {album.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(album.date).toLocaleDateString()}</span>
                  <span className="text-[#43A047]">View Album →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-[#43A047] text-white rounded-lg p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Share Your Memories</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Do you have photos from our events? Help us grow our gallery by
            sharing your pictures.
          </p>
          <button className="bg-white text-[#43A047] px-6 py-3 rounded-lg font-semibold">
            Submit Photos
          </button>
        </div>
      </div>
    </div>
  );
}
