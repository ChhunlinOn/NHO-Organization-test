import Image from "next/image"
import Link from "next/link"

export default function WhatWeDoSection() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
      <h2 className="text-3xl font-bold text-[#43A047] text-center mb-6">WHAT WE DO?</h2>
      <p className="text-center max-w-4xl mx-auto mb-12">
        New Hope for Orphans organization operates 16 provinces across 25 cities and provinces in Cambodia. We are
        committed to improving, not abandoning, residential orphan care. Rather of Cambodia, New Hope for Orphans
        gives them the Christ-based nurturing and pathways to success with educational programs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {/* Card */}
        {[
          {
            label: "Spiritual Development",
            href: "/what-we-do/spiritual-development",
            image: "/girl.jpg",
          },
          {
            label: "University Sponsorship",
            href: "/what-we-do/university-sponsorship",
            image: "/university.jpg",
          },
          {
            label: "Skills/Vocational Training",
            href: "/what-we-do/vocational-training",
            image: "/vicational.jpg",
          },
          {
            label: "Kid's Camp",
            href: "/what-we-do/kids-camp",
            image: "/kide.jpg",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center group">
            <Link
              href={item.href}
              className="relative w-full aspect-[4/3] overflow-hidden mb-4 block rounded-lg max-w-xs"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300" />
            </Link>
            <h3 className="text-lg font-bold text-center">{item.label}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
