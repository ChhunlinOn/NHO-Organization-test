import Image from "next/image"
import Link from "next/link"

export default function WhatWeDoSection() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl font-bold text-[#43A047] text-center mb-6">WHAT WE DO?</h2>
      <p className="text-center max-w-4xl mx-auto mb-12">
        New Hope for Orphans organization operates 16 provinces across 25 cities and provinces in Cambodia. We are
        committed to improving, not abandoning, residential orphan care. Rather of Cambodia, New Hope for Orphans
        gives them the Christ-based nurturing and pathways to success with educational programs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* Spiritual Development */}
        <div className="flex flex-col items-center group">
          <Link
            href="/what-we-do/spiritual-development"
            className="relative w-48 h-48 rounded-full overflow-hidden mb-4 block"
          >
            <Image
              src="/girl.jpg"
              alt="Spiritual Development"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300" />
          </Link>
          <h3 className="text-lg font-bold text-center">Spiritual Development</h3>
        </div>

        {/* University Sponsorship */}
        <div className="flex flex-col items-center group">
          <Link
            href="/what-we-do/university-sponsorship"
            className="relative w-48 h-48 rounded-full overflow-hidden mb-4 block"
          >
            <Image
              src="/university.jpg"
              alt="University Sponsorship"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300" />
          </Link>
          <h3 className="text-lg font-bold text-center">University Sponsorship</h3>
        </div>

        {/* Skills/Vocational Training */}
        <div className="flex flex-col items-center group">
          <Link
            href="/what-we-do/vocational-training"
            className="relative w-48 h-48 rounded-full overflow-hidden mb-4 block"
          >
            <Image
              src="/vicational.jpg"
              alt="Skills/Vocational Training"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300" />
          </Link>
          <h3 className="text-lg font-bold text-center">Skills/Vocational Training</h3>
        </div>

        {/* Kid's Camp */}
        <div className="flex flex-col items-center group">
          <Link
            href="/what-we-do/kids-camp"
            className="relative w-48 h-48 rounded-full overflow-hidden mb-4 block"
          >
            <Image
              src="/kide.jpg"
              alt="Kid's Camp"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300" />
          </Link>
          <h3 className="text-lg font-bold text-center">Kid&apos;s Camp</h3>
        </div>
      </div>
    </section>
  )
}
