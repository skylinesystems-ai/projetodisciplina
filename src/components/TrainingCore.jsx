import { useState } from "react";
import { Activity, Dumbbell, Flame, Gauge, Home, Target, Timer, Zap } from "lucide-react";
import { trainings } from "@/data/trainings.js";
import { Badge, Button, Card, IconTile, Modal, Section, StatePanel } from "@/components/ui/index.js";
import { useToast } from "@/hooks/useToast.js";

const iconMap = {
  Emagrecimento: Flame,
  Hipertrofia: Gauge,
  Corrida: Activity,
  Funcional: Zap,
  "Treino em Casa": Home,
  Iniciante: Target,
};

function TrainingCore() {
  const [selectedTraining, setSelectedTraining] = useState(null);
  const { notify } = useToast();

  const activateProtocol = (training) => {
    setSelectedTraining(training);
    notify({
      title: "Protocolo armado",
      description: `${training.name} entrou na fila operacional do Nexus.`,
      type: "xp",
    });
  };

  const confirmProtocol = () => {
    notify({
      title: "Início registrado",
      description: "Missão diária atualizada com +250 XP.",
      type: "success",
    });
    setSelectedTraining(null);
  };

  return (
    <Section
      id="training"
      eyebrow="Training Core"
      title="Catálogo de protocolos"
      description="Treinos mockados como comandos operacionais: objetivos claros, duração visível e início imediato."
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trainings.map((training, index) => {
          const Icon = iconMap[training.name] || Dumbbell;
          return (
            <Card key={training.name} className="p-6" delay={index * 0.05}>
              <div className="flex items-center justify-between gap-4">
                <IconTile>
                  <Icon className="h-6 w-6" />
                </IconTile>
                <Badge>{training.signal}</Badge>
              </div>
              <h3 className="mt-6 font-display text-2xl font-black uppercase text-white">{training.name}</h3>
              <div className="mt-5 grid gap-3 text-sm text-white/72">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Nível</span>
                  <strong className="text-white">{training.level}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Duração</span>
                  <strong className="inline-flex items-center gap-2 text-white">
                    <Timer className="h-4 w-4 text-forge-green" />
                    {training.duration}
                  </strong>
                </div>
                <div>
                  <span className="text-white/64">Objetivo</span>
                  <p className="mt-2 leading-7 text-white/76">{training.objective}</p>
                </div>
              </div>
              <Button type="button" className="mt-6 w-full" onClick={() => activateProtocol(training)}>
                Iniciar Protocolo
              </Button>
            </Card>
          );
        })}
      </div>

      <Modal
        open={Boolean(selectedTraining)}
        onClose={() => setSelectedTraining(null)}
        title={selectedTraining ? selectedTraining.name : "Protocolo"}
        description="Confirme o início para registrar a missão no painel de disciplina."
      >
        {selectedTraining && (
          <div className="grid gap-4">
            <StatePanel
              state="success"
              title="Protocolo pronto para execução"
              description={`${selectedTraining.level} - ${selectedTraining.duration} - ${selectedTraining.objective}`}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Nível", selectedTraining.level],
                ["Duração", selectedTraining.duration],
                ["Sinal", selectedTraining.signal],
              ].map(([label, value]) => (
                <div key={label} className="mini-stat">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="button" className="flex-1" onClick={confirmProtocol}>
                Confirmar início
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => setSelectedTraining(null)}
              >
                Revisar depois
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}

export default TrainingCore;
