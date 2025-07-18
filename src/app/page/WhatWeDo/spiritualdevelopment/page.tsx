"use client";

import Image from "next/image";

export default function SpiritualDevelopment() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20">
      {/* Main Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#43A047]">Spiritual Development</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Empowering children through faith, leadership, and community.
        </p>
      </div>

      {/* Section 1: Faith and Leadership */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold text-[#43A047]">
            Faith and Leadership in Our Children&#39;s Homes
          </h2>
          <p className="text-lg text-gray-700">
            In each of our children&#39;s homes, there is a special place for spiritual growth — 
            a small church led by a house father who has either graduated from Bible school 
            or is deeply mature in spirit. Every Sunday, the children dress neatly and gather 
            with excitement for the weekly church service. It&#39;s a joyful and meaningful time 
            where they sing, learn, and grow in their faith together.
          </p>
          <p className="text-lg text-gray-700">
            In our Phnom Penh home, the spiritual journey continues every day. Each night, 
            roommates gather for devotions, sharing scripture, prayer, and reflection. This 
            nightly practice strengthens not only their individual faith but also their sense 
            of family and unity. On Fridays, the entire church family comes together for a 
            special evening service — a time to worship, encourage one another, and deepen 
            their connection with God as a community.
          </p>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/spiritual.jpg"
              alt="Children Worship Service"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Section 2: YES Project */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/yesproject.jpg"
              alt="Youth Empowerment Project"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold text-[#43A047]">
             Youth Empowerment Services (YES Project)
          </h2>
          <p className="text-lg text-gray-700">
            To cultivate young leaders within our homes, we launched the Youth Empowerment 
            Services (YES Project) — an initiative supported by the Southeast Asia Prayer Center. 
            This program is designed to inspire growth, leadership, and service, empowering young 
            people to make a lasting impact in their homes and communities.
          </p>
          <p className="text-lg text-gray-700">
            Led by our team leader, Mr. Sensophea, the YES Project identifies two older children 
            from each of our 16 homes. These youth are carefully trained either in the early 
            morning or evening, using trusted Bible study materials provided by our respected partners.
          </p>
          <p className="text-lg text-gray-700">
            Before stepping into leadership, each youth is prepared both mentally and spiritually. 
            We believe that building a strong foundation in faith and character is essential for 
            their journey ahead — not just as teachers, but as future changemakers.
          </p>
        </div>
      </div>
    </section>
  );
}
