import LastNew from "@/app/component/LastNew";
import PartnersSection from "@/app/component/Partners";
import AboutUsSection from "@/app/component/AboutSection";
import WhatWeDoSection from "@/app/component/WhatWeDoSection";
import HeroSlider from "@/app/component/slide";
import MeetOurTeam from "@/app/component/MeetingOutTeam";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <HeroSlider />

      <WhatWeDoSection />

      <AboutUsSection />

      <PartnersSection />

      <LastNew />

      <MeetOurTeam />
    </div>
  );
}
