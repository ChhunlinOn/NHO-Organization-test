"use client"
import Image from "next/image"

export default function PartnersSection() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl font-bold text-[#43A047] text-center mb-6">OUR PARTNERS</h2>
      <p className="text-center max-w-4xl mx-auto mb-12 text-black">
        Our organization is getting bigger. Therefore, we are unable to fund all the programs on our own. We have
        partnership with our dear friend for very long time and many more years to go. We are thankful toward their kind
        and generosity to support us in finance and knowledge&#39;s for improvement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto "> 
        {partners.map((partner, index) => (
          <div
            key={index}
            className=" p-6 rounded-lg flex items-center justify-center h-40  "
            style={{
                boxShadow: "0 10px 20px rgba(74, 222, 128, 0.3)",
                border: "1px solid rgba(74, 222, 128, 0.2)",
              }}
          >
            <Image
              src={partner.logo || "/placeholder.svg"}
              alt={partner.name}
              width={150}
              height={75}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

const partners = [
  {
    name: "SEAPC",
    logo: "/Partner1.png",
  },
  {
    name: "CBT",
    logo: "/partner2.jpg",
  },
  {
    name: "WorldRace",
    logo: "/partner3.jpg",
  },
  {
    name: "Spero Worldwide",
    logo: "/partner4.jpg",
  },
]
