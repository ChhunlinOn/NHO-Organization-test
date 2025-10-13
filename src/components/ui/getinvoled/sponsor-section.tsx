"use client";

import { motion } from "framer-motion";
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
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SponsorSection() {
  const benefits = [
    { icon: Utensils, text: "Nutritious food" },
    { icon: Shirt, text: "Clothing" },
    { icon: Home, text: "Safe shelter" },
    { icon: BookOpen, text: "Education" },
    { icon: Stethoscope, text: "Basic first aid" },
    { icon: Plus, text: "And so much more!" },
  ];

  const sponsorBenefits = [
    { icon: Camera, text: "Regular updates with photos" },
    { icon: Mail, text: "Emails from your sponsored child" },
    { icon: MessageCircle, text: "Opportunity to exchange messages" },
    { icon: Heart, text: "Build a meaningful connection" },
  ];

  return (
    <section className=" bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            {/* NEW: Two Large Prominent Sponsor Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-300 h-30  mx-auto">
              {/* Sponsor Locally Card */}
              <motion.a
                href="/sponsor-locally"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group border-4 border-green-500"
              >
                <div className="flex flex-col items-center text-white text-center space-y-4">
                  {/* Icon */}
                  <div className="bg-white bg-opacity-20 p-5 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                    <Users className="w-12 h-12" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold">
                    Sponsor Locally
                  </h3>

                  {/* Description */}
                  <p className="text-lg opacity-95 leading-relaxed">
                    Join forces with organizations and create lasting change.
                    Partner with us to support multiple children and families.
                  </p>

                  {/* Arrow/CTA */}
                  <div className="flex items-center gap-2 text-lg font-semibold mt-4 group-hover:gap-4 transition-all duration-300">
                    <span>Explore Options</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </motion.a>

              {/* Sponsor Partnership Card */}
              <motion.a
                href="/sponsor-partnership"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group border-4 border-yellow-400"
              >
                <div className="flex flex-col items-center text-white text-center space-y-4">
                  {/* Icon */}
                  <div className="bg-white bg-opacity-20 p-5 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                    <Users className="w-12 h-12" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold">
                    Sponsor Partnership
                  </h3>

                  {/* Description */}
                  <p className="text-lg opacity-95 leading-relaxed">
                    Join forces with organizations and create lasting change.
                    Partner with us to support multiple children and families.
                  </p>

                  {/* Arrow/CTA */}
                  <div className="flex items-center gap-2 text-lg font-semibold mt-4 group-hover:gap-4 transition-all duration-300">
                    <span>Explore Options</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            </div>

          
          
          </motion.div>

          {/* What Sponsorship Provides */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
              What Your Sponsorship Provides
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
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
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
              What You&apos;ll Receive as a Sponsor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl px-6 py-10 sm:px-10 sm:py-12 text-white max-w-6xl mx-auto flex flex-col items-center gap-6 relative">
              {/* Question */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug max-w-3xl text-center">
                Will you be part of the next chapter of this story?
              </h3>

              {/* Button (shifted just a little bit to the right for balance) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto relative left-0 sm:left-1 md:left-2"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white hover:bg-gray-100 text-green-600 font-bold px-4 sm:px-8 py-3 text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-center"
                >
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span className="leading-snug">
                    <span className="block sm:hidden">
                      Sponsor a child today
                    </span>
                    <span className="hidden sm:block">
                      Become a sponsor today and give a child the chance to
                      thrive.
                    </span>
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
