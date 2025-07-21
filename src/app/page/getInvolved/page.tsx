import Hero from "@/components/ui/getinvoled/hero"
import AboutSection from "@/components/ui/getinvoled/about-section"
// import ImageGallery from "@/components/ui/getinvoled/image-gallery"
import SponsorSection from "@/components/ui/getinvoled/sponsor-section"
import CoinsForKids from "@/components/ui/getinvoled/coints-for-kids"
import PartnerSection from "@/components/ui/getinvoled/partner-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
      {/* <ImageGallery /> */}
      <SponsorSection />
      <CoinsForKids />
      <PartnerSection />
    </main>
  )
}


