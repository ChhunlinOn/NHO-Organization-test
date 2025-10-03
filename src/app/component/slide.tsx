"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = ["/IMG_7845.JPG", "/P1034456.JPG", "/P1036657.jpg"];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Slide Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === i ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={img} alt={`Slide ${i}`} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Text Content (Fixed) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 text-white md:px-12 lg:px-24 lg:pl-60">
        <h1 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          WORK TOGETHER FOR <br />
          BETTER FUTURE OF CHILDREN
        </h1>
        <p className="mb-8 text-lg md:text-xl">SPONSOR A CHILD TODAY</p>
        <Link
          href="page/getInvolved#sponsor"
          className="bg-[#43A047] hover:bg-green-700 text-white font-bold py-4 px-20 rounded-md transition-colors w-fit mx-auto md:mx-0"
        >
          SPONSOR NOW
        </Link>
      </div>

      {/* Dot Navigation (Optional) */}
      <div className="absolute z-30 flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              index === i ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
