"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

export default function AboutUsSlider() {
  const slides = [
    {
      title: "Vision & Mission",
      image: "/memories.jpg",
      link: "/page/about/vision",
    },
    {
      title: "Founder Message",
      image: "/family.jpg",
      link: "/page/about/founderMessage",
    },
    {
      title: "House Parent Profile",
      image: "/girl.jpg",
      link: "/page/houseparent",
    },
    {
      title: "Board of Directors",
      image: "/girl.jpg",
      link: "/page/houseparent",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    }, 4500) // Change slide every 4.5 seconds
    return () => clearInterval(interval)
  }, [slides.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] text-center mb-12">About Us</h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Slider Section */}
          <div className="relative w-full md:w-1/2 lg:w-2/5 aspect-video rounded-xl overflow-hidden shadow-2xl group">
            <Link href={slides[currentIndex].link} className="block w-full h-full">
              <Image
                src={slides[currentIndex].image || "/placeholder.svg"}
                alt={slides[currentIndex].title}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                priority // Prioritize loading for the first slide
              />
              {/* Overlay for hover effect and title */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-end justify-center p-6">
                <h3 className="text-2xl font-bold text-white text-center drop-shadow-lg">
                  {slides[currentIndex].title}
                </h3>
              </div>
            </Link>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {slides.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === slideIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 py-6 md:py-0">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="text-[#43A047] block mb-2">&quot;I want to do it right!</span>I encourage the improvement.
              Defend the cause of the fatherless. Plead the case of the widow.&quot;
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              New Hope Children&apos;s Homes (NHCH) is a registered non-governmental organization in Cambodia, officially
              recognized by the Ministry of Interior and the Ministry of Social Affairs. Since our founding in 1999, we
              have been committed to serving orphaned, abandoned, and impoverished children with compassion, dignity,
              and hope.
            </p>
            <Link
              href="/page/about"
              className="inline-flex items-center px-6 py-3 bg-[#43A047] text-white font-semibold rounded-full hover:bg-[#388E3C] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
