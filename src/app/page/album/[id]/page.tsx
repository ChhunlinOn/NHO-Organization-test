// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { ArrowLeft, Download, Share2 } from "lucide-react";

// interface Photo {
//   id: number;
//   imageUrl: string;
//   description: string | null;
//   createdAt: string;
// }

// interface Album {
//   id: number;
//   title: string;
//   description: string | null;
//   category: string | null;
//   createdAt: string;
//   photos: Photo[];
//   _count: {
//     photos: number;
//   };
// }

// export default function AlbumDetailPage() {
//   const [album, setAlbum] = useState<Album | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
//   const params = useParams();
//   const router = useRouter();

//   const albumId = params.id as string;

//   useEffect(() => {
//     if (albumId) {
//       fetchAlbum();
//     }
//   }, [albumId]);

//   const fetchAlbum = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const response = await fetch(`/api/albums/${albumId}`);

//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error("Album not found");
//         }
//         throw new Error("Failed to fetch album");
//       }

//       const albumData = await response.json();
//       setAlbum(albumData);
//     } catch (err) {
//       console.error("Error fetching album:", err);
//       setError(err instanceof Error ? err.message : "Failed to load album");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const downloadImage = async (imageUrl: string, filename: string) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading image:", error);
//       alert("Error downloading image");
//     }
//   };

//   const shareAlbum = async () => {
//     if (navigator.share && album) {
//       try {
//         await navigator.share({
//           title: album.title,
//           text:
//             album.description ||
//             `Check out this album from New Hope Children's Homes`,
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log("Error sharing:", err);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard
//         .writeText(window.location.href)
//         .then(() => alert("Link copied to clipboard!"))
//         .catch(() => alert("Failed to copy link"));
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#43A047] mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading album...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !album) {
//     return (
//       <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
//         <div className="text-center max-w-md">
//           <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//             <span className="text-2xl">⚠️</span>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             {error || "Album not found"}
//           </h3>
//           <p className="text-gray-600 mb-4">
//             The album you&#39;re looking for doesn&#39;t exist or couldn&#39;t
//             be loaded.
//           </p>
//           <button
//             onClick={() => router.push("/page/album")}
//             className="flex items-center justify-center px-4 py-2 bg-[#43A047] text-white rounded-lg hover:bg-[#388E3C] mx-auto"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Albums
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 mt-24">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-4">
//             <button
//               onClick={() => router.push("/page/album")}
//               className="flex items-center text-sm text-gray-500 hover:text-gray-700"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Albums
//             </button>

//             <button
//               onClick={shareAlbum}
//               className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
//             >
//               <Share2 className="w-4 h-4 mr-2" />
//               Share
//             </button>
//           </div>

//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {album.title}
//             </h1>
//             {album.description && (
//               <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-4">
//                 {album.description}
//               </p>
//             )}
//             <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
//               {album.category && (
//                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
//                   {album.category}
//                 </span>
//               )}
//               <span>{album._count.photos} photos</span>
//               <span>
//                 Created: {new Date(album.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Photos Grid */}
//       <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         {album.photos.length > 0 ? (
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {album.photos.map((photo) => (
//               <div
//                 key={photo.id}
//                 className="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer group"
//                 onClick={() => setSelectedPhoto(photo)}
//               >
//                 <div className="relative aspect-square">
//                   <Image
//                     src={photo.imageUrl}
//                     alt={photo.description || `Photo from ${album.title}`}
//                     fill
//                     className="object-cover transition-transform group-hover:scale-105"
//                     sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                     placeholder="blur"
//                     blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQHLJwq8qHWUcbPyf/9k="
//                   />

//                   {/* Overlay with download button */}
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         downloadImage(photo.imageUrl, `photo-${photo.id}.jpg`);
//                       }}
//                       className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
//                       title="Download Photo"
//                     >
//                       <Download className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {photo.description && (
//                   <div className="p-3">
//                     <p className="text-sm text-gray-600 line-clamp-2">
//                       {photo.description}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-white rounded-lg shadow">
//             <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//               <Image
//                 src="/logoNHCH.png"
//                 alt="No photos"
//                 width={32}
//                 height={32}
//                 className="opacity-50"
//               />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No Photos Yet
//             </h3>
//             <p className="text-gray-500">
//               This album doesn&#39;t contain any photos yet.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Photo Modal */}
//       {selectedPhoto && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
//           onClick={() => setSelectedPhoto(null)}
//         >
//           <div className="relative max-w-4xl max-h-full">
//             <div onClick={(e) => e.stopPropagation()}>
//               <Image
//                 src={selectedPhoto.imageUrl}
//                 alt={selectedPhoto.description || `Photo from ${album.title}`}
//                 width={1200}
//                 height={800}
//                 className="max-w-full max-h-[80vh] object-contain"
//               />

//               {/* Photo Info */}
//               {(selectedPhoto.description || selectedPhoto.createdAt) && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
//                   {selectedPhoto.description && (
//                     <p className="text-sm mb-2">{selectedPhoto.description}</p>
//                   )}
//                   <div className="flex justify-between items-center text-xs text-gray-300">
//                     <span>
//                       Uploaded:{" "}
//                       {new Date(selectedPhoto.createdAt).toLocaleDateString()}
//                     </span>
//                     <button
//                       onClick={() =>
//                         downloadImage(
//                           selectedPhoto.imageUrl,
//                           `photo-${selectedPhoto.id}.jpg`
//                         )
//                       }
//                       className="flex items-center hover:text-white transition-colors"
//                     >
//                       <Download className="w-3 h-3 mr-1" />
//                       Download
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Close Button */}
//               <button
//                 onClick={() => setSelectedPhoto(null)}
//                 className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Download, Share2 } from "lucide-react";

interface Photo {
  id: number;
  imageUrl: string;
  description: string | null;
  createdAt: string;
}

interface Album {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  createdAt: string;
  photos: Photo[];
  _count: {
    photos: number;
  };
}

export default function AlbumDetailPage() {
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const params = useParams();
  const router = useRouter();

  const albumId = params.id as string;

  const fetchAlbum = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/albums/${albumId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Album not found");
        }
        throw new Error("Failed to fetch album");
      }

      const albumData = await response.json();
      setAlbum(albumData);
    } catch (err) {
      console.error("Error fetching album:", err);
      setError(err instanceof Error ? err.message : "Failed to load album");
    } finally {
      setIsLoading(false);
    }
  }, [albumId]);

  useEffect(() => {
    if (albumId) {
      fetchAlbum();
    }
  }, [albumId, fetchAlbum]);

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Error downloading image");
    }
  };

  const shareAlbum = async () => {
    if (navigator.share && album) {
      try {
        await navigator.share({
          title: album.title,
          text:
            album.description ||
            `Check out this album from New Hope Children's Homes`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link"));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#43A047] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading album...</p>
        </div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {error || "Album not found"}
          </h3>
          <p className="text-gray-600 mb-4">
            The album you&#39;re looking for doesn&#39;t exist or couldn&#39;t
            be loaded.
          </p>
          <button
            onClick={() => router.push("/page/album")}
            className="flex items-center justify-center px-4 py-2 bg-[#43A047] text-white rounded-lg hover:bg-[#388E3C] mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Albums
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-24">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push("/page/album")}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Albums
            </button>

            <button
              onClick={shareAlbum}
              className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {album.title}
            </h1>
            {album.description && (
              <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-4">
                {album.description}
              </p>
            )}
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              {album.category && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {album.category}
                </span>
              )}
              <span>{album._count.photos} photos</span>
              <span>
                Created: {new Date(album.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {album.photos.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {album.photos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.description || `Photo from ${album.title}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQHLJwq8qHWUcbPyf/9k="
                  />

                  {/* Overlay with download button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(photo.imageUrl, `photo-${photo.id}.jpg`);
                      }}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      title="Download Photo"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {photo.description && (
                  <div className="p-3">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {photo.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Image
                src="/logoNHCH.png"
                alt="No photos"
                width={32}
                height={32}
                className="opacity-50"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Photos Yet
            </h3>
            <p className="text-gray-500">
              This album doesn&#39;t contain any photos yet.
            </p>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <div onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.description || `Photo from ${album.title}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {/* Photo Info */}
              {(selectedPhoto.description || selectedPhoto.createdAt) && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  {selectedPhoto.description && (
                    <p className="text-sm mb-2">{selectedPhoto.description}</p>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span>
                      Uploaded:{" "}
                      {new Date(selectedPhoto.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() =>
                        downloadImage(
                          selectedPhoto.imageUrl,
                          `photo-${selectedPhoto.id}.jpg`
                        )
                      }
                      className="flex items-center hover:text-white transition-colors"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
