import Loader from "./components/Loader";
import EmergencyBar from "./components/EmergencyBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EmergencySection from "./components/EmergencySection";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import About from "./components/About";
import Process from "./components/Process";
import QuoteSection from "./components/QuoteSection";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import ElevatorProgress from "./components/ElevatorProgress";

export default function App() {
  return (
    <>
      <Loader />

      {/* Lien d'évitement */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-xl focus:bg-navy focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Aller au contenu principal
      </a>

      <EmergencyBar />
      <Navbar />

      <main id="contenu">
        <Hero />
        <EmergencySection />
        <Services />
        <WhyUs />
        <About />
        <Process />
        <QuoteSection />
        <Testimonials />
        <Faq />
        <ContactSection />
      </main>

      <Footer />
      <ElevatorProgress />
      <FloatingButtons />
    </>
  );
}
