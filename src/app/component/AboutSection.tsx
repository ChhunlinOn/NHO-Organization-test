"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUsSlider() {
  const slides = [
    {
      title: "Vision & Mission",
      image: "/nho.jpg",
      link: "/about/vision",
    },
    {
      title: "Founder Message",
      image: "/partner3.jpg",
      link: "/about/founder",
    },
    {
      title: "House Parent Profile",
      image: "/Partner1.png",
      link: "/about/parents",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
      <h2 className="text-3xl font-bold text-[#43A047] text-center mb-12">
        About Us
      </h2>

      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-10">
        {/* Slider Section */}
        <div className="relative w-full md:w-[473px] h-[292px] rounded-lg z-10 group">
          <Link href={slides[index].link}>
            <div className="relative w-full h-full cursor-pointer">
              <Image
                src={slides[index].image || "/placeholder.svg"}
                alt={slides[index].title}
                fill
                className="object-cover transition-all duration-700 ease-in-out rounded-lg"
              />
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition rounded-lg" />
              {/* Title overlay */}
              <div className=" absolute mt-60 bg-black/45 text-white py-3 w-full text-center rounded shadow text-lg font-semibold">
                {slides[index].title}
              </div>
            </div>
          </Link>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-[664px] h-[292px] flex flex-col justify-center items-center md:items-start text-center md:text-left px-4">
          <h3 className="text-xl font-bold mb-4">
            &#34;I want to do it right! I encourage the improvement. Defend the
            cause of the fatherless. Plead the case of the widow.&#34;
          </h3>
          <p>
            New Hope for Orphans (NHO) is a registered NGO in Cambodia, caring
            for orphaned and disadvantaged children since 1998. With 16
            children&#39;s homes and a center in Phnom Penh, NHO supports 578
            children and youths. It has operated over 450 children and all
            graduated in education and would be the future leaders of Cambodia.
            NHO is committed to providing a safe and brighter future.
          </p>
        </div>
      </div>
    </section>
  );
}
