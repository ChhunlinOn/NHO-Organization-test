"use client";
import { motion } from "framer-motion";
import { Heart, Users, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white text-green-600 py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-8"
          >
            <h2 className="text-6xl font-bold text-center leading-snug">
              <span className="text-black">Make</span>{" "}
              <span className="text-green-600">a Difference</span>{" "}
              <span className="bg-black bg-clip-text text-transparent">
                Today
              </span>{" "}
              <span className="text-green-700"> Sponsor with</span>{" "}
              <span className="text-black">New Hope for Orphans</span>
            </h2>
          </motion.h1>
         

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-600 rounded-xl p-6 backdrop-blur-sm"
            >
              <Heart className="w-10 h-10 text-white mx-auto mb-3" />
              <p className="text-lg text-white font-bold">450+</p>
              <p className="text-sm text-green-100">Children Supported</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-600 rounded-xl p-6 backdrop-blur-sm"
            >
              <Users className="w-10 h-10 text-white mx-auto mb-3" />
              <p className="text-lg text-white font-bold">Global</p>
              <p className="text-sm text-green-100">Community</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-600 rounded-xl p-6 backdrop-blur-sm"
            >
              <Globe className="w-10 h-10 text-white mx-auto mb-3" />
              <p className="text-lg text-white font-bold">Worldwide</p>
              <p className="text-sm text-green-100">Impact</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
