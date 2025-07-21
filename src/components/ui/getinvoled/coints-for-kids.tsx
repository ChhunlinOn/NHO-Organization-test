"use client"

import { motion } from "framer-motion"
import { Coins, Gift, Users, Coffee, Quote, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CoinsForKids() {
  const contributions = [
    { icon: Coins, text: "Leftover coins from your wallet" },
    { icon: Gift, text: "Birthday donations" },
    { icon: Users, text: "Sponsorship from personal challenges" },
    { icon: Coffee, text: "Coffee money donations" },
  ]

  const ideas = [
    { icon: Users, text: "Host a fundraiser at school, church, or work" },
    { icon: Gift, text: "Ask friends to donate in honor of your birthday or special occasion" },
    { icon: Users, text: "Organize a sponsored run, walk, or creative challenge" },
    { icon: Coins, text: "Set up a coin jar at home, your local café, your work places, or church" },
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
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="bg-green-600 p-3 rounded-full"
              >
                <Coins className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Coins for Kids – Every Little Bit Counts</h2>
            <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-600">
              <p>
                Looking for a fun and simple way to give? Join Coins for Kids, a program run by SEAPC that turns your
                small change into BIG change for children in need!
              </p>
              <p>
                Whether it&apos;s leftover coins from your wallet, your birthday donations, or sponsorship from a personal
                challenge or fundraiser — every contribution matters. People around the world have climbed mountains,
                hosted bake sales, and even donated their coffee money — all to bless the children of New Hope for
                Children Homes.
              </p>
            </div>
          </motion.div>

          {/* Inspirational Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 text-center relative">
              <Quote className="w-10 h-10 text-green-300 mx-auto mb-4" />
              <blockquote className="text-2xl font-bold text-gray-800 italic mb-4">
              &quot;You don&apos;t have to do something huge to make a huge difference.&quot;
              </blockquote>
              <div className="w-16 h-1 bg-green-600 mx-auto"></div>
            </div>
          </motion.div>

          {/* Ways to Contribute */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">Ways to Contribute</h3>
            <div className="grid grid-cols-2 gap-6">
              {contributions.map((contribution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 flex items-center gap-4 border-2 border-gray-100 shadow-lg"
                >
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <contribution.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-medium">{contribution.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Easy Ways to Help */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">Here are some easy ways you can help</h3>
            <div className="grid grid-cols-2 gap-6">
              {ideas.map((idea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 text-center border-2 border-green-100 shadow-lg"
                >
                  <idea.icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium">{idea.text}</p>
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
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Campaign?</h3>
              <p className="text-lg mb-6">
                We&apos;re here to support you with tools and ideas to make your fundraiser a success!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-green-600 font-bold px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Rocket className="w-5 h-5" />
                  Start Your Coins for Kids Campaign
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
