import Image from "next/image"

export default function Vision() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-green-500 text-center mb-8">Vision and Mission</h1>

      <p className="text-center max-w-4xl mx-auto mb-8">
        New Hope for Orphans is a dedicated Christian organization committed to caring for, educating, and integrating
        orphaned children in Cambodia into Khmer society. At NHO, we believe that every child is unique, gifted, and
        full of untapped potential waiting to be nurtured.
      </p>

      <div className="flex justify-center mb-8">
        <Image
          src="/nho.jpg"
          alt="Vision and Mission Compass"
          width={500}
          height={300}
          className="rounded-md"
        />
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <p>
          Our mission is to{" "}
          <span className="text-green-600 font-medium">raise and empower a new generation in Cambodia</span> by
          providing them with{" "}
          <span className="text-green-600 font-medium">love, care, and a strong foundation in faith</span>. Through the
          word of God, we guide them to become{" "}
          <span className="text-green-600 font-medium">
            confident individuals and positive role models for the next generation
          </span>
          .
        </p>

        <p>
          As our vision expands, so do our responsibilities. Currently, we provide care for{" "}
          <span className="text-green-600 font-medium">over 500 children</span> across{" "}
          <span className="text-green-600 font-medium">16 orphanages</span>, also known as children&apos;s homes. While many
          children are already under our care,{" "}
          <span className="text-green-600 font-medium">countless others still need support</span>, we invite you to{" "}
          <span className="text-green-600 font-medium">join us in prayer and action</span> to make a difference in their
          lives.
        </p>

        <p>
          For over <span className="text-green-600 font-medium">15 years</span>, NHO has been a{" "}
          <span className="text-green-600 font-medium">place of refuge</span>, offering children{" "}
          <span className="text-green-600 font-medium">
            safe shelter, nutritious meals, quality education, medical assistance, counselling, dental care, and
            physical therapy
          </span>
          . More importantly, we focus on their{" "}
          <span className="text-green-600 font-medium">faith through biblical teachings</span>.
        </p>

        <p>
          Our ministry is dedicated to{" "}
          <span className="text-green-600 font-medium">
            improving children&apos;s living conditions, providing for their basic needs, and helping them realize their
            dreams
          </span>
          . Today, many of our <span className="text-green-600 font-medium">young adults, aged 18</span> and above, are
          continuing their{" "}
          <span className="text-green-600 font-medium">education at universities or vocational training</span> centers.
          Others have found{" "}
          <span className="text-green-600 font-medium">employment in businesses, NGOs, and even leadership roles</span>{" "}
          within our organization.
        </p>

        <p>
          At <span className="text-green-600 font-medium">NHO</span>, we are committed to{" "}
          <span className="text-green-600 font-medium">transforming lives</span> one child at a time offering{" "}
          <span className="text-green-600 font-medium">hope, love, and a future filled with promise</span>.
        </p>
      </div>
    </div>
  )
}
