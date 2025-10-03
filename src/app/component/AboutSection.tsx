"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      image: "/houseparent-header.jpeg",
      link: "/page/houseparent",
    },
    {
      title: "Board of Directors",
      image: "/Board Directors.png",
      link: "/page/houseparent",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4500); // Change slide every 4.5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] text-center mb-12">
          About Us
        </h2>

        <div className="flex flex-col items-center gap-10 md:flex-row">
          {/* Slider Section */}
          <div className="relative w-full overflow-hidden shadow-2xl md:w-1/2 lg:w-2/5 aspect-video rounded-xl group">
            <Link
              href={slides[currentIndex].link}
              className="block w-full h-full"
            >
              <Image
                src={slides[currentIndex].image || "/placeholder.svg"}
                alt={slides[currentIndex].title}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                priority // Prioritize loading for the first slide
              />
              {/* Overlay for hover effect and title */}
              <div className="absolute inset-0 flex items-end justify-center p-6 transition-all duration-300 bg-black/30 group-hover:bg-black/50">
                <h3 className="text-2xl font-bold text-center text-white drop-shadow-lg">
                  {slides[currentIndex].title}
                </h3>
              </div>
            </Link>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-md opacity-0 left-4 top-1/2 bg-white/70 hover:bg-white group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={goToNext}
              className="absolute p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-md opacity-0 right-4 top-1/2 bg-white/70 hover:bg-white group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute flex space-x-2 -translate-x-1/2 bottom-4 left-1/2">
              {slides.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === slideIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center justify-center w-full px-4 py-6 text-center md:w-1/2 lg:w-3/5 md:items-start md:text-left md:py-0">
            <h3 className="mb-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
              <span className="text-[#43A047] block mb-2">
                &quot;I want to do it right!
              </span>
              I encourage the improvement. Defend the cause of the fatherless.
              Plead the case of the widow.&quot;
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              New Hope Children&apos;s Homes (NHCH) is a registered
              non-governmental organization in Cambodia, officially recognized
              by the Ministry of Interior and the Ministry of Social Affairs.
              Since our founding in 1999, we have been committed to serving
              orphaned, abandoned, and impoverished children with compassion,
              dignity, and hope.
            </p>
            {/* <Link
              href="/page/about"
              className="inline-flex items-center px-6 py-3 bg-[#43A047] text-white font-semibold rounded-full hover:bg-[#388E3C] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
