import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import SystemScrollStory from "@/components/SystemScrollStory";
import Method from "@/components/Method";
import Teaser from "@/components/Teaser";
import Footer from "@/components/Footer";
import LuminousOrb from "@/components/LuminousOrb";
import WarpBackground from "@/components/WarpBackground";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen relative">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 -z-50">
        <WarpBackground />
      </div>

      <LuminousOrb />
      <div id="hero-section"><Hero /></div>
      <div id="problem-section"><Problem /></div>
      <SystemScrollStory />
      <Method />
      <Teaser />
      <Footer />
    </main>
  );
}
