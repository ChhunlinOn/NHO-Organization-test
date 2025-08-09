"use client"
import { useState, useEffect } from "react"
import { MapPin, Users, Building, Heart, ChevronDown, ChevronUp, Home, Star } from "lucide-react"
import Image from "next/image"

// This data structure shows how your API data should be formatted
const homesData = [
  {
    id: 1,
    name: "Banteay Meanchey Home", // BC Home
    location: "Khom Chomnom, Mongkol Borey",
    children: 52,
    buildings: 3,
    story:
      "One of our original homes, built on land once owned by Pastor Sinai’s father. His youngest brother, Chamra, now serves as the housefather—loved deeply by the children, who simply call him &quot;Dad.&quot;",
    established: "Original Home",
    image: "/All Home Pic/BC Home.jpg",
    highlight: "Legacy of Love",
    mapLink: "https://maps.app.goo.gl/bLqRbnJNcYv5QTga7",
  },
  {
    id: 2,
    name: "Oddar Meanchey Home", // OM Home
    location: "Phum Chomkajek, Sangkat Osmach",
    children: 61,
    buildings: 3,
    story:
      "This home began when a pastor, moved with compassion for vulnerable border children, partnered with Pastor Sinai to provide safety and care. It has since grown rapidly, a testimony to God&apos;s faithful provision.",
    established: "Border Rescue",
    image: "/All Home Pic/OM Home.jpg",
    highlight: "Rescue",
    mapLink: "https://maps.app.goo.gl/vvkWWoNfgavRDZ3C7",
  },
  {
    id: 3,
    name: "Kampong Speu Home", // KS Home
    location: "Phum Ghor, Sangkat Kandaldom",
    children: 24,
    buildings: 3,
    story:
      "Once operating from a church building, this home is now led by the son of the original housemother. Alongside his wife—who herself grew up in this home—they continue a beautiful legacy of love and discipleship.",
    established: "Family Legacy",
    image: "/All Home Pic/KS Home.jpg",
    highlight: "Generational Care",
    mapLink: "https://maps.app.goo.gl/7Npyfs3DkYmYHgYd9",
  },
  {
    id: 4,
    name: "Kampong Thom Home", // KT Home
    location: "Khom Okunthortbong",
    children: 25,
    buildings: 4,
    story:
      "A joyful and loving home where every child is nurtured in a safe and welcoming environment, surrounded by God&apos;s peace and presence.",
    established: "Former Orphan",
    image: "/All Home Pic/KT Home.jpg",
    highlight: "Full Circle Story",
    mapLink: "https://maps.app.goo.gl/MopRqx5VqeYveuFBA",
  },
  {
    id: 5,
    name: "Pursat Home", // PS Home
    location: "Phum Kacherdachbay",
    children: 32,
    buildings: 2,
    story:
      "Many of today&apos;s mission leaders once called this home their own. The houseparents here continue that powerful legacy—raising children with love, purpose, and the truth of God&apos;s Word.",
    established: "Since 2008",
    image: "/All Home Pic/PS Home.jpg",
    highlight: "Growing Alumni",
    mapLink: "https://maps.app.goo.gl/qP66FShUc7W3ZtiD7",
  },
  {
    id: 6,
    name: "Takeo Home", // TK Home
    location: "Phum Kdach",
    children: 25,
    buildings: 3,
    story:
      "Years ago, a faithful couple walked into a local church and saw children in need. God stirred their hearts with a calling they couldn&apos;t ignore. Today, they are lovingly known as &quot;Mom and Dad&quot; to every child they serve.",
    established: "2017",
    image: "/All Home Pic/TK Home.jpg",
    highlight: "New Stability",
    mapLink: "https://maps.app.goo.gl/B1EcpcFKLFsC55HLA",
  },
  {
    id: 7,
    name: "Phnom Penh Student Center", // PP Home
    location: "St. 85BT, Boeng Tumpun",
    children: 25,
    buildings: 6,
    story:
      "More than a student dorm, this center is the heart of our mission—supporting university and vocational students, especially those receiving medical care, while also serving as the headquarters of NHCH.",
    established: "HQ Center",
    image: "/All Home Pic/PP Home.jpg",
    highlight: "Education Hub",
    mapLink: "https://maps.app.goo.gl/HAUUP6H8BLD3enFA6",
  },
  {
    id: 8,
    name: "Kampot Home", // KP Home
    location: "Phum Kdach",
    children: 7,
    buildings: 2,
    story:
      "A powerful story of transformation—one of our university graduates has returned, now married with children, and is passionately investing in the next generation of young leaders.",
    established: "Alumni Led",
    image: "/All Home Pic/KP Home.jpeg",
    highlight: "Boys' Sanctuary",
    mapLink: "https://maps.app.goo.gl/qpHTzu4RXtWoDb8x8",
  },
  {
    id: 9,
    name: "Kampong Chhnang Home", // KC Home
    location: "Phum Svay Krom",
    children: 29,
    buildings: 3,
    story:
      "Another inspiring graduate story—this former student, now a parent and leader, has come home to raise up children with the same hope and vision that once transformed their life.",
    established: "Since 2006",
    image: "/nho.jpg",
    highlight: "Next Generation",
    mapLink: "https://maps.app.goo.gl/DRzVgR7kpKEV1JXn7",
  },
  {
    id: 10,
    name: "Kampong Cham Home", // KM Home
    location: "Phum Sekyom, Prek Chor",
    children: 51,
    buildings: 3,
    story:
      "Tevy and Vandy continue the work of her parents with full hearts. With new buildings rising and fresh hope growing, this home shines as a light of generational faithfulness.",
    established: "Family Legacy",
    image: "/All Home Pic/KM Home.jpg",
    highlight: "Growing Hope",
    mapLink: "https://maps.app.goo.gl/sWi1Tr6DsxLmin568",
  },
  {
    id: 11,
    name: "Battambang Home 2", // BB2 Home (Girls Only)
    location: "Phum Steungsomrong",
    children: 18,
    buildings: 3,
    story:
      "A beautiful, warm, and secure home created especially for girls. Here, they grow up surrounded by love, encouragement, and the freedom to thrive.",
    established: "Girls' Home",
    image: "/All Home Pic/BB2 Home.jpg",
    highlight: "Peaceful Haven",
    mapLink: "https://maps.app.goo.gl/NjTbu1vRKRf9B7YC6",
  },
  {
    id: 12,
    name: "Battambang Home 1", // BB1 Home
    location: "Phum Odombong",
    children: 19,
    buildings: 4,
    story:
      "Located in one of Cambodia&apos;s most well-known cities, this home is full of life, laughter, and legacy. A place where children are raised in love and pointed toward Christ.",
    established: "Since 2011",
    image: "/All Home Pic/BB1 Home.jpg",
    highlight: "Shepherd&apos;s Heart",
    mapLink: "https://maps.app.goo.gl/bDbu6JRLSsH3pvYV9",
  },
  {
    id: 13,
    name: "Siem Reap Home", // SR Home
    location: "Phum Krosang",
    children: 28,
    buildings: 3,
    story:
      "A sweet and peaceful home that feels like one big family. Set in nature, complete with a chicken coop, it offers the children a safe and simple life surrounded by God&apos;s creation.",
    established: "Veteran Leaders",
    image: "/All Home Pic/BB1 Home.jpg",
    highlight: "Experienced Care",
    mapLink: "https://maps.app.goo.gl/fZhqa8j17ApoUSMZ6",
  },
  {
    id: 14,
    name: "Pailin Home", // PL Home
    location: "Phum Tmey",
    children: 40,
    buildings: 1,
    story:
      "The children in this home are exceptionally bright and regularly receive awards. Walk through the home and you&apos;ll see every wall proudly decorated with their achievements.",
    established: "Built 2016",
    image: "/All Home Pic/PL Home.jpg",
    highlight: "Spiritual Growth",
    mapLink: "https://maps.app.goo.gl/Gr7m4RZgspXcgdmv5",
  },
  {
    id: 15,
    name: "Preah Vihear Home", // PVH Home
    location: "Phum Sroemkhangtbong",
    children: 32,
    buildings: 3,
    story:
      "This is a mission-driven home where the houseparents intentionally disciple children to become future leaders—spiritually, academically, and socially.",
    established: "Joined 2013",
    image: "/All Home Pic/PVH Home.jpg",
    highlight: "United Vision",
    mapLink: "https://maps.app.goo.gl/FQ3UoAx1qViA5zJn6",
  },
  {
    id: 16,
    name: "Prey Veng Home", // PV Home
    location: "Phum Prey Ogroun",
    children: 15,
    buildings: 2,
    story:
      "Though still a developing site, this home is full of heart. The land belongs to the houseparents, making the mission even more meaningful. With your support, children here are growing in love and purpose.",
    established: "Heart-Led",
    image: "/All Home Pic/PV Home.jpg",
    highlight: "Father&apos;s Love",
    mapLink: "https://maps.app.goo.gl/bo1xT1pKcTtAga6d7",
  },
]

export default function HouseParentsPage() {
  // State for managing expanded cards and animations
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  // Animation observer for cards appearing on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1 },
    )
    const cards = document.querySelectorAll("[data-index]")
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // Toggle card expansion
  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  // Calculate totals for statistics
  const totalChildren = homesData.reduce((sum, home) => sum + home.children, 0)
  const totalBuildings = homesData.reduce((sum, home) => sum + home.buildings, 0)


  return (
    <main className="min-h-screen bg-white mt-10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Homes Across Cambodia
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Children&apos;s Homes &<span className="text-green-600 block">Houseparents</span>
            </h1>
          </div>

          {/* Main Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[3/1] rounded-2xl overflow-hidden shadow-2xl mb-12">
            <Image
              src="/family.jpg"
              alt="Children playing in Cambodia countryside"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Text Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <MapPin className="w-6 h-6 text-green-600" />,
                title: "Across Cambodia",
                text: `Each of our homes is located between one to ten hours drive from Phnom Penh. Along the way, you'll witness breathtaking views of lush rice fields and peaceful countryside life, a reminder of Cambodia's natural beauty and resilience.`,
              },
              {
                icon: <Users className="w-6 h-6 text-green-600" />,
                title: "Dedicated Houseparents",
                text: `At the heart of every home are our dedicated houseparents, many of whom are long-time pastors or have been Christians for over five years. They serve not only as caregivers but as spiritual mentors, guiding these children to discover hope, faith, and a future in Christ.`,
              },
              {
                icon: <Heart className="w-6 h-6 text-green-600" />,
                title: "Unwavering Love",
                text: `Though these children have endured great loss and hardship, they are surrounded by unwavering love a love that reflects God's grace through the commitment of those who have dedicated their lives to serving Him.`,
              },
            ].map(({ icon, title, text }, i) => (
              <div
                key={i}
                className={`bg-white p-6 rounded-2xl shadow-md border border-green-100 animate-slide-in-up delay-${
                  (i + 1) * 100
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Blockquote */}
          <blockquote className="text-center max-w-3xl mx-auto">
            <p className="text-lg italic text-gray-700 mb-4">
              &quot;And now these three remain: faith, hope, and love. But the greatest of these is love.&quot;
            </p>
            <footer className="text-green-600 font-medium">— 1 Corinthians 13:13</footer>
          </blockquote>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: <Home className="w-8 h-8 text-green-600" />, count: homesData.length, label: "Homes" },
              { icon: <Users className="w-8 h-8 text-green-600" />, count: totalChildren, label: "Children" },
              { icon: <Building className="w-8 h-8 text-green-600" />, count: totalBuildings, label: "Buildings" },
            ].map(({ icon, count, label }, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl shadow-lg p-8 border border-green-100 transform hover:scale-105 transition duration-300 animate-fade-in-up delay-${
                  (i + 1) * 100
                }`}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{count}</div>
                <div className="text-green-600 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Homes Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Children&apos;s Homes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the unique stories and loving communities that make each home special
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {homesData.map((home, index) => (
              <div
                key={home.id}
                data-index={index}
                className={`group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white overflow-hidden rounded-lg ${
                  visibleCards.has(index) ? "animate-slide-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => toggleCard(index)}
              >
                <div className="relative">
                  <a href={home.mapLink} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={home.image || "/placeholder.svg"}
                      alt={`${home.name} exterior`}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ objectFit: "cover" }}
                    />
                  </a>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-medium text-white shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      {home.highlight}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="pb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                      {home.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-green-500" />
                      {home.location}
                    </p>
                  </div>
                  <div className="pt-0">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1 text-green-500" />
                          {home.children}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Building className="w-4 h-4 mr-1 text-green-500" />
                          {home.buildings}
                        </div>
                      </div>
                      <button className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors">
                        {expandedCard === index ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        expandedCard === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-green-100 pt-4 space-y-4">
                        <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                          {home.established}
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">{home.story}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">{home.children}</div>
                            <div className="text-xs text-green-700">Children</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">{home.buildings}</div>
                            <div className="text-xs text-green-700">Buildings</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white shadow-lg border-t-2 border-green-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-4xl font-bold text-green-700 mb-6">Join Us in Making a Difference</h3>
            <p className="text-xl text-green-600 mb-8 leading-relaxed">
              Every child deserves love, hope, and a bright future. Your support helps us continue this vital work
              across Cambodia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white hover:bg-green-700 shadow-md transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-medium">
                Learn More About Our Mission
              </button>
              <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white shadow-md transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-medium">
                Support Our Homes
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
