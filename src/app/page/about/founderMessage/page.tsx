"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import HeroSlider from "@/app/component/slide";
import FadeInWhenVisible from "@/app/component/FadeInWhenVisible";

type SectionKey = "section1" | "section2" | "section3";

const allSlides: Record<SectionKey, { image: string }[]> = {
  section1: [
    { image: "/nho.jpg" },
    { image: "/girl.jpg" },
    { image: "/family.jpg" },
  ],
  section2: [
    { image: "/partner3.jpg" },
    { image: "/Partner1.png" },
    { image: "/kide.jpg" },
  ],
  section3: [
    { image: "/family.jpg" },
    { image: "/partner3.jpg" },
    { image: "/nho.jpg" },
  ],
};

export default function FounderMessage() {
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({
    section1: false,
    section2: false,
    section3: false,
  });

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [indexes, setIndexes] = useState<Record<SectionKey, number>>({
    section1: 0,
    section2: 0,
    section3: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexes((prev) => ({
        section1: (prev.section1 + 1) % allSlides.section1.length,
        section2: (prev.section2 + 1) % allSlides.section2.length,
        section3: (prev.section3 + 1) % allSlides.section3.length,
      }));
    }, 4000); // Slide every 4 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="bg-white">
      <HeroSlider />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-[#43A047] mb-8">
          Founder Message
        </h1>

        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="text-xl font-bold sm:text-lg">
            These days, there are many abandoned and orphaned children in
            Cambodia. Most Cambodians live in poverty, constantly struggling to
            survive. A lot of children are abandoned and orphaned simply because
            no one is able or willing to take care of them.
          </p>
        </div>
        <FadeInWhenVisible>
          {/* First Section - Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16 ">
            <div className="w-full md:w-1/2">
              <div className="relative md:w-[500px] h-[292px]  rounded-[40px] overflow-hidden">
                <Image
                  src={
                    allSlides.section1[indexes.section1].image ||
                    "/placeholder.svg"
                  }
                  alt="Image"
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition" />
              </div>
            </div>
            <div className="w-full md:w-1/2 leading-relaxed">
              <p className="text-xl font-bold mb-4 text-[#43A047]">
                Bringing Hope to Cambodia&#39;s Children
              </p>
              <div className="text-base">
                <p>
                  Cambodia&#39;s children face immense hardships every day. Many
                  families live below the poverty line, forcing parents to seek
                  work abroad to support their loved ones. Tragically, some
                  never return, leaving their children in the care of elderly
                  grandparents or relatives who can no longer provide for them.
                  As a result, countless children are forced into child labor
                  girls work as maids, while boys beg for money, raise animals,
                  or collect recyclables just to survive.
                </p>
                {expandedSections.section1 && (
                  <div className="text-base">
                    <p className="mt-[12px]">
                      Another challenge is the lack of education on family
                      planning. Many Cambodians marry young and struggle to
                      support their children financially and emotionally. Some
                      parents, overwhelmed by their circumstances, abandon their
                      newborns at hospitals or pagodas.
                    </p>
                    <p className="mt-[12px]">
                      Others, suffering from terminal illnesses such as HIV,
                      cancer, or heart disease, pass away, leaving their
                      children vulnerable to child labor, human trafficking, and
                      other forms of exploitation.
                    </p>

                    <p className="mt-[12px]">
                      Cambodia still bears the scars of past wars. Landmines
                      left behind continue to injure and kill innocent people,
                      further deepening the struggles of already vulnerable
                      communities. These children are in desperate need of help,
                      love, and hope for a better future.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleSection("section1")}
                className="text-[#43A047] flex items-center hover:underline mt-2 cursor-pointer"
              >
                Show {expandedSections.section1 ? "less" : "more"}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform  ${
                    expandedSections.section1 ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          {/* Second Section - Text Left, Image Right */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-28 mb-16">
            <div className="w-full md:w-1/2 ">
              <div className="relative md:w-[500px] h-[292px]  rounded-[40px] overflow-hidden">
                <Image
                  src={
                    allSlides.section2[indexes.section2].image ||
                    "/placeholder.svg"
                  }
                  alt="Image"
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition" />
              </div>
            </div>
            <div className="w-full md:w-2/3 leading-relaxed ">
              <p className="text-xl font-bold mb-4 text-[#43A047]">
                Answering God&#39;s Call
              </p>
              <div className="">
                <p>
                  In 1999, God placed a deep calling on my heart to care for
                  vulnerable children. That calling led to the birth of{" "}
                  <span className="text-green-600 font-bold">
                    {" "}
                    New Hope of Orphans{" "}
                  </span>
                  —a place where children could find not just shelter, but love,
                  hope, and the life-changing message of Christ.
                  <p className="mt-[12px]">
                    No matter how broken their past, every child who walks
                    through our doors discovers that they have a future—one
                    filled with purpose, faith, and the assurance that God cares
                    for them.
                  </p>
                </p>
                {expandedSections.section2 && (
                  <p className="mb-2 text-base">
                    Today, we are known as
                    <span className="text-green-600 font-bold">
                      {" "}
                      New Hope Children&#39;s Homes{" "}
                    </span>
                    ,because we believe these children are no longer
                    orphans—they have a Heavenly Father who loves them and calls
                    them His own.
                    <p className="mt-[12px]">
                      By God&#39;s grace, we now care for approximately <br />
                      <span className="text-green-600 font-bold">
                        {" "}
                        500 children across 16 locations{" "}
                      </span>
                      . Yet our vision reaches far beyond. We dream of welcoming
                      <span className="text-green-600 font-bold">
                        {" "}
                        1,000 children{" "}
                      </span>
                      into loving homes, with at least one children&#39;s home
                      in every province of Cambodia.
                    </p>
                    <p className="mt-[12px]">
                      However, financial constraints slow our progress. Still,
                      our hearts remain steadfast in this mission, trusting that
                      God will provide the means to see this vision fulfilled.
                      Every child deserves to know they are loved, valued, and
                      never forgotten.
                    </p>
                  </p>
                )}
              </div>

              <button
                onClick={() => toggleSection("section2")}
                className="text-[#43A047] flex items-center hover:underline mt-2 cursor-pointer"
              >
                Show {expandedSections.section2 ? "less" : "more"}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    expandedSections.section2 ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          {/* Third Section - Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="w-full md:w-1/2">
              <div className="relative md:w-[500px] h-[292px]  rounded-[40px] overflow-hidden">
                <Image
                  src={
                    allSlides.section3[indexes.section3].image ||
                    "/placeholder.svg"
                  }
                  alt="Image"
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition" />
              </div>
            </div>
            <div className="w-full md:w-1/2 leading-relaxed">
              <p className="text-xl font-bold mb-4 text-[#43A047]">
                How You Can Help
              </p>

              <div className="mb-2 text-base">
                <p>
                  At New Hope Children&#39;s Homes, we believe every child
                  deserves a safe place to belong, a future filled with hope,
                  and the joy of knowing they are loved by God. But we cannot do
                  this alone—we need you.
                </p>
                {expandedSections.section3 && (
                  <div className="mb-2 text-base">
                    <p className="mt-[12px]">
                      Your prayers, generosity, and voice can make a lasting
                      difference. By standing with us, you help rescue
                      vulnerable children, provide them with shelter and
                      education, and raise them in the love of Christ.{" "}
                    </p>

                    <p className="mt-[12px]">
                      If God has placed this mission on your heart, we would be
                      honored to partner with you. Every gift, no matter the
                      size, is a seed of hope—changing lives and shaping
                      futures.
                    </p>
                    <p className="mt-[12px]">
                      Together, we can glorify God and ensure that every child
                      knows they are loved, valued, and created for a divine
                      purpose.
                    </p>

                    <p className="mt-[12px]">
                      <span className="text-green-600 font-bold">
                        {" "}
                        Let&#39;s bring hope, one child at a time.{" "}
                      </span>{" "}
                      <br />
                      [Contact us today to learn more or get involved.]
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => toggleSection("section3")}
                className="text-[#43A047] flex items-center hover:underline mt-2 cursor-pointer"
              >
                Show {expandedSections.section3 ? "less" : "more"}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    expandedSections.section3 ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
