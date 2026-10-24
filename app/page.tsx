import { IntroVeil } from "@/components/IntroVeil";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { AbstractJourney } from "@/components/AbstractJourney";
import { StorySection } from "@/components/StorySection";
import { PricingSection } from "@/components/PricingSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <IntroVeil />
      <SiteHeader />
      <main><Hero /><AbstractJourney /><StorySection /><PricingSection /></main>
      <SiteFooter />
    </>
  );
}
