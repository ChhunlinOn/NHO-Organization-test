"use client";

import { motion } from "framer-motion";
import { Share2, Users, Heart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartnerSection() {
  const partnershipWays = [
    { icon: Heart, text: "Sponsor a child" },
    { icon: Users, text: "Host a Coins for Kids fundraiser" },
    { icon: Share2, text: "Share our story with your community" },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="bg-green-600 p-3 rounded-full"
              >
                <Users className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800">
              Partner With Us Join the Mission
            </h2>
          </motion.div>

          {/* Intro Paragraph */}
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6 text-center leading-relaxed">
            Whether you choose to sponsor a child, host a Coins for Kids
            fundraiser, or simply share our story with your community your
            involvement matters. Together we can make a lasting impact.
          </p>
          <p className="text-green-600 text-center mb-8">Partner with us today and help us change the future for these
                incredible children. </p>
           

          {/* Partnership Ways */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
           
          </motion.div>
        </div>
      </div>
    </section>
  );
}
