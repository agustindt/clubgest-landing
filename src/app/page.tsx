import Hero from "@/components/Hero"
import Features from "@/components/Features"           // tus tarjetas
import FeatureSections from "@/components/FeatureSections" // las secciones por feature (con IDs)
import Pricing from "@/components/Pricing"
import CTA from "@/components/CTA"
import FAQ from "@/components/FAQ"
import FirstQuarterSection from "@/components/FirstQuarterSection"

export default function Home() {
  return (
    <>
      <main className="bg-primary">
        <Hero />
        <Features />
        <FeatureSections />
        <FirstQuarterSection />
        <Pricing />
        <CTA />
        <FAQ />
      </main>
    </>
  )
}
