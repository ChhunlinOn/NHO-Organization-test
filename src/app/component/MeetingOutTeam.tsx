import Image from "next/image";
import { Heart, Star } from "lucide-react";

// Team data based on your provided information
const teamData = [
  {
    id: 1,
    name: "Dr. Phoeuk Sinai and his family",
    role: "Director and Founder",
    description:
      "Visionary leader who founded New Hope Children's Homes with his family, dedicated to transforming lives through Christ's love.",
    image: "/Dr. Phoeuk Sinai and his family.jpg",
    isFounder: true,
  },
  {
    id: 2,
    name: "Mr. Chhin Chhoeurn",
    role: "Sponsorship Program Coordinator",
    description:
      "Coordinates sponsorship programs, connecting generous hearts with children in need of support and care.",
    image: "/Mr. Chhin Chhoeurn.jpg",
  },
  {
    id: 3,
    name: "Mr. Sor Sokhom",
    role: "Deputy Director",
    description:
      "Supports organizational leadership and ensures smooth operations across all children's homes.",
    image: "/Mr. Sor Sokhom.jpg",
  },
  {
    id: 4,
    name: "Ms. John Sarah",
    role: "Accountant",
    description:
      "Manages financial operations with integrity, ensuring resources are used effectively for the children's benefit.",
    image: "/Ms. John Sarah.jpg",
  },
  {
    id: 5,
    name: "Ms. Ouk Phearom",
    role: "Assistant Accountant",
    description:
      "Supports financial management and maintains accurate records for transparent operations.",
    image: "/Ms. Ouk Phearom.jpg",
  },
  {
    id: 6,
    name: "Ms. Phat Doeurn (Jen)",
    role: "Communicator and Program Developer",
    description:
      "Develops programs and manages communications, sharing our mission and impact with the world.",
    image: "/Ms. Phat Doeurn( Jen).jpg",
  },
  {
    id: 7,
    name: "Mr. Sen Sophea",
    role: "Educational Manager and Housemaster",
    description:
      "Oversees educational programs and serves as housemaster, nurturing both academic and personal growth.",
    image: "/Mr. Sen Sophea.jpg",
  },
  {
    id: 8,
    name: "Mr. Im Chanoudom",
    role: "Team Leader and Manager",
    description:
      "Provides leadership and management support, ensuring effective coordination across all programs.",
    image: "/Mr. Im Chanoudom.jpg",
  },
];

export default function MeetOurTeam() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Dedicated individuals working together to transform lives and build
            hope for Cambodia&#39;s children
          </p>
        </div>

        {/* Founder Spotlight */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 text-[#43A047] rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-2 border-[#4eb753]">
                  <Image
                    src={teamData[0].image || "/placeholder.svg"}
                    alt={teamData[0].name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                  <Star className="w-6 h-6 text-yellow-800" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-2">{teamData[0].name}</h3>
                <p className="text-xl font-semibold mb-4 text-green-100">
                  {teamData[0].role}
                </p>
                <p className="text-lg leading-relaxed opacity-90">
                  {teamData[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamData.slice(1).map((member, index) => (
            <div
              key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {member.name}
                </h3>
                <p className="text-[#43A047] font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-[#43A047] mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">
                Join Our Mission
              </h3>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Our dedicated team works tirelessly to provide hope and
              transformation. Together, we can make an even greater impact in
              the lives of Cambodia&#39;s children.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-[#43A047] text-white font-semibold rounded-full hover:bg-[#388E3C] transform hover:scale-105 transition-all duration-300 shadow-lg">
                Support Our Work
              </button>
              <button className="px-8 py-3 border-2 border-[#43A047] text-[#43A047] font-semibold rounded-full hover:bg-[#43A047] hover:text-white transition-all duration-300">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
