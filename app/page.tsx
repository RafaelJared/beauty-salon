import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import About from "@/components/sections/About";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Reviews />
      <Booking />
      <Contact />
    </>
  );
}
