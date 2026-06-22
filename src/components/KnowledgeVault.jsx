import { Apple, BookOpen, Brain, Footprints, HeartPulse, ShieldCheck, Timer, Zap } from "lucide-react";
import { articles } from "@/data/articles.js";
import { Badge, Card, IconTile, Section } from "@/components/ui/index.js";

const articleIcons = {
  "Dicas de treino": Zap,
  Nutrição: Apple,
  Disciplina: ShieldCheck,
  Corrida: Footprints,
  Recuperação: HeartPulse,
  Mentalidade: Brain,
};

function KnowledgeVault() {
  return (
    <Section
      id="vault"
      eyebrow="Knowledge Vault"
      title="Arquivos de evolução"
      description="Conteúdos premium para transformar treino em estratégia e estratégia em rotina."
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, index) => {
          const Icon = articleIcons[article.category] || BookOpen;
          return (
            <Card key={article.title} className="group flex min-h-72 flex-col p-6" delay={index * 0.05}>
              <div className="flex items-center justify-between gap-4">
                <IconTile>
                  <Icon className="h-6 w-6" />
                </IconTile>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-white/64">
                  <Timer className="h-4 w-4 text-forge-green" />
                  {article.readTime}
                </span>
              </div>
              <Badge tone="cyan" className="mt-6">
                {article.category}
              </Badge>
              <h3 className="mt-3 font-display text-2xl font-black uppercase leading-tight text-white">
                {article.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-white/72">{article.excerpt}</p>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 text-left text-sm font-bold text-forge-green"
              >
                Abrir arquivo
                <span className="h-px w-8 bg-forge-green transition group-hover:w-12" />
              </button>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export default KnowledgeVault;
