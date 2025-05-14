"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [showMore, setShowMore] = useState(false);

  const skillCategories = [
    {
      title: "Photography & Videography",
      description: "Capture powerful moments and tell meaningful stories",
    },
    {
      title: "Art & creative projects",
      description: "Express, inspire, and bring ideas to life",
    },
    {
      title: "Human resources",
      description: "Support and connect volunteers to make a greater impact",
    },
    {
      title: "Construction & maintenance",
      description: "Build, repair, and create lasting change",
    },
    {
      title: "IT & graphic design",
      description: "Use technology and creativity to drive impact",
    },
    {
      title: "Gardening & landscaping",
      description: "Green spaces for a healthier environment",
    },
    {
      title: "Media & marketing",
      description: "Share stories, raise awareness, and inspire action",
    },
    {
      title: "Art & creative projects",
      description: "Express, inspire, and bring ideas to life",
    },
    {
      title: "Construction & maintenance",
      description: "Build, repair, and create lasting change",
    },
    {
      title: " Gardening & landscaping",
      description: "Green spaces for a healthier environment",
    },
  ];

  return (
    <main className="bg-white">
      <div className="text-center py-10">
        <h1 className="text-[40px] font-bold text-green-700">GET INVOLVED</h1>
      </div>

      {/* sponsor and volunterr card */}
      <div className="bg-amber-50 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="bg-white shadow-md">
            <div className="bg-green-600 h-3"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Sponsor
              </h2>
              <p className="text-gray-700">
                For USD 100 per month, which goes toward clothing, food,
                shelter, first aid, education, and more. You will receive photos
                and emails regularly from your sponsored child, and be able to
                exchange the information with the children.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md">
            <div className="bg-green-600 h-3"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Volunteer
              </h2>
              <p className="text-gray-700">
                Join New Hope for Orphans and Make a Difference. New Hope for
                Orphans is a well-established organization dedicated to
                providing Cambodian children and young people with access to
                quality education. Our volunteer program offers a meaningful
                opportunity to contribute, whether you have specialized skills
                or simply a passion for helping others.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* image and text section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 items-start">
          <div className="flex flex-col items-center justify-center relative">
            <div
              className={`w-full transition-all duration-500 ease-in-out ${
                showMore ? "h-[400px]" : "h-[300px]"
              } overflow-hidden rounded`}
            >
              <img
                src="/getinvoled.png"
                alt="Happy kids"
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <div
              className={`transition-all duration-500 ease-in-out ${
                showMore ? "mt-4" : "mt-14"
              }`}
            >
              <h2 className="text-green-700 font-bold text-2xl mb-8">
                YOU'RE THE HOPE OF OTHERS
              </h2>

              <p className="text-gray-700 mb-8">
                New Hope for Orphans fundraisers are amazing, generous people
                who raise money to provide a better future for thousands of
                Cambodian children and their families. There are so many
                creative ways to raise money for NHO. SEAPC runs a program
                called Coins for Kids that allows you to
              </p>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showMore ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">
                  donate your little leftover coins and change from daily
                  expenses, all for projects for the kids! Many people ask for
                  donations for their birthday or ask their friends and family
                  to sponsor them in a challenge that they can take part in to
                  bless the kids. Lending a helping hand is easier than you
                  think. This guide will give you some fundraising ideas to
                  support NHO simply and on your own!
                </p>
              </div>

              <div
                className="flex items-center text-green-700 cursor-pointer hover:underline mt-2 w-fit"
                onClick={() => setShowMore(!showMore)}
              >
                <span>{showMore ? "Show less" : "See more"}</span>
                {showMore ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Become Volunteer */}
      <div className="bg-white border-t border-green-600 py-8 px-4  text-center">
        <h2 className="text-[40px] font-bold  text-green-700 mb-4">
          BECOME VOLUNTEER
        </h2>
        <p className="max-w-3xl mx-auto text-gray-800 ">
          Join New Hope for Orphans and Make a Difference
          <br />
          New Hope for Orphans is a well-established organization dedicated to
          providing Cambodian children and young people with access to quality
          education. Our volunteer program offers a meaningful opportunity to
          contribute, whether you have specialized skills or simply a passion
          for helping others.
        </p>
        <p className="max-w-3xl mx-auto text-gray-700">
          We welcome volunteers of all ages and backgrounds, including
          individuals, couples, and families (children under 18 must be
          accompanied by a guardian).
        </p>
      </div>

      {/* Specialized skills we need section */}
      <div className="bg-white border-t border-green-600 py-8 px-4 text-center">
        <h2 className="text-[40px] font-bold text-green-700 mb-4">
          SPECIALIZED SKILLS WE NEED
        </h2>
        <p className="max-w-3xl mx-auto text-gray-800 mb-12">
          In addition to classroom support, we periodically seek experts in
          various fields, including
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-green-50 transition-all duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How you can help Section */}
      <div className="bg-white border-t border-green-600 py-8 px-4 text-center">
        <h2 className="text-[40px] font-bold mb-4 text-green-700">
          HOW YOU CAN HELP
        </h2>

        <p className="max-w-4xl mx-auto text-gray-800 mb-8 text-xl">
          If you have expertise in any of these areas or believe you can
          contribute in another way, we would love to hear from you!
        </p>

        <p className="max-w-4xl mx-auto  text-left text-gray-800 mb-12 text-xl leading-loose">
          Assist our English teachers in the classroom <br />
          Support general maintenance and infrastructure projects as needed{" "}
          <br />
          Contact us at:{" "}
          <a
            href="mailto:contact@nhocambodia.org"
            className="underline text-green-700 hover:text-green-600"
          >
            contact@nhocambodia.org
          </a>
        </p>
      </div>
    </main>
  );
}
