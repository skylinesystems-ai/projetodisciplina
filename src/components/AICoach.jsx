import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  CalendarDays,
  CheckCircle2,
  Dumbbell,
  Send,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { Button, Card, IconTile, Section, StatePanel, Tabs } from "@/components/ui/index.js";
import { useToast } from "@/hooks/useToast.js";

const questions = ["Qual seu objetivo?", "Quantos dias você pode treinar?", "Você prefere academia ou casa?"];

const profileTabs = [
  {
    value: "objective",
    label: "Objetivo",
    icon: Target,
    content: (
      <div className="ai-metric">
        <span>Objetivo primário</span>
        <strong>Hipertrofia</strong>
      </div>
    ),
  },
  {
    value: "routine",
    label: "Rotina",
    icon: CalendarDays,
    content: (
      <div className="ai-metric">
        <span>Disponibilidade</span>
        <strong>4 dias</strong>
      </div>
    ),
  },
  {
    value: "environment",
    label: "Ambiente",
    icon: Dumbbell,
    content: (
      <div className="ai-metric">
        <span>Local preferido</span>
        <strong>Academia</strong>
      </div>
    ),
  },
];

function AICoach() {
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { notify } = useToast();

  const generateProtocol = () => {
    setGenerated(false);
    setGenerating(true);

    window.setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      notify({
        title: "Protocolo gerado",
        description: "O Nexus combinou objetivo, rotina e ambiente em uma recomendação inicial.",
        type: "success",
      });
    }, 900);
  };

  return (
    <Section
      id="ai"
      eyebrow="AI Coach"
      title="Central de protocolo inteligente"
      description="Uma experiência visual de chat que simula coleta de objetivo, rotina e ambiente de treino."
    >
      <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card as={motion.div} className="p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-cyan-300/35 bg-cyan-300/10 shadow-cyan">
              <Brain className="h-8 w-8 text-forge-cyan" />
            </div>
            <div>
              <p className="section-kicker">NEXUS AI</p>
              <h3 className="mt-2 font-display text-2xl font-black uppercase text-white">Coach sintético</h3>
            </div>
          </div>

          <div className="mt-8">
            <Tabs items={profileTabs} />
          </div>

          <StatePanel
            className="mt-5"
            state={generating ? "loading" : generated ? "success" : "empty"}
            title={
              generating ? "Calculando protocolo" : generated ? "Protocolo pronto" : "Aguardando ativação"
            }
            description={
              generating
                ? "O Nexus está cruzando objetivo, disponibilidade e ambiente."
                : generated
                  ? "Protocolo personalizado gerado com sucesso."
                  : "Inicie a simulação para receber o primeiro plano operacional."
            }
          />

          <Button type="button" className="mt-8 w-full" onClick={generateProtocol} disabled={generating}>
            <Sparkles className="h-5 w-5" />
            {generating ? "Gerando protocolo..." : "Gerar meu protocolo"}
          </Button>
        </Card>

        <Card as={motion.div} className="chat-panel p-4 sm:p-6" delay={0.05}>
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <IconTile size="sm" tone="green">
                <Bot className="h-5 w-5" />
              </IconTile>
              <div>
                <strong className="block text-sm text-white">FORGE AI</strong>
                <span className="text-xs text-forge-green">online</span>
              </div>
            </div>
            <span className="rounded-lg border border-white/10 bg-white/8 px-3 py-1 text-xs font-bold text-white/64">
              chat fake
            </span>
          </div>

          <div className="grid gap-4">
            {questions.map((question, index) => (
              <motion.div
                key={question}
                className="chat-bubble chat-user"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.45 }}
              >
                <UserRound className="h-4 w-4 shrink-0" />
                <span>{question}</span>
              </motion.div>
            ))}

            <motion.div
              className="chat-bubble chat-ai"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.45 }}
            >
              <Bot className="h-4 w-4 shrink-0" />
              <span>
                {generating
                  ? "Processando protocolo personalizado..."
                  : generated
                    ? "Protocolo personalizado gerado com sucesso."
                    : "Aguardando ativação do gerador Nexus."}
              </span>
              {generated && <CheckCircle2 className="h-4 w-4 shrink-0 text-forge-green" />}
            </motion.div>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/64">
            <span className="flex-1">protocolo://nexus/forge-user</span>
            <Send className="h-4 w-4 text-forge-cyan" />
          </div>
        </Card>
      </div>
    </Section>
  );
}

export default AICoach;
