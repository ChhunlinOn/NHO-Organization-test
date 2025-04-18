import Image from "next/image"
import Link from "next/link"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl md:text-6xl font-bold text-green-500 mb-12 text-center">About Us</h1>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/2">
          <Image
            src="/nho.jpg"
            alt="Children playing in water"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-medium italic mb-4">
          `&quot;`Learn to do right! Seek justice, encourage the oppressed. Defend the cause of the fatherless, plead the
            case of the widow,`&quot;`
            <span className="text-green-600 block mt-1">-Isaiah 1:17</span> 
          </h3>
          <p className="text-gray-700">
            <span className="font-semibold text-green-600">New Hope for Orphan (NHO)</span> is a registered
            non-government organization (NHO) in Cambodia, officially recognized by the Ministry of Interior and Social
            Affairs. Since its establishment in <span className="text-green-600">1999</span>, NHO has been dedicated to
            caring for orphan, abandoned, and impoverished children.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-200 rounded-full mb-4"></div>
          <Link href="#" className="font-semibold text-lg underline">
            Mission & Vision
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-200 rounded-full mb-4"></div>
          <Link href="#" className="font-semibold text-lg underline">
            Founder Message
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-200 rounded-full mb-4"></div>
          <Link href="#" className="font-semibold text-lg underline">
            House parent profile
          </Link>
        </div>
      </div>
    </div>
  )
}
