import Image from "next/image"
import Link from "next/link"
import { BookOpen, GraduationCap, Tent, ArrowRight } from "lucide-react"

export default function WhatWeDoSection() {
  const activities = [
    {
      label: "Spiritual Development",
      href: "/page/WhatWeDo/spiritualdevelopment",
      image: "/Dary.jpg",
      description:
        "Nurturing faith and character through biblical teachings and mentorship, guiding children to discover their God-given purpose.",
      icon: BookOpen,
    },
    {
      label: "Vocational Training & Higher Education",
      href: "/education-programs",
      image: "/vicational.jpg",
      description:
        "Empowering youth with practical skills and university opportunities, ensuring they have pathways to stable employment and independence.",
      icon: GraduationCap,
    },
    {
      label: "Kid's Camp",
      href: "/what-we-do/kids-camp",
      image: "/kide.jpg",
      description:
        "A joyful and faith-filled gathering for all children, fostering lasting friendships and spiritual growth in a fun environment.",
      icon: Tent,
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">What We Do</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            New Hope for Orphans is dedicated to providing Christ-based nurturing and pathways to success through
            comprehensive educational and spiritual programs across Cambodia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {activities.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <Link href={item.href} className="relative w-full aspect-[4/3] overflow-hidden block">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              </Link>
              <div className="p-6 flex flex-col items-center text-center flex-grow">
                <div className="w-16 h-16 bg-[#43A047] rounded-full flex items-center justify-center mb-4 shadow-md">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-[#43A047] transition-colors duration-200">
                  <Link href={item.href}>{item.label}</Link>
                </h3>
                <p className="text-gray-700 text-base mb-4 flex-grow">{item.description}</p>
                <Link
                  href={item.href}
                  className="inline-flex items-center text-[#43A047] font-semibold hover:underline transition-colors duration-200 mt-auto"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
