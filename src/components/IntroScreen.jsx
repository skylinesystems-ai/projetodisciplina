import { motion } from "framer-motion";
import { Power, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/index.js";

const bootLines = [
  "INICIANDO SISTEMA...",
  "CONECTANDO AO NEXUS...",
  "USUÁRIO DETECTADO...",
  "BEM-VINDO À FORJA.",
];

function IntroScreen({ onEnter }) {
  return (
    <motion.section
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      aria-label="Tela de abertura cinematográfica"
    >
      <div className="intro-orbit" aria-hidden="true" />
      <div className="intro-radar" aria-hidden="true" />
      <div className="intro-scan" aria-hidden="true" />

      <motion.div
        className="relative z-10 w-full max-w-3xl text-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full border border-cyan-300/35 bg-cyan-300/10 shadow-cyan">
          <ShieldCheck className="h-9 w-9 text-forge-cyan" />
        </div>

        <div className="mx-auto grid max-w-xl gap-3 text-left font-display text-lg font-bold uppercase sm:text-2xl">
          {bootLines.map((line, index) => (
            <motion.p
              key={line}
              className="type-line"
              style={{
                "--chars": line.length,
                animationDelay: `${index * 0.78}s, ${index * 0.78}s`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.78, duration: 0.1 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-10 flex justify-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button type="button" onClick={onEnter}>
            <Power className="h-5 w-5" />
            Entrar no Universo
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default IntroScreen;
