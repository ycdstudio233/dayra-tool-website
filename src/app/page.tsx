import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Workflows from "@/components/Workflows";
import HowItWorks from "@/components/HowItWorks";
import DownloadSection from "@/components/Download";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Workflows />
        <HowItWorks />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
