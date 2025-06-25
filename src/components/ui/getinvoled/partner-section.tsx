"use client"

import { motion } from "framer-motion"
import { Share2, Users, Heart, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PartnerSection() {
  const partnershipWays = [
    { icon: Heart, text: "Sponsor a child" },
    { icon: Users, text: "Host a Coins for Kids fundraiser" },
    { icon: Share2, text: "Share our story with your community" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="bg-green-600 p-3 rounded-full"
              >
                <Users className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Partner With Us – Join the Mission</h2>
          </motion.div>

          {/* Partnership Ways */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">Ways to Partner</h3>
            <div className="grid grid-cols-3 gap-6">
              {partnershipWays.map((way, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-2xl p-6 text-center shadow-lg border-2 border-green-100"
                >
                  <way.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-700">{way.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Impact Statement - Not in card, more interesting layout */}
          <div className="mb-16">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full px-6 py-3 inline-block mb-6">
                <span className="font-semibold">Your Impact Matters</span>
              </div>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Whether you choose to sponsor a child, host a Coins for Kids fundraiser, or simply share our story with
                your community — your involvement matters. Together, we can make a lasting impact.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Partner with us today and help us change the future for these incredible children.
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-green-600 font-bold px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <UserPlus className="w-5 h-5" />
                    Become a Partner Today
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 font-bold px-10 py-4 text-lg rounded-full transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Share2 className="w-5 h-5" />
                    Learn More About Our Mission
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
