"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Album {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  photos: {
    imageUrl: string;
  }[];
  _count: {
    photos: number;
  };
}

export default function AlbumPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/albums");

      if (!response.ok) {
        throw new Error("Failed to fetch albums");
      }

      const albumsData = await response.json();
      setAlbums(albumsData);
    } catch (err) {
      console.error("Error fetching albums:", err);
      setError("Failed to load albums. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlbumClick = (albumId: number) => {
    router.push(`/page/album/${albumId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#43A047] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading albums...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Albums
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchAlbums}
            className="px-4 py-2 bg-[#43A047] text-white rounded-lg hover:bg-[#388E3C]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 mt-16">
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
        {albums.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <div
                key={album.id}
                className="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
                onClick={() => handleAlbumClick(album.id)}
              >
                {/* Album Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  {album.photos && album.photos.length > 0 ? (
                    <Image
                      src={album.photos[0].imageUrl}
                      alt={album.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQHLJwq8qHWUcbPyf/9k="
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Image
                        src="/logoNHCH.png"
                        alt="Default album cover"
                        width={80}
                        height={80}
                        className="opacity-50"
                      />
                    </div>
                  )}
                  <div className="absolute px-2 py-1 text-sm text-white bg-black bg-opacity-50 rounded top-2 right-2">
                    {album._count?.photos || 0} photos
                  </div>
                </div>

                {/* Album Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {album.title}
                    </h3>
                    {album.category && (
                      <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded whitespace-nowrap ml-2">
                        {album.category}
                      </span>
                    )}
                  </div>
                  {album.description && (
                    <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                      {album.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {new Date(album.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[#43A047] font-medium">
                      View Album →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src="/logoNHCH.png"
                alt="No albums"
                width={32}
                height={32}
                className="opacity-50"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Albums Yet
            </h3>
            <p className="text-gray-500">
              Check back later for photo albums from New Hope Children&#39;s
              Homes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
