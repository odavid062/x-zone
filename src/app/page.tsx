import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import GuestsSection from "@/components/sections/GuestsSection";
import TicketsSection from "@/components/sections/TicketsSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import FAQSection from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ScheduleSection />
        <GuestsSection />
        <TicketsSection />
        <SponsorsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
