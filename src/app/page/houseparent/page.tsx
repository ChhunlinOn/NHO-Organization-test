"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import {
  MapPin,
  Users,
  Building,
  Heart,
  ChevronDown,
  ChevronUp,
  Home,
  Star,
} from "lucide-react";

// This data structure shows how your API data should be formatted
const homesData = [
  {
    id: 1,
    name: "Banteay Meanchey Home",
    location: "Khom Chomnom, Mongkol Borey",
    children: 52,
    buildings: 3,
    story:
      "One of the original homes, established on land once owned by Pastor Sinai's father. Chamra, his youngest brother, serves with deep love and is affectionately called 'Dad' by the children.",
    established: "Original Home",
    image: "/nho.jpg",
    highlight: "Legacy of Love",
    mapLink: "https://maps.app.goo.gl/MiPhJSfZGeHjdUnV9",
  },
  {
    id: 2,
    name: "Oddar Meanchey Home",
    location: "Phum Chomkajek, Sangkat Osmach",
    children: 61,
    buildings: 3,
    story:
      "Started by a pastor who saw children at the border in danger and took action with Pastor Sinai's help. The home grew rapidly through God's provision.",
    established: "Border Rescue",
    image: "/kide.jpg",
    highlight: "Rescue",
  },
  {
    id: 3,
    name: "Kampong Speu Home",
    location: "Phum Ghor, Sangkat Kandaldom",
    children: 24,
    buildings: 3,
    story:
      "Originally housed in a church, the current housefather is the son of the former housemother and continues her legacy alongside his wife, who also grew up in the home.",
    established: "Family Legacy",
     image: "/nho.jpg",
    highlight: "Generational Care",
  },
  {
    id: 4,
    name: "Kampong Thom Home",
    location: "Khom Okunthortbong",
    children: 25,
    buildings: 4,
    story:
      "Sitha, once an orphan here, returned with his wife to start this home from his own funds. He leads as the father he once needed.",
    established: "Former Orphan",
     image: "/nho.jpg",
    highlight: "Full Circle Story",
  },
  {
    id: 5,
    name: "Pursat Home",
    location: "Phum Kacherdachbay",
    children: 32,
    buildings: 2,
    story:
      "Started in 2008, this home is deeply rooted in the love of houseparents who've seen many children grow and return as adults.",
    established: "Since 2008",
     image: "/nho.jpg",
    highlight: "Growing Alumni",
  },
  {
    id: 6,
    name: "Takeo Home",
    location: "Phum Kdach",
    children: 25,
    buildings: 3,
    story:
      "Children moved here in 2017 from a rented house. The home provides them with stability and safety for the first time.",
    established: "2017",
     image: "/nho.jpg",
    highlight: "New Stability",
  },
  {
    id: 7,
    name: "Phnom Penh Student Center",
    location: "St. 85BT, Boeng Tumpun",
    children: 25,
    buildings: 6,
    story:
      "This center supports older students, serves as the HQ of NHO, and provides housing for kids receiving medical care.",
    established: "HQ Center",
     image: "/nho.jpg",
    highlight: "Education Hub",
  },
  {
    id: 8,
    name: "Kampot Home",
    location: "Phum Kdach",
    children: 7,
    buildings: 2,
    story:
      "Mean, once raised in NHO's care, now leads this home for vulnerable boys.",
    established: "Alumni Led",
     image: "/nho.jpg",
    highlight: "Boys' Sanctuary",
  },
  {
    id: 9,
    name: "Kampong Chhnang Home",
    location: "Phum Svay Krom",
    children: 29,
    buildings: 3,
    story:
      "Founded in 2006 by a local pastor. Now led by the next generation of a family committed to care.",
    established: "Since 2006",
     image: "/nho.jpg",
    highlight: "Next Generation",
  },
  {
    id: 10,
    name: "Kampong Cham Home",
    location: "Phum Sekyom, Prek Chor",
    children: 51,
    buildings: 3,
    story:
      "Tevy and Vandy continue her parents' legacy with new buildings and growing hope.",
    established: "Family Legacy",
     image: "/nho.jpg",
    highlight: "Growing Hope",
  },
  {
    id: 11,
    name: "Sihanoukville Home",
    location: "Phum Steungsomrong",
    children: 18,
    buildings: 3,
    story:
      "Located in the mountains, this home provides a peaceful and faith-filled environment for young children.",
    established: "Mountain Home",
     image: "/nho.jpg",
    highlight: "Peaceful Haven",
  },
  {
    id: 12,
    name: "Battambang Home",
    location: "Phum Odombong",
    children: 19,
    buildings: 4,
    story:
      "Established in 2011, led by a pastor who sees himself as both a shepherd and a father to the children.",
    established: "Since 2011",
     image: "/nho.jpg",
    highlight: "Shepherd's Heart",
  },
  {
    id: 13,
    name: "Siem Reap Home",
    location: "Phum Krosang",
    children: 28,
    buildings: 3,
    story:
      "Veteran leaders in NHO, this couple returned to serve in Siem Reap where their compassion continues to shine.",
    established: "Veteran Leaders",
     image: "/nho.jpg",
    highlight: "Experienced Care",
  },
  {
    id: 14,
    name: "Pailin Home",
    location: "Phum Tmey",
    children: 40,
    buildings: 1,
    story:
      "Built in 2016, the couple finds joy in seeing the spiritual and personal growth of the children.",
    established: "Built 2016",
     image: "/nho.jpg",
    highlight: "Spiritual Growth",
  },
  {
    id: 15,
    name: "Preah Vihear Home",
    location: "Phum Sroemkhangtbong",
    children: 32,
    buildings: 3,
    story:
      "Once an independent home, it joined NHO in 2013 and now thrives under faithful leadership.",
    established: "Joined 2013",
     image: "/nho.jpg",
    highlight: "United Vision",
  },
  {
    id: 16,
    name: "Prey Veng Home",
    location: "Phum Prey Ogroun",
    children: 15,
    buildings: 2,
    story:
      "Chok leads with a father's heart: 'Though not my biological children, I love them as my own.'",
    established: "Heart-Led",
     image: "/nho.jpg",
    highlight: "Father's Love",
  },
];

export default function HomePage() {
  // State for managing expanded cards and animations
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  // Animation observer for cards appearing on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Toggle card expansion
  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Calculate totals for statistics
  const totalChildren = homesData.reduce((sum, home) => sum + home.children, 0);
  const totalBuildings = homesData.reduce(
    (sum, home) => sum + home.buildings,
    0
  );

  /* 
    TO FETCH FROM API LATER:
    
    1. Replace the homesData array above with:
       const [homesData, setHomesData] = useState([])
    
    2. Add useEffect to fetch data:
       useEffect(() => {
         const fetchHomes = async () => {
           try {
             const response = await fetch('/api/homes')
             const data = await response.json()
             setHomesData(data)
           } catch (error) {
             console.error('Error fetching homes:', error)
           }
         }
         fetchHomes()
       }, [])
    
    3. Make sure your API returns data in the same format as homesData above
  */

  return (
    <main className="min-h-screen bg-white">
      {/* Space reserved for menu component */}
      <div className="h-16 bg-white border-b border-green-100">
        {/* Your menu component goes here */}
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Heart className="w-4 h-4 mr-2" />
              Homes Across Cambodia
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 animate-slide-up">
              Children&apos;s Homes &
              <span className="text-green-600 block">Houseparents</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6 text-left">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 animate-slide-in-left">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Across Cambodia
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                       Each of our homes is located between one to ten hours&apos; drive from Phnom Penh. Along the way
                       , you&apos;ll witness breathtaking views of lush rice fields and peaceful countryside life, a reminder of Cambodia&apos;s 
                       natural beauty and resilience.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 animate-slide-in-left delay-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Dedicated Houseparents
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                       At the heart of every home are our dedicated houseparents, many of whom are long-time pastors 
                       or have been Christians for over five years. They serve not only as caregivers but as spiritual mentors, 
                       guiding these children to discover hope, faith, and a future in Christ.


                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 animate-slide-in-left delay-200">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Unwavering Love
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Though these children have endured great loss and hardship, they are surrounded by unwavering love—a love that reflects
                         God&apos;s grace through the commitment of those who have dedicated their lives to serving Him.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-slide-in-right">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 w-[500px]">
                  
                  <Image
                    src="/houseparent-header.jpeg"
                    alt="Children playing in Cambodia countryside"
                    width={500}
                    height={300}
                    className="w-full h-120 object-cover rounded-2xl mb-6"
                  />
                  <blockquote className="text-center">
                    <p className="text-lg italic text-gray-700 mb-4">
                      &quot;And now these three remain: faith, hope, and love. But
                      the greatest of these is love.&quot;
                    </p>
                    <footer className="text-green-600 font-medium">
                      — 1 Corinthians 13:13
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100 transform hover:scale-105 transition-all duration-300 animate-fade-in-up">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {homesData.length}
                </div>
                <div className="text-green-600 font-medium">Homes</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100 transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-100">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {totalChildren}
                </div>
                <div className="text-green-600 font-medium">Children</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100 transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-200">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {totalBuildings}
                </div>
                <div className="text-green-600 font-medium">Buildings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Homes Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Children&apos;s Homes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the unique stories and loving communities that make each
              home special
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
                  <a
                    href={home.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={home.image}
                      alt={`${home.name} exterior`}
                      width={500}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                        expandedCard === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-green-100 pt-4 space-y-4">
                        <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                          {home.established}
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {home.story}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {home.children}
                            </div>
                            <div className="text-xs text-green-700">
                              Children
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {home.buildings}
                            </div>
                            <div className="text-xs text-green-700">
                              Buildings
                            </div>
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
      <section
  className="py-20 bg-white shadow-lg border-t-2 border-green-600"
>
  <div className="container mx-auto px-6 text-center">
    <div className="max-w-3xl mx-auto">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-4xl font-bold text-green-700 mb-6">
        Join Us in Making a Difference
      </h3>
      <p className="text-xl text-green-600 mb-8 leading-relaxed">
        Every child deserves love, hope, and a bright future. Your support
        helps us continue this vital work across Cambodia.
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
  );
}
