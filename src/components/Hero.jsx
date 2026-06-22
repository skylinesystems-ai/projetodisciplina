import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { Badge, Button } from "@/components/ui/index.js";

function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div
        className="absolute inset-x-0 top-24 mx-auto h-[620px] max-w-5xl rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        className="portal-stage portal-stage-hero"
        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        transition={{ delay: 0.25, duration: 1.1, ease: "easeOut" }}
        aria-hidden="true"
      >
        <div className="portal-ring portal-ring-one" />
        <div className="portal-ring portal-ring-two" />
        <div className="portal-ring portal-ring-three" />
        <div className="portal-core">
          <ShieldCheck className="h-14 w-14 text-white" />
        </div>
        <div className="portal-beam" />
      </motion.div>

      <div className="mx-auto flex min-h-[calc(92vh-10rem)] max-w-7xl flex-col items-center justify-center gap-7 text-center">
        <motion.div
          className="relative z-10 max-w-5xl"
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Badge tone="green" className="mx-auto mb-6">
            <Zap className="h-4 w-4" />
            Sistema fitness digital ativo
          </Badge>
          <h1 className="font-display text-5xl font-black uppercase leading-none text-white sm:text-6xl lg:text-8xl">
            THE FORGE <span className="text-gradient">// NEXUS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">
            O universo digital para forjar corpo, mente e disciplina.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as="a" href="#training" size="lg">
              <Dumbbell className="h-5 w-5" />
              Explorar Treinos
            </Button>
            <Button as="a" href="#community" size="lg" variant="secondary">
              <MessageCircle className="h-5 w-5" />
              Entrar na Comunidade
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 grid w-full max-w-4xl grid-cols-3 gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          {[
            ["Protocolos", "72+"],
            ["Membros ativos", "9.8k"],
            ["Precisão Nexus", "98%"],
          ].map(([label, value]) => (
            <div key={label} className="hud-stat">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </motion.div>

        <a
          href="#universe"
          className="group absolute bottom-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70"
        >
          Sinalizar próximo módulo
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

export default Hero;
