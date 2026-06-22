import { useEffect, useMemo, useState } from "react";
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  Crown,
  Dumbbell,
  Flame,
  Gem,
  Medal,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge, Button, Card, IconTile, Progress, Section, Tabs } from "@/components/ui/index.js";
import { useToast } from "@/hooks/useToast.js";
import {
  ACHIEVEMENTS,
  BONUS_XP,
  EXERCISE_TYPES,
  LEVELS,
  MISSIONS,
  SHIELD_LIMIT,
  SUPREME_UNLOCKS,
  applyAchievementUnlocks,
  applyLevelRewards,
  calculateExerciseXp,
  calculateMissionExerciseXp,
  canCompleteMission,
  canUseShield,
  createInitialPlayer,
  createRecoveryMission,
  getCurrentLevel,
  getEligibleLevelIndex,
  getLegendaryTitle,
  getNextLevel,
  getPersonalRanking,
  getRequirementProgress,
  getStreakFlames,
  getStreakTier,
  getTotalExercises,
  getUnlockedAchievements,
  uniqueValues,
} from "@/data/gamification.js";

const STORAGE_KEY = "forge-nexus-discipline-rpg-v1";

function normalizeProfile(profile) {
  const initial = createInitialPlayer();
  const merged = {
    ...initial,
    ...profile,
    totalExercises: {
      ...initial.totalExercises,
      ...(profile?.totalExercises || {}),
    },
    personalBest: {
      ...initial.personalBest,
      ...(profile?.personalBest || {}),
    },
  };

  return {
    ...merged,
    shields: Math.max(0, Math.min(SHIELD_LIMIT, merged.shields)),
    levelIndex: Math.max(0, Math.min(merged.levelIndex ?? getEligibleLevelIndex(merged), LEVELS.length - 1)),
  };
}

function loadProfile() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeProfile(JSON.parse(saved)) : createInitialPlayer();
  } catch {
    return createInitialPlayer();
  }
}

function formatNumber(value) {
  return value.toLocaleString("pt-BR");
}

function addExercises(totalExercises, exercises) {
  return Object.entries(exercises || {}).reduce(
    (totals, [type, reps]) => ({
      ...totals,
      [type]: (totals[type] || 0) + reps,
    }),
    { ...totalExercises }
  );
}

function updatePersonalBest(personalBest, exercises) {
  return Object.entries(exercises || {}).reduce(
    (records, [type, reps]) => ({
      ...records,
      [type]: Math.max(records[type] || 0, reps),
    }),
    { ...personalBest }
  );
}

function getRecordTypes(profile, exercises) {
  return Object.entries(exercises || {})
    .filter(([type, reps]) => reps > (profile.personalBest[type] || 0))
    .map(([type]) => type);
}

function DisciplineLab() {
  const { notify } = useToast();
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Local persistence is a progressive enhancement.
    }
  }, [profile]);

  const currentLevel = useMemo(() => getCurrentLevel(profile), [profile]);
  const nextLevel = useMemo(() => getNextLevel(profile), [profile]);
  const requirementProgress = useMemo(
    () => (nextLevel ? getRequirementProgress(profile, nextLevel.level) : []),
    [nextLevel, profile]
  );
  const unlockedAchievements = useMemo(() => getUnlockedAchievements(profile), [profile]);
  const displayedAchievements = useMemo(() => {
    const unlocked = new Set(profile.earnedAchievementIds || []);
    return ACHIEVEMENTS.map((achievement) => ({
      ...achievement,
      unlocked: unlocked.has(achievement.id) || achievement.isUnlocked(profile),
    }));
  }, [profile]);
  const ranking = useMemo(() => getPersonalRanking(profile), [profile]);
  const totalExercises = getTotalExercises(profile);
  const streakTier = getStreakTier(profile.streak);
  const isSupreme = currentLevel.level.name === "SUPREMO";
  const nextReward = nextLevel?.level.reward;

  const commitProgress = (mutateProfile, notice) => {
    const rawNextProfile = normalizeProfile(mutateProfile(profile));
    const levelResult = applyLevelRewards(profile, rawNextProfile);
    const achievementResult = applyAchievementUnlocks(profile, levelResult.profile);
    const nextProfile = normalizeProfile(achievementResult.profile);

    setProfile(nextProfile);

    if (notice) {
      notify(notice);
    }

    levelResult.levelUps.forEach((level) => {
      notify({
        title: `Nivel desbloqueado: ${level.name}`,
        description: `${level.reward.title} recebeu +${formatNumber(level.reward.xpBonus)} XP e +${level.reward.shields} Escudos.`,
        type: "xp",
      });
    });

    achievementResult.achievements.forEach((achievement) => {
      notify({
        title: `${achievement.badge} Conquista desbloqueada`,
        description: achievement.name,
        type: "success",
      });
    });
  };

  const registerActiveDay = () => {
    const nextStreak = profile.streak + 1;
    const sevenDayBonus = nextStreak % 7 === 0 ? BONUS_XP.sevenDayStreak : 0;
    const thirtyDayBonus = nextStreak % 30 === 0 ? BONUS_XP.thirtyDayStreak : 0;
    const shieldBonus = nextStreak % 7 === 0 ? 1 : 0;
    const gainedXp = BONUS_XP.dailyChallenge + sevenDayBonus + thirtyDayBonus;

    commitProgress(
      (current) => ({
        ...current,
        xp: current.xp + gainedXp,
        missionsCompleted: current.missionsCompleted + 1,
        streak: nextStreak,
        shields: Math.min(SHIELD_LIMIT, current.shields + shieldBonus),
        shieldCooldown: false,
      }),
      {
        title: "Dia ativo registrado",
        description: `+${formatNumber(gainedXp)} XP${shieldBonus ? " e +1 Escudo de Honra" : ""}.`,
        type: "xp",
      }
    );
  };

  const logExercise = (type, reps) => {
    const xpResult = calculateExerciseXp(type, reps, profile);
    const isRecord = reps > (profile.personalBest[type] || 0);
    const recordBonus = isRecord ? BONUS_XP.personalRecord : 0;
    const totalXp = xpResult.totalXp + recordBonus;
    const exercise = EXERCISE_TYPES[type];

    commitProgress(
      (current) => ({
        ...current,
        xp: current.xp + totalXp,
        totalExercises: addExercises(current.totalExercises, { [type]: reps }),
        personalBest: updatePersonalBest(current.personalBest, { [type]: reps }),
      }),
      {
        title: `${exercise.label} registrados`,
        description: `+${formatNumber(totalXp)} XP por ${formatNumber(reps)} repeticoes${isRecord ? " com recorde pessoal" : ""}.`,
        type: "xp",
      }
    );
  };

  const completeMission = (mission) => {
    if (profile.completedMissionIds.includes(mission.id)) {
      notify({
        title: "Missao ja concluida",
        description: "Ela continua contando no seu historico.",
        type: "info",
      });
      return;
    }

    if (!canCompleteMission(mission, profile)) {
      notify({
        title: "Missao ainda bloqueada",
        description: `Voce precisa de ${mission.minStreak} dias consecutivos para concluir esta missao.`,
        type: "error",
      });
      return;
    }

    const exerciseXp = calculateMissionExerciseXp(mission, profile);
    const recordTypes = getRecordTypes(profile, mission.exercises);
    const recordBonus = recordTypes.length > 0 ? BONUS_XP.personalRecord : 0;
    const totalXp = mission.rewardXp + exerciseXp + recordBonus;

    commitProgress(
      (current) => ({
        ...current,
        xp: current.xp + totalXp,
        missionsCompleted: current.missionsCompleted + 1,
        totalExercises: addExercises(current.totalExercises, mission.exercises),
        personalBest: updatePersonalBest(current.personalBest, mission.exercises),
        completedMissionIds: uniqueValues([...(current.completedMissionIds || []), mission.id]),
      }),
      {
        title: "Missao concluida",
        description: `${mission.title} gerou +${formatNumber(totalXp)} XP.`,
        type: "success",
      }
    );
  };

  const useHonorShield = () => {
    if (!canUseShield(profile)) {
      notify({
        title: "Escudo indisponivel",
        description: profile.shieldCooldown
          ? "Escudos de Honra nao podem ser usados em dias seguidos."
          : "Voce nao tem Escudos de Honra disponiveis.",
        type: "error",
      });
      return;
    }

    commitProgress(
      (current) => ({
        ...current,
        shields: current.shields - 1,
        shieldCooldown: true,
      }),
      {
        title: "Escudo de Honra",
        description: "Seu Escudo de Honra protegeu sua sequencia.",
        type: "success",
      }
    );
  };

  const registerFailure = () => {
    const earnedAchievementIds = uniqueValues([
      ...(profile.earnedAchievementIds || []),
      ...displayedAchievements.filter((achievement) => achievement.unlocked).map((achievement) => achievement.id),
    ]);

    setProfile(
      normalizeProfile({
        ...profile,
        streak: 0,
        shieldCooldown: false,
        recoveryMission: profile.streak > 0 ? createRecoveryMission(profile.streak) : null,
        earnedAchievementIds,
      })
    );

    notify({
      title: "Sequencia reiniciada",
      description:
        profile.streak > 0
          ? "XP e conquistas foram mantidos. Uma missao de recuperacao foi criada."
          : "Sem sequencia ativa para recuperar agora.",
      type: "error",
    });
  };

  const completeRecoveryMission = () => {
    const mission = profile.recoveryMission;
    if (!mission) return;

    const exerciseXp = Object.entries(mission.goals).reduce(
      (sum, [type, reps]) => sum + calculateExerciseXp(type, reps, profile).totalXp,
      0
    );
    const recordTypes = getRecordTypes(profile, mission.goals);
    const recordBonus = recordTypes.length > 0 ? BONUS_XP.personalRecord : 0;
    const totalXp = exerciseXp + 150 + recordBonus;

    commitProgress(
      (current) => ({
        ...current,
        xp: current.xp + totalXp,
        missionsCompleted: current.missionsCompleted + 1,
        streak: current.streak + mission.recoverableStreak,
        totalExercises: addExercises(current.totalExercises, mission.goals),
        personalBest: updatePersonalBest(current.personalBest, mission.goals),
        recoveryMission: null,
        shieldCooldown: false,
      }),
      {
        title: "Recuperacao completa",
        description: `Voce recuperou ${mission.recoverableStreak} dias de sequencia e ganhou +${formatNumber(totalXp)} XP.`,
        type: "success",
      }
    );
  };

  const startLegendarySeason = () => {
    if (!isSupreme) {
      notify({
        title: "Modo Lendario bloqueado",
        description: "Alcance o nivel SUPREMO para abrir temporadas infinitas.",
        type: "info",
      });
      return;
    }

    const nextStars = profile.supremeStars + 1;
    const earnedAchievementIds = uniqueValues([
      ...(profile.earnedAchievementIds || []),
      ...displayedAchievements.filter((achievement) => achievement.unlocked).map((achievement) => achievement.id),
    ]);

    setProfile(
      normalizeProfile({
        ...profile,
        xp: 0,
        missionsCompleted: 0,
        streak: 0,
        shields: Math.max(2, profile.shields),
        shieldCooldown: false,
        totalExercises: { pushups: 0, squats: 0, abs: 0 },
        completedMissionIds: [],
        recoveryMission: null,
        supremeStars: nextStars,
        levelIndex: 0,
        rewardedLevelNames: ["Recruta"],
        earnedAchievementIds,
        earnedTitles: uniqueValues([...(profile.earnedTitles || []), getLegendaryTitle(nextStars)]),
      })
    );

    notify({
      title: "Temporada lendaria iniciada",
      description: `${getLegendaryTitle(nextStars)} foi adicionada ao seu legado.`,
      type: "xp",
    });
  };

  const resetDemo = () => {
    setProfile(createInitialPlayer());
    notify({
      title: "Simulacao restaurada",
      description: "O painel voltou ao estado demonstrativo inicial.",
      type: "info",
    });
  };

  const missionTabs = [
    {
      value: "daily",
      label: "Diarias",
      icon: CalendarCheck,
      content: (
        <MissionList
          missions={MISSIONS.daily}
          profile={profile}
          onComplete={completeMission}
          rewardTone="green"
        />
      ),
    },
    {
      value: "weekly",
      label: "Semanais",
      icon: Target,
      content: (
        <MissionList
          missions={MISSIONS.weekly}
          profile={profile}
          onComplete={completeMission}
          rewardTone="cyan"
        />
      ),
    },
    {
      value: "epic",
      label: "Epicas",
      icon: Crown,
      content: (
        <MissionList
          missions={MISSIONS.epic}
          profile={profile}
          onComplete={completeMission}
          rewardTone="amber"
        />
      ),
    },
  ];

  return (
    <Section
      id="discipline"
      eyebrow="Discipline Lab"
      title="Sistema RPG de disciplina"
      description="XP, niveis, sequencia, Escudos de Honra, missoes, conquistas, recompensas e temporadas infinitas em um painel unico."
    >
      <div className="mt-12 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card as={motion.div} className="p-6 sm:p-8" delay={0}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge tone={isSupreme ? "amber" : "green"}>
                <Trophy className="h-4 w-4" />
                {currentLevel.level.name}
              </Badge>
              <h3 className="mt-4 font-display text-3xl font-black uppercase leading-none text-white sm:text-5xl">
                {currentLevel.level.reward.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                Avatar {currentLevel.level.reward.avatar} com {currentLevel.level.reward.frame}.
              </p>
            </div>
            <div className={isSupreme ? "supreme-aura" : "grid h-24 w-24 shrink-0 place-items-center rounded-full border border-green-300/35 bg-green-300/10 shadow-green"}>
              {isSupreme ? <Crown className="h-11 w-11 text-forge-amber" /> : <ShieldCheck className="h-11 w-11 text-forge-green" />}
            </div>
          </div>

          <Progress
            label={nextLevel ? `Proximo nivel: ${nextLevel.level.name}` : "Nivel maximo"}
            value={nextLevel ? Math.min(profile.xp, nextLevel.level.requirements.xp) : profile.xp}
            max={nextLevel ? nextLevel.level.requirements.xp : Math.max(profile.xp, 1)}
            className="mt-8"
          />

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile label="XP atual" value={formatNumber(profile.xp)} />
            <StatTile label="Sequencia" value={`${profile.streak} dias`} />
            <StatTile label="Escudos" value={`${profile.shields}/${SHIELD_LIMIT}`} />
            <StatTile label="Missoes" value={formatNumber(profile.missionsCompleted)} />
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {requirementProgress.map((item) => (
              <div key={item.label} className="rpg-requirement">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-bold text-white/70">{item.label}</span>
                  <strong className={item.complete ? "text-forge-green" : "text-forge-cyan"}>
                    {formatNumber(item.value)} / {formatNumber(item.max)}
                  </strong>
                </div>
                <div className="rpg-requirement-track">
                  <span style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card as={motion.div} className="p-6 sm:p-8" delay={0.05}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-kicker">Sequencia ativa</p>
              <h3 className="mt-3 font-display text-3xl font-black uppercase text-white">
                {getStreakFlames(profile.streak)}
              </h3>
            </div>
            <IconTile tone="amber">
              <Flame className="h-6 w-6" />
            </IconTile>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <StatTile label="Patamar" value={streakTier.label} compact />
            <StatTile label="Bonus XP" value={streakTier.bonusLabel} compact />
          </div>
          <div className="mt-6 grid gap-3">
            <Button type="button" onClick={registerActiveDay}>
              <CalendarCheck className="h-5 w-5" />
              Registrar dia ativo
            </Button>
            <Button type="button" variant="secondary" onClick={useHonorShield} disabled={!canUseShield(profile)}>
              <ShieldCheck className="h-5 w-5" />
              Usar Escudo de Honra
            </Button>
            <Button type="button" variant="danger" onClick={registerFailure}>
              <RotateCcw className="h-5 w-5" />
              Registrar falha
            </Button>
          </div>
          <p className="mt-5 text-sm leading-6 text-white/60">
            Escudos iniciam em 2, acumulam ate 10, sobem a cada 7 dias e tambem chegam como recompensa de nivel.
          </p>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6 sm:p-8" delay={0.1}>
          <div className="flex items-center gap-3">
            <IconTile tone="green">
              <Dumbbell className="h-6 w-6" />
            </IconTile>
            <div>
              <h3 className="font-display text-2xl font-black uppercase text-white">Sistema de XP</h3>
              <p className="text-sm text-white/58">Regras por repeticao, bonus de streak e recorde pessoal.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {Object.entries(EXERCISE_TYPES).map(([type, exercise]) => (
              <div key={type} className="rpg-exercise-panel">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <strong className="font-display text-xl uppercase text-white">{exercise.label}</strong>
                  <span className="text-sm font-bold text-white/56">
                    Total: {formatNumber(profile.totalExercises[type])}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {exercise.rules.map((rule) => {
                    const projected = calculateExerciseXp(type, rule.reps, profile).totalXp;
                    return (
                      <Button
                        key={`${type}-${rule.reps}`}
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => logExercise(type, rule.reps)}
                      >
                        <Zap className="h-4 w-4" />
                        {rule.reps} / +{projected}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 sm:p-8" delay={0.15}>
          <div className="flex items-center gap-3">
            <IconTile>
              <Target className="h-6 w-6" />
            </IconTile>
            <div>
              <h3 className="font-display text-2xl font-black uppercase text-white">Missoes</h3>
              <p className="text-sm text-white/58">Diarias, semanais e epicas contando para nivel e XP.</p>
            </div>
          </div>
          <div className="mt-6">
            <Tabs defaultValue="daily" items={missionTabs} />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-6" delay={0.2}>
          <div className="flex items-center gap-3">
            <IconTile tone="amber">
              <Medal className="h-6 w-6" />
            </IconTile>
            <h3 className="font-display text-2xl font-black uppercase text-white">Conquistas</h3>
          </div>
          <div className="mt-6 grid gap-3">
            {displayedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`achievement-tile ${achievement.unlocked ? "" : "rpg-achievement-locked"}`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {achievement.badge}
                </span>
                <div>
                  <strong className="block text-sm uppercase text-white">{achievement.name}</strong>
                  <span className="text-xs text-white/52">{achievement.description}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm font-bold text-forge-green">
            {unlockedAchievements.length} de {ACHIEVEMENTS.length} badges ativos.
          </p>
        </Card>

        <Card className="p-6" delay={0.25}>
          <div className="flex items-center gap-3">
            <IconTile tone="green">
              <Award className="h-6 w-6" />
            </IconTile>
            <h3 className="font-display text-2xl font-black uppercase text-white">Recompensas</h3>
          </div>
          <div className="mt-6 grid gap-3">
            <RewardRow label="Titulo atual" value={currentLevel.level.reward.title} />
            <RewardRow label="Avatar" value={currentLevel.level.reward.avatar} />
            <RewardRow label="Moldura" value={currentLevel.level.reward.frame} />
            <RewardRow label="XP bonus" value={`+${formatNumber(currentLevel.level.reward.xpBonus)}`} />
            <RewardRow label="Escudos extras" value={`+${currentLevel.level.reward.shields}`} />
          </div>
          {nextReward && (
            <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <span className="text-xs font-black uppercase text-forge-cyan">Proximo desbloqueio</span>
              <p className="mt-2 text-sm leading-6 text-white/70">{nextReward.unlocks.join(" + ")}</p>
            </div>
          )}
        </Card>

        <Card className="p-6" delay={0.3}>
          <div className="flex items-center gap-3">
            <IconTile tone="violet">
              <Trophy className="h-6 w-6" />
            </IconTile>
            <h3 className="font-display text-2xl font-black uppercase text-white">Ranking pessoal</h3>
          </div>
          <div className="mt-6 grid gap-2">
            {ranking.slice(0, 6).map((item, index) => (
              <div key={item.label} className="rpg-ranking-row">
                <span>{index + 1}</span>
                <strong>{item.label}</strong>
                <em>
                  {formatNumber(item.value)} {item.suffix}
                </em>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <StatTile label="Flexoes" value={formatNumber(profile.totalExercises.pushups)} compact />
            <StatTile label="Agach." value={formatNumber(profile.totalExercises.squats)} compact />
            <StatTile label="Abs" value={formatNumber(profile.totalExercises.abs)} compact />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 sm:p-8" delay={0.35}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-kicker">Progressao de niveis</p>
              <h3 className="mt-3 font-display text-2xl font-black uppercase text-white">
                15 ranks ate o SUPREMO
              </h3>
            </div>
            <Badge tone="amber">
              <Sparkles className="h-4 w-4" />
              {formatNumber(totalExercises)} repeticoes
            </Badge>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {LEVELS.map((level, index) => {
              const complete = index < currentLevel.index;
              const current = index === currentLevel.index;
              return (
                <div
                  key={level.name}
                  className={`rpg-level-node ${complete ? "rpg-level-node-complete" : ""} ${current ? "rpg-level-node-current" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong>{level.name}</strong>
                    {complete && <CheckCircle2 className="h-5 w-5 text-forge-green" />}
                    {current && <Star className="h-5 w-5 text-forge-amber" />}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/58">
                    <span>XP {formatNumber(level.requirements.xp)}</span>
                    <span>Missoes {formatNumber(level.requirements.missions)}</span>
                    <span>Seq. {formatNumber(level.requirements.streak)}</span>
                    <span>Reps {formatNumber(level.requirements.exercises)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="p-6" delay={0.4}>
            <div className="flex items-center gap-3">
              <IconTile tone="amber">
                <Crown className="h-6 w-6" />
              </IconTile>
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white">Sistema Supremo</h3>
                <p className="text-sm text-white/58">{isSupreme ? "Desbloqueado" : "Bloqueado ate o nivel SUPREMO"}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-2">
              {SUPREME_UNLOCKS.map((unlock) => (
                <div key={unlock} className={`rpg-supreme-unlock ${isSupreme ? "rpg-supreme-unlock-active" : ""}`}>
                  {unlock}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6" delay={0.45}>
            <div className="flex items-center gap-3">
              <IconTile tone="violet">
                <Gem className="h-6 w-6" />
              </IconTile>
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white">Modo Lendario</h3>
                <p className="text-sm text-white/58">{getLegendaryTitle(profile.supremeStars)}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <RewardRow label="Estrelas Supremas" value={profile.supremeStars ? "⭐".repeat(profile.supremeStars) : "0"} />
              <RewardRow label="Temporada" value={profile.supremeStars + 1} />
              <Button type="button" variant="secondary" onClick={startLegendarySeason} disabled={!isSupreme}>
                <Sparkles className="h-5 w-5" />
                Iniciar temporada
              </Button>
            </div>
          </Card>

          <Card className="p-6" delay={0.5}>
            <div className="flex items-center gap-3">
              <IconTile tone="green">
                <RotateCcw className="h-6 w-6" />
              </IconTile>
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white">Anti-abandono</h3>
                <p className="text-sm text-white/58">Falha zera streak, mantem XP e abre recuperacao.</p>
              </div>
            </div>
            {profile.recoveryMission ? (
              <div className="mt-6 rounded-lg border border-forge-amber/30 bg-forge-amber/10 p-4">
                <p className="text-sm leading-6 text-white/78">{profile.recoveryMission.text}</p>
                <Button type="button" className="mt-4 w-full" onClick={completeRecoveryMission}>
                  <CheckCircle2 className="h-5 w-5" />
                  Concluir recuperacao
                </Button>
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/62">
                Nenhuma missao de recuperacao ativa.
              </div>
            )}
            <Button type="button" variant="ghost" className="mt-4 w-full" onClick={resetDemo}>
              Restaurar simulacao
            </Button>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function StatTile({ label, value, compact = false }) {
  return (
    <div className={`mini-stat ${compact ? "p-3" : ""}`}>
      <span>{label}</span>
      <strong className={compact ? "text-lg" : ""}>{value}</strong>
    </div>
  );
}

function RewardRow({ label, value }) {
  return (
    <div className="rpg-reward-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MissionList({ missions, onComplete, profile, rewardTone }) {
  return (
    <div className="grid gap-3">
      {missions.map((mission) => {
        const completed = profile.completedMissionIds.includes(mission.id);
        const blocked = mission.minStreak && profile.streak < mission.minStreak;
        const exerciseXp = calculateMissionExerciseXp(mission, profile);
        const reward = mission.rewardXp + exerciseXp;
        return (
          <div key={mission.id} className="mission-row">
            <CheckCircle2 className={`h-5 w-5 ${completed ? "text-forge-green" : "text-white/40"}`} />
            <span>
              <strong className="block text-white">{mission.title}</strong>
              <small className="text-white/56">{mission.description}</small>
            </span>
            <div className="flex items-center gap-2">
              <Badge tone={rewardTone}>+{formatNumber(reward)} XP</Badge>
              <Button
                type="button"
                size="sm"
                variant={completed ? "ghost" : "primary"}
                disabled={completed || blocked}
                onClick={() => onComplete(mission)}
              >
                {completed ? "Feita" : "Concluir"}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DisciplineLab;
