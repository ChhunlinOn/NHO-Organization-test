"use client"

import { motion } from "framer-motion"
import {
  Heart,
  Mail,
  Camera,
  MessageCircle,
  Utensils,
  Shirt,
  Home,
  BookOpen,
  Stethoscope,
  Plus,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SponsorSection() {
  const benefits = [
    { icon: Utensils, text: "Nutritious food" },
    { icon: Shirt, text: "Clothing" },
    { icon: Home, text: "Safe shelter" },
    { icon: BookOpen, text: "Education" },
    { icon: Stethoscope, text: "Basic first aid" },
    { icon: Plus, text: "And so much more!" },
  ]

  const sponsorBenefits = [
    { icon: Camera, text: "Regular updates with photos" },
    { icon: Mail, text: "Emails from your sponsored child" },
    { icon: MessageCircle, text: "Opportunity to exchange messages" },
    { icon: Heart, text: "Build a meaningful connection" },
  ]

  return (
    <section className="py-20 bg-gray-50">
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
                <Heart className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sponsor a Child Be the Difference</h2>
            <div className=" bg-green-600 text-white rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-xl  font-bold ">Just $100 USD per month</p>
              <p className="text-lg ">can transform a child&apos;s life completely</p>
            </div> 
          </motion.div>

          {/* What Sponsorship Provides */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">What Your Sponsorship Provides</h3>
            <div className="grid grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-green-100"
                >
                  <benefit.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-700">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What You Receive */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">What You&apos;ll Receive as a Sponsor</h3>
            <div className="grid grid-cols-2 gap-6">
              {sponsorBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg"
                >
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-medium">{benefit.text}</p>
                </motion.div>
              ))}
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
              <h3 className="text-2xl font-bold mb-6">Will you be part of the next chapter of this story?</h3>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-green-600 font-bold px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  Become a sponsor today and give a child the chance to thrive
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
