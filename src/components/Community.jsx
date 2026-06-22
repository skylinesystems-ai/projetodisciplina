import { motion } from "framer-motion";
import { BarChart3, MessageCircle, ShieldCheck, Trophy, Users, Zap } from "lucide-react";
import { brandConfig } from "@/config/brand.js";
import { Button, Section } from "@/components/ui/index.js";

const communityItems = [
  { title: "Desafios mensais", icon: Zap },
  { title: "Ranking", icon: Trophy },
  { title: "Evolução dos membros", icon: BarChart3 },
  { title: "Suporte", icon: ShieldCheck },
];

function Community() {
  return (
    <Section id="community" className="pb-24">
      <div className="community-band">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Comunidade</p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
            Grupo VIP da forja
          </h2>
          <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
            Um ponto de encontro para desafios, ranking, evolução dos membros e suporte contínuo.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {communityItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="community-tile"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <Icon className="h-7 w-7 text-forge-green" />
                <strong>{item.title}</strong>
              </motion.div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-3 rounded-lg border border-white/12 bg-white/8 px-5 py-3 text-white/72">
            <Users className="h-5 w-5 text-forge-cyan" />
            Sala VIP com missões, accountability e sinais de progresso.
          </div>
          <Button
            as="a"
            href={`https://wa.me/${brandConfig.whatsappNumber}?text=Quero%20entrar%20na%20comunidade%20VIP%20The%20Forge`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-5 w-5" />
            Entrar no WhatsApp
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default Community;
