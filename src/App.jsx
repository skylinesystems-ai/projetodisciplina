import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header.jsx";
import IntroScreen from "@/components/IntroScreen.jsx";
import Hero from "@/components/Hero.jsx";
import UniverseMap from "@/components/UniverseMap.jsx";
import TrainingCore from "@/components/TrainingCore.jsx";
import ForgeMarket from "@/components/ForgeMarket.jsx";
import KnowledgeVault from "@/components/KnowledgeVault.jsx";
import DisciplineLab from "@/components/DisciplineLab.jsx";
import AICoach from "@/components/AICoach.jsx";
import Affiliates from "@/components/Affiliates.jsx";
import Community from "@/components/Community.jsx";
import Footer from "@/components/Footer.jsx";

function App() {
  const [introOpen, setIntroOpen] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("intro-locked", introOpen);
    return () => document.body.classList.remove("intro-locked");
  }, [introOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-abyss text-white">
      <div className="nexus-background" aria-hidden="true" />
      <div className="hud-grid" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true" />

      <AnimatePresence>{introOpen && <IntroScreen onEnter={() => setIntroOpen(false)} />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introOpen ? 0.25 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <Header />
        <main>
          <Hero />
          <UniverseMap />
          <TrainingCore />
          <ForgeMarket />
          <KnowledgeVault />
          <DisciplineLab />
          <AICoach />
          <Affiliates />
          <Community />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
