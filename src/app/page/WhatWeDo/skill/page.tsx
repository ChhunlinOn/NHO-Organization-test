"use client";

import Image from "next/image";

export default function SkillsVocationalTraining() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-[#43A047] mb-8">
        Vocational Training for Independence
      </h1>

      {/* Intro Paragraphs */}
      <div className="text-center mb-12 max-w-4xl mx-auto space-y-4">
        <p className="text-xl sm:text-lg text-start">
          We believe every young person deserves the opportunity to thrive —
          whether through academic or practical paths. Children in our care
          complete their primary and secondary education through Cambodia&#39;s
          public school system.
        </p>
        <p className="text-xl sm:text-lg text-start">
          After graduation, some students pursue university, while others are
          empowered to continue their education through vocational or skills
          training. These programs provide a pathway to employment, financial
          independence, and a meaningful future.
        </p>
      </div>

      {/* Main Content with Image and Text */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left - Image */}
        <div className="relative w-full lg:w-1/2 flex-shrink-0">
          <div className="aspect-square w-full max-w-[400px] mx-auto group">
            <div className="relative w-full h-full overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 rounded-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md z-10 border-4 border-white/20 group-hover:border-[#43A047] transition" />
              <Image
                src="/skill.jpg"
                alt="Vocational Training Program"
                fill
                className="object-cover z-20 relative"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right - Text */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#43A047] leading-tight">
            Practical Skills That Build Futures
          </h2>

          <p className="text-lg text-gray-700">
            Through partnerships with trusted institutions, our young adults
            receive professional training in high-demand fields such as:
          </p>

          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 font-semibold">
            <li>Hospitality management</li>
            <li>Cooking and culinary arts</li>
            <li>Car and motorcycle mechanics</li>
            <li>Beauty and wellness services</li>
            <li>Electrical and construction work</li>
          </ul>

          <p className="text-lg text-gray-700">
            These programs equip students with the practical skills they need to
            secure stable employment, live independently, and build lives of
            dignity and purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
