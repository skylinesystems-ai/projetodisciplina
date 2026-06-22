import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeDollarSign, BarChart3, CheckCircle2, Copy, Link, Share2 } from "lucide-react";
import { brandConfig } from "@/config/brand.js";
import { Button, Card, IconTile, Section } from "@/components/ui/index.js";
import { useToast } from "@/hooks/useToast.js";

const steps = [
  { title: "Compartilhe seu link", icon: Share2 },
  { title: "Ganhe por indicação", icon: BadgeDollarSign },
  { title: "Acompanhe cliques, vendas e comissões", icon: BarChart3 },
];

function Affiliates() {
  const [copied, setCopied] = useState(false);
  const { notify } = useToast();
  const referral = brandConfig.referralExample;

  const copyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referral);
      setCopied(true);
      notify({
        title: "Link copiado",
        description: "O código de afiliado está pronto para envio.",
        type: "success",
      });
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      notify({
        title: "Clipboard bloqueado",
        description: "Copie manualmente o link do card de afiliados.",
        type: "error",
      });
    }
  };

  return (
    <Section
      id="affiliates"
      eyebrow="Programa de afiliados"
      title="Expanda a forja"
      description="Uma camada de crescimento com link pessoal, leitura de performance e comissão simulada."
    >
      <div className="mt-12 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          className="grid gap-4"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="affiliate-step">
                <IconTile>
                  <Icon className="h-6 w-6" />
                </IconTile>
                <div>
                  <strong className="font-display text-xl uppercase text-white">{step.title}</strong>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {index === 0 && "Envie para alunos, amigos e grupos com uma assinatura rastreável."}
                    {index === 1 && "Cada entrada pode virar comissão e status dentro da rede."}
                    {index === 2 && "Visualize atividade em um painel claro para tomada de decisão."}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <Card as={motion.div} className="p-6 sm:p-8" delay={0.05}>
          <div className="flex items-center gap-3">
            <IconTile>
              <Link className="h-6 w-6" />
            </IconTile>
            <div>
              <p className="section-kicker">Link rastreável</p>
              <h3 className="mt-2 font-display text-2xl font-black uppercase text-white">
                Portal de indicação
              </h3>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4 font-display text-lg font-black text-forge-cyan sm:text-2xl">
            {referral}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["Cliques", "1.248"],
              ["Vendas", "86"],
              ["Comissões", "R$ 4.920"],
            ].map(([label, value]) => (
              <div key={label} className="mini-stat">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button type="button" className="flex-1" onClick={copyReferral}>
              {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? "Link copiado" : "Copiar link"}
            </Button>
            <Button as="a" href="#community" variant="secondary" className="flex-1">
              Entrar para Afiliados
            </Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}

export default Affiliates;
