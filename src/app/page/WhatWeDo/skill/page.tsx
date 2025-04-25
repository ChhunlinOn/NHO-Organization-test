"use client";

import Image from "next/image";

export default function SkillsVocationalTraining() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-[#43A047] mb-8">
        Skills/Vocational Training{" "}
      </h1>

      <div className="text-center mb-12 max-w-4xl mx-auto">
        <p className="text-xl font-bold sm:text-lg text-start">
          Enable young adults to complete vocational education and earn the
          skills they need to obtain and maintain gainful employment and
          independence. 
        </p>
        <p className="text-xl sm:text-lg text-start mt-2">All kids will be educated in the public school system
          that is provided by the government of Cambodia. While many students
          choose to study at a university, others extend their education by
          attending skills or vocational training. These young adults can learn
          skills and trades such as hospitality management, cooking, and car
          mechanics.</p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Circular image with background */}
          <div className="relative w-full lg:w-1/2 flex-shrink-0">
            <div className="aspect-square w-full max-w-[400px] mx-auto group">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105">
                {/* Glowing animated border */}
                <div className="absolute inset-0 rounded-full z-0 bg-gradient-to-tr from-[#43A047] via-transparent to-[#A5D6A7] animate-spin-slow blur-lg opacity-50"></div>

                {/* Glass background */}
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md z-10 border-4 border-white/20 group-hover:border-[#43A047] transition" />

                {/* Image */}
                <Image
                  src="/skill.jpg"
                  alt="SEAPC internship program"
                  fill
                  className="object-cover z-20 relative rounded-full "
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#43A047] leading-tight">
              Cooking Skill
            </h2>

            <p className="text-lg text-gray-700">
              Internship in America: SEAPC has created an opportunity for
              students who graduate from university and wish to serve in the
              NGO. The internship lasts for 3 months.
            </p>

            <p className="text-lg text-gray-700">
              For three months they train in bible, leadership, finance,
              business, English, and more about NGO operations. When they
              complete the program, they will be immediately employed by SEAPC
              to work in Cambodia to help orphanages or schools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
