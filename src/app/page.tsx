import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhatYouGetSection } from "@/components/landing/WhatYouGetSection";
import { ClosingCtaSection, LandingFooter } from "@/components/landing/ClosingCtaSection";

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main className="w-full pt-20 flex-1">
        <HeroSection />
        <HowItWorksSection />
        <WhatYouGetSection />
        <ClosingCtaSection />
      </main>
      <LandingFooter />
    </>
  );
}