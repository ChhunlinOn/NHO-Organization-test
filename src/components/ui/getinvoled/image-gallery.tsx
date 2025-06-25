"use client"

import { motion } from "framer-motion"
import { Camera } from "lucide-react"

export default function ImageGallery() {
  const images = [
     { id: 1, alt: "Children learning in classroom", src: "/sponsor1.jpg" },
    { id: 2, alt: "Children playing togethe", src: "/sponsor2.jpg" },
    { id: 3, alt: "Meal time at the home", src: "/sponsor3.jpg "},
    { id: 4, alt: "Children studying", src: "/sponsor4.jpg" },
    { id: 5, alt: "Outdoor activities" , src: "/sponsor5.jpg "},
    { id: 6, alt: "Community gathering", src: "/sponsor6.jpeg "},
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-600 p-3 rounded-full">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Gallery</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Witness the joy, hope, and transformation happening every day at New Hope for Children Homes. These
              moments capture the essence of what your support makes possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-200 rounded-2xl h-56 flex items-center justify-center overflow-hidden cursor-pointer shadow-lg"
              >
                 <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
