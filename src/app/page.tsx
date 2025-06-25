import LastNew from "@/app/component/LastNew"
import PartnersSection from "@/app/component/Partners"
import AboutUsSection from "@/app/component/AboutSection"
import WhatWeDoSection from "@/app/component/WhatWeDoSection"
import HeroSlider from "@/app/component/slide"
import FadeInWhenVisible from "@/app/component/FadeInWhenVisible"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">

      <HeroSlider/>

      <FadeInWhenVisible>
        <WhatWeDoSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <AboutUsSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <PartnersSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <LastNew />
      </FadeInWhenVisible>
    </div>
      )
}
