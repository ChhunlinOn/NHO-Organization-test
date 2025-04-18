import NavigationMenu from "@/app/component/Menu"
import Footer from "@/app/component/Footer"
import LastNew from "@/app/component/LastNew"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationMenu />

      {/* Hero Section
      <section className="relative">
        <div className="relative w-full h-[500px]">
          <Image src="/hero-image.jpg" alt="Children smiling" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              WORK TOGETHER FOR
              <br />
              BETTER FUTURE OF CHILDREN
            </h1>
            <p className="text-lg md:text-xl mb-6">SPONSOR A CHILD TODAY</p>
            <div>
              <Link
                href="/sponsor"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md transition-colors"
              >
                SPONSOR NOW
              </Link>
            </div>
          </div>
        </div> */}

        {/* Dots Navigation
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button className="w-3 h-3 rounded-full bg-white"></button>
          <button className="w-3 h-3 rounded-full bg-white/50"></button>
          <button className="w-3 h-3 rounded-full bg-white/50"></button>
        </div>
      </section> */}

      {/* What We Do Section
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">WHAT WE DO?</h2>
        <p className="text-center max-w-4xl mx-auto mb-12">
          New Hope for Orphans organization operates 16 provinces across 25 cities and provinces in Cambodia. We are
          committed to improving, not abandoning, residential orphan care. Rather of Cambodia, New Hope for Orphans
          gives them the Christ-based nurturing and pathways to success with educational programs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
              <Image
                src="/spiritual-development.jpg"
                alt="Spiritual Development"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-center">Spiritual Development</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
              <Image
                src="/university-sponsorship.jpg"
                alt="University Sponsorship"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-center">University Sponsorship</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
              <Image
                src="/vocational-training.jpg"
                alt="Skills/Vocational Training"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-center">Skills/Vocational Training</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
              <Image
                src="/kids-camp.jpg"
                alt="Kid's Camp"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-center">Kid&#39;s Camp </h3>
          </div>
        </div>
      </section> */}

      {/* About Us Section
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-12">About Us</h2>

        <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-8">
          <div className="md:w-1/2">
            <Image
              src="/vision-mission.jpg"
              alt="Vision & Mission"
              width={500}
              height={300}
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold mb-4">
            &#34;sI want to do it right! I encourage the improvement. Defend the cause of the fatherless. Plead the case of
              the widow.&#34;s
            </h3>
            <p className="mb-4">
              New Hope for Orphans (NHO) is a registered NGO in Cambodia, caring for orphaned and disadvantaged children
              since 1998. With 16 children&#39;s homes and a situated Center in Phnom Penh, NHO supports 578 children and
              youths. It has operated over 450 children and all graduated in education and would be the future leaders
              of Cambodia. NHO is committed to providing a safe and brighter future.
            </p>
          </div>
        </div>
      </section> */}

      {/* Our Partners Section
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">OUR PARTNERS</h2>
        <p className="text-center max-w-4xl mx-auto mb-12">
          Our organization is proud to partner with these amazing organizations. We have partnered with them for many
          long-term periods. They want to be with us forever. Thank you for your kind generosity to support our children
          and encourage for improvement.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="border p-4 flex items-center justify-center h-24">
            <Image src="/partner-seapc.png" alt="SEAPC" width={120} height={60} className="max-h-full" />
          </div>
          <div className="border p-4 flex items-center justify-center h-24">
            <Image src="/partner-cbt.png" alt="CBT" width={120} height={60} className="max-h-full" />
          </div>
          <div className="border p-4 flex items-center justify-center h-24">
            <Image src="/partner-worldrace.png" alt="WorldRace" width={120} height={60} className="max-h-full" />
          </div>
          <div className="border p-4 flex items-center justify-center h-24">
            <Image src="/partner-spero.png" alt="Spero Worldwide" width={120} height={60} className="max-h-full" />
          </div>
        </div>
      </section> */}

      {/* Latest News Section */}
      
      < LastNew />
    
      < Footer />
    
    </div>
  )
}
