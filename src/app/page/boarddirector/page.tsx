"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  category: "founder" | "director" | "team"
}

const teamData: TeamMember[] = [
  { id: 1, name: "George", role: "Co-Founder", image: "/chery.jpeg", category: "founder" },
  { id: 2, name: "Cherly", role: "Co-Founder", image: "/chery.jpeg", category: "founder" },
  { id: 3, name: "Y Somalay", role: "Founder", image: "/chery.jpeg", category: "founder" },
  { id: 4, name: "Y Somalay", role: "Founder", image: "/chery.jpeg", category: "founder" },

  { id: 5, name: "Dr. Sinai Director", role: "Director", image: "/chery.jpeg", category: "team" },

  { id: 6, name: "Mr. Sor Sokhom", role: "Team Member", image: "/chery.jpeg", category: "team" },
  { id: 7, name: "Ms. John Sarah", role: "Team Member", image: "/chery.jpeg", category: "team" },
  { id: 8, name: "Ms. Ouk Phearom", role: "Team Member", image: "/chery.jpeg", category: "team" },
  { id: 9, name: "Mr. Im Chanoudom", role: "Team Member", image: "/chery.jpeg", category: "team" },
  { id: 10, name: "Mr. Sen Sophea", role: "Team Member", image: "/chery.jpeg", category: "team" },
  { id: 11, name: "Mr. Chheurn Chhin", role: "Team Member", image: "/chery.jpeg", category: "team" },
  { id: 12, name: "Ms. Pheath Doeun", role: "Team Member", image: "/chery.jpeg", category: "team" },
  { id: 13, name: "Mr. Phath Chheurn", role: "Team Member", image: "/chery.jpeg", category: "team" },
]

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group hover:shadow-lg transition-all duration-300 hover:bg-green-50 border border-green-100 rounded-lg bg-white"
    >
      <div className="p-8 text-center relative overflow-hidden">
        <div className="relative overflow-hidden rounded-full w-40 h-40 mx-auto mb-6">
          <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
        </div>
        <h3 className="font-semibold text-xl text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-green-600 font-medium text-lg group-hover:text-green-800 transition-colors duration-300">
          {member.role}
        </p>
      </div>
    </motion.div>
  )
}

function PaginatedSection({ title, members }: { title: string; members: TeamMember[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(members.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentMembers = members.slice(startIndex, startIndex + itemsPerPage)

  const goToPage = (page: number) => setCurrentPage(page)
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <h2 className="text-4xl font-bold text-center mb-16 text-green-700">{title}</h2>

      <div className="mx-auto" style={{ width: "80%" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {currentMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={
                    currentPage === page
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border-green-300 text-green-700 hover:bg-green-50"
                  }
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50 bg-transparent"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default function HomePage() {
  const founders = teamData.filter((member) => member.category === "founder")
  const teamMembers = teamData.filter((member) => member.category === "team")

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white overflow-visible">
      <main className="container mx-auto px-6 py-32">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              New Hope Children&apos;s Homes
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Meet the People Behind Our Mission
            </p>
          </div>
        </motion.div>

        <PaginatedSection title="Our Founders" members={founders} />
        <PaginatedSection title="Meeting Our Team" members={teamMembers} />
      </main>
    </div>
  )
}
