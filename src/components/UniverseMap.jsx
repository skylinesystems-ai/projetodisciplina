import { ChevronRight, Users } from "lucide-react";
import { universeModules } from "@/config/navigation.js";
import { iconRegistry } from "@/config/iconRegistry.jsx";
import { Badge, Card, Section } from "@/components/ui/index.js";

function UniverseMap() {
  return (
    <Section
      id="universe"
      eyebrow="Navegação estilo universo"
      title="Escolha seu módulo orbital"
      description="Cada planeta conecta uma dimensão da The Forge: treino, mercado, conhecimento, disciplina, IA e expansão por afiliados."
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {universeModules.map((module, index) => {
          const Icon = iconRegistry[module.icon];
          return (
            <Card key={module.title} className="group min-h-72 p-6" delay={index * 0.06}>
              <div className="flex items-start justify-between gap-4">
                <div className="planet-orb">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <Badge tone="green">{module.signal}</Badge>
              </div>
              <h3 className="mt-7 font-display text-2xl font-black uppercase text-white">{module.title}</h3>
              <p className="mt-3 min-h-24 text-sm leading-7 text-white/72">{module.description}</p>
              <a
                href={module.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forge-cyan"
              >
                Acessar módulo
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/64">
        <Users className="h-4 w-4 text-forge-green" />
        Rede sincronizada com comunidade, marketplace e progressão.
      </div>
    </Section>
  );
}

export default UniverseMap;
