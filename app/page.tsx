import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Services from "@/components/sections/Services";
import Reviews from "@/components/sections/Reviews";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Booking from "@/components/sections/Booking";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <BeforeAfter />
      <Services />
      <FinalCTA />
      <Reviews />
      <Gallery />
      <FAQ />
      <Booking />
      <Contact />
    </>
  );
}
