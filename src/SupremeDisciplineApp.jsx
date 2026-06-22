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
import { Badge, Button, IconTile, Progress, Tabs } from "@/components/ui/index.js";
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
  createEmptyPlayer,
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

const STORAGE_KEY = "disciplina-suprema-player-v2";
const DEFAULT_REPS = { pushups: 30, squats: 50, abs: 30 };

function normalizeProfile(profile) {
  const initial = createEmptyPlayer();
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
    return saved ? normalizeProfile(JSON.parse(saved)) : createEmptyPlayer();
  } catch {
    return createEmptyPlayer();
  }
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("pt-BR");
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

function SupremeDisciplineApp() {
  const { notify } = useToast();
  const [profile, setProfile] = useState(loadProfile);
  const [session, setSession] = useState(DEFAULT_REPS);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Local persistence is optional.
    }
  }, [profile]);

  const currentLevel = useMemo(() => getCurrentLevel(profile), [profile]);
  const nextLevel = useMemo(() => getNextLevel(profile), [profile]);
  const requirements = useMemo(
    () => (nextLevel ? getRequirementProgress(profile, nextLevel.level) : []),
    [nextLevel, profile]
  );
  const unlockedAchievements = useMemo(() => getUnlockedAchievements(profile), [profile]);
  const achievementIds = useMemo(
    () => new Set(unlockedAchievements.map((achievement) => achievement.id)),
    [unlockedAchievements]
  );
  const ranking = useMemo(() => getPersonalRanking(profile), [profile]);
  const streakTier = getStreakTier(profile.streak);
  const totalExercises = getTotalExercises(profile);
  const isSupreme = currentLevel.level.name === "SUPREMO";
  const sessionXp = useMemo(() => calculateSessionXp(session, profile), [session, profile]);

  const commitProgress = (mutateProfile, notice) => {
    const rawNext = normalizeProfile(mutateProfile(profile));
    const levelResult = applyLevelRewards(profile, rawNext);
    const achievementResult = applyAchievementUnlocks(profile, levelResult.profile);
    const nextProfile = normalizeProfile(achievementResult.profile);

    setProfile(nextProfile);

    if (notice) notify(notice);

    levelResult.levelUps.forEach((level) => {
      notify({
        title: `Nivel desbloqueado: ${level.name}`,
        description: `${level.reward.title}: +${formatNumber(level.reward.xpBonus)} XP e +${level.reward.shields} Escudos.`,
        type: "xp",
      });
    });

    achievementResult.achievements.forEach((achievement) => {
      notify({
        title: `${achievement.badge} ${achievement.name}`,
        description: "Conquista desbloqueada.",
        type: "success",
      });
    });
  };

  const updateSession = (type, value) => {
    const parsed = Math.max(0, Math.min(9999, Number(value) || 0));
    setSession((current) => ({ ...current, [type]: parsed }));
  };

  const registerWorkout = () => {
    const exercises = Object.fromEntries(
      Object.entries(session).filter(([, reps]) => Number(reps) > 0)
    );
    const repsTotal = Object.values(exercises).reduce((sum, reps) => sum + reps, 0);

    if (repsTotal === 0) {
      notify({
        title: "Treino vazio",
        description: "Informe ao menos uma repeticao para registrar.",
        type: "error",
      });
      return;
    }

    const recordTypes = getRecordTypes(profile, exercises);
    const recordBonus = recordTypes.length > 0 ? BONUS_XP.personalRecord : 0;
    const totalXp = sessionXp + BONUS_XP.dailyChallenge + recordBonus;
    const nextStreak = profile.streak + 1;
    const sevenDayBonus = nextStreak % 7 === 0 ? BONUS_XP.sevenDayStreak : 0;
    const thirtyDayBonus = nextStreak % 30 === 0 ? BONUS_XP.thirtyDayStreak : 0;
    const shieldBonus = nextStreak % 7 === 0 ? 1 : 0;
    const finalXp = totalXp + sevenDayBonus + thirtyDayBonus;

    commitProgress(
      (current) => ({
        ...current,
        xp: current.xp + finalXp,
        missionsCompleted: current.missionsCompleted + 1,
        streak: nextStreak,
        shields: Math.min(SHIELD_LIMIT, current.shields + shieldBonus),
        shieldCooldown: false,
        totalExercises: addExercises(current.totalExercises, exercises),
        personalBest: updatePersonalBest(current.personalBest, exercises),
      }),
      {
        title: "Treino registrado",
        description: `+${formatNumber(finalXp)} XP, ${formatNumber(repsTotal)} repeticoes e sequencia em ${nextStreak} dias.`,
        type: "xp",
      }
    );
  };

  const completeMission = (mission) => {
    if (profile.completedMissionIds.includes(mission.id)) {
      notify({
        title: "Missao ja concluida",
        description: "Ela continua salva no seu historico.",
        type: "info",
      });
      return;
    }

    if (!canCompleteMission(mission, profile)) {
      notify({
        title: "Missao bloqueada",
        description: `Exige ${mission.minStreak} dias de sequencia ativa.`,
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
        description: `${mission.title}: +${formatNumber(totalXp)} XP.`,
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
      ...unlockedAchievements.map((achievement) => achievement.id),
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
      title: "Falha registrada",
      description:
        profile.streak > 0
          ? "Sequencia zerada, XP mantido e missao de recuperacao aberta."
          : "Sem sequencia ativa para recuperar agora.",
      type: "error",
    });
  };

  const completeRecovery = () => {
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
        title: "Recuperacao concluida",
        description: `+${formatNumber(totalXp)} XP e ${mission.recoverableStreak} dias restaurados.`,
        type: "success",
      }
    );
  };

  const startLegendarySeason = () => {
    if (!isSupreme) {
      notify({
        title: "Modo Lendario bloqueado",
        description: "Alcance SUPREMO para reiniciar temporadas e manter seu legado.",
        type: "info",
      });
      return;
    }

    const nextStars = profile.supremeStars + 1;
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
        earnedAchievementIds: uniqueValues([
          ...(profile.earnedAchievementIds || []),
          ...unlockedAchievements.map((achievement) => achievement.id),
        ]),
        earnedTitles: uniqueValues([...(profile.earnedTitles || []), getLegendaryTitle(nextStars)]),
      })
    );

    notify({
      title: "Temporada infinita iniciada",
      description: `${getLegendaryTitle(nextStars)} entrou no seu legado.`,
      type: "xp",
    });
  };

  const resetSystem = () => {
    setProfile(createEmptyPlayer());
    setSession(DEFAULT_REPS);
    notify({
      title: "Pontuacao zerada",
      description: "XP, sequencia, missoes, repeticoes, recordes e conquistas voltaram para zero.",
      type: "info",
    });
  };

  return (
    <div className="supreme-app min-h-screen bg-abyss text-white">
      <div className="nexus-background" aria-hidden="true" />
      <div className="hud-grid" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true" />

      <header className="supreme-topbar">
        <a href="/supremo.html" className="flex items-center gap-3" aria-label="Disciplina Suprema">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-amber-300/40 bg-amber-300/10 shadow-green">
            <Crown className="h-5 w-5 text-forge-amber" />
          </span>
          <span className="font-display text-base font-black uppercase leading-tight">
            Disciplina
            <span className="block text-forge-amber">Suprema</span>
          </span>
        </a>
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navegacao principal">
          <a className="nav-link" href="#painel">Painel</a>
          <a className="nav-link" href="#missoes">Missoes</a>
          <a className="nav-link" href="#niveis">Niveis</a>
          <a className="nav-link" href="#supremo">Supremo</a>
        </nav>
        <Button as="a" href="/" size="sm" variant="ghost">
          Nexus
        </Button>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl gap-5 px-4 pb-14 pt-24 sm:px-6 lg:px-8">
        <section id="painel" className="supreme-command-grid">
          <div className="supreme-panel supreme-player-panel">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <Badge tone={isSupreme ? "amber" : "green"}>
                  <Trophy className="h-4 w-4" />
                  {currentLevel.level.name}
                </Badge>
                <h1 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white sm:text-6xl">
                  {currentLevel.level.reward.title}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                  {currentLevel.level.reward.avatar} ativo com {currentLevel.level.reward.frame}. O personagem evolui quando XP, missoes, sequencia e repeticoes batem o requisito do proximo rank.
                </p>
              </div>
              <div className={isSupreme ? "supreme-aura" : "supreme-avatar-core"}>
                {isSupreme ? <Crown className="h-12 w-12 text-forge-amber" /> : <ShieldCheck className="h-12 w-12 text-forge-green" />}
              </div>
            </div>

            <Progress
              label={nextLevel ? `Rumo a ${nextLevel.level.name}` : "SUPREMO consolidado"}
              value={nextLevel ? Math.min(profile.xp, nextLevel.level.requirements.xp) : profile.xp}
              max={nextLevel ? nextLevel.level.requirements.xp : Math.max(profile.xp, 1)}
              className="mt-8"
            />

            <div className="supreme-metrics mt-8">
              <Metric label="XP atual" value={formatNumber(profile.xp)} />
              <Metric label="Sequencia" value={`${profile.streak} dias`} />
              <Metric label="Escudos" value={`${profile.shields}/${SHIELD_LIMIT}`} />
              <Metric label="Repeticoes" value={formatNumber(totalExercises)} />
            </div>
          </div>

          <div className="supreme-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Sequencia</p>
                <h2 className="mt-3 font-display text-3xl font-black uppercase">
                  {getStreakFlames(profile.streak)}
                </h2>
              </div>
              <IconTile tone="amber">
                <Flame className="h-6 w-6" />
              </IconTile>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Metric label="Patamar" value={streakTier.label} compact />
              <Metric label="Bonus XP" value={streakTier.bonusLabel} compact />
            </div>
            <div className="mt-6 grid gap-3">
              <Button type="button" onClick={useHonorShield} disabled={!canUseShield(profile)} variant="secondary">
                <ShieldCheck className="h-5 w-5" />
                Usar Escudo
              </Button>
              <Button type="button" onClick={registerFailure} variant="danger">
                <RotateCcw className="h-5 w-5" />
                Registrar falha
              </Button>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/60">
              Um Escudo protege a sequencia por um dia, mas nao pode ser usado em dias seguidos.
            </p>
          </div>
        </section>

        <section className="supreme-workout-grid">
          <div className="supreme-panel">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <IconTile tone="green">
                  <Dumbbell className="h-6 w-6" />
                </IconTile>
                <div>
                  <p className="section-kicker">Treino de hoje</p>
                  <h2 className="mt-2 font-display text-3xl font-black uppercase">Registrar sessao</h2>
                </div>
              </div>
              <Badge tone="amber">
                <Zap className="h-4 w-4" />
                Previsao +{formatNumber(sessionXp + BONUS_XP.dailyChallenge)} XP
              </Badge>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {Object.entries(EXERCISE_TYPES).map(([type, exercise]) => (
                <ExerciseControl
                  key={type}
                  exercise={exercise}
                  personalBest={profile.personalBest[type]}
                  total={profile.totalExercises[type]}
                  value={session[type]}
                  onChange={(value) => updateSession(type, value)}
                />
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button type="button" className="flex-1" size="lg" onClick={registerWorkout}>
                <CalendarCheck className="h-5 w-5" />
                Concluir treino do dia
              </Button>
              <Button type="button" className="flex-1" variant="ghost" size="lg" onClick={() => setSession(DEFAULT_REPS)}>
                Restaurar metas
              </Button>
            </div>
          </div>

          <div className="supreme-panel">
            <div className="flex items-center gap-3">
              <IconTile>
                <Target className="h-6 w-6" />
              </IconTile>
              <div>
                <p className="section-kicker">Proximo nivel</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase">
                  {nextLevel ? nextLevel.level.name : "Hall da Fama"}
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {requirements.map((item) => (
                <div key={item.label} className="supreme-requirement">
                  <div className="flex items-center justify-between gap-3">
                    <span>{item.label}</span>
                    <strong className={item.complete ? "text-forge-green" : "text-forge-cyan"}>
                      {formatNumber(item.value)} / {formatNumber(item.max)}
                    </strong>
                  </div>
                  <div className="rpg-requirement-track">
                    <span style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
              {!requirements.length && <p className="text-sm leading-7 text-white/64">Todos os requisitos atuais foram dominados.</p>}
            </div>
          </div>
        </section>

        <section id="missoes" className="supreme-section-grid">
          <div className="supreme-panel supreme-span-2">
            <div className="flex items-center gap-3">
              <IconTile tone="cyan">
                <CheckCircle2 className="h-6 w-6" />
              </IconTile>
              <div>
                <p className="section-kicker">Missoes</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase">Diarias, semanais e epicas</h2>
              </div>
            </div>
            <div className="mt-6">
              <Tabs
                defaultValue="daily"
                items={[
                  {
                    value: "daily",
                    label: "Diarias",
                    icon: CalendarCheck,
                    content: (
                      <MissionList missions={MISSIONS.daily} profile={profile} onComplete={completeMission} />
                    ),
                  },
                  {
                    value: "weekly",
                    label: "Semanais",
                    icon: Target,
                    content: (
                      <MissionList missions={MISSIONS.weekly} profile={profile} onComplete={completeMission} />
                    ),
                  },
                  {
                    value: "epic",
                    label: "Epicas",
                    icon: Crown,
                    content: (
                      <MissionList missions={MISSIONS.epic} profile={profile} onComplete={completeMission} />
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className="supreme-panel">
            <div className="flex items-center gap-3">
              <IconTile tone="amber">
                <RotateCcw className="h-6 w-6" />
              </IconTile>
              <div>
                <p className="section-kicker">Anti-abandono</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase">Recuperacao</h2>
              </div>
            </div>
            {profile.recoveryMission ? (
              <div className="mt-6 rounded-lg border border-forge-amber/35 bg-forge-amber/10 p-4">
                <p className="text-sm leading-7 text-white/76">{profile.recoveryMission.text}</p>
                <Button type="button" className="mt-4 w-full" onClick={completeRecovery}>
                  <CheckCircle2 className="h-5 w-5" />
                  Concluir recuperacao
                </Button>
              </div>
            ) : (
              <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white/62">
                Nenhuma recuperacao ativa. Se falhar, o sistema cria uma missao de 3 dias para recuperar 50% da sequencia perdida.
              </p>
            )}
          </div>
        </section>

        <section className="supreme-section-grid">
          <div className="supreme-panel">
            <div className="flex items-center gap-3">
              <IconTile tone="amber">
                <Medal className="h-6 w-6" />
              </IconTile>
              <div>
                <p className="section-kicker">Badges</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase">Conquistas</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked = achievementIds.has(achievement.id);
                return (
                  <div key={achievement.id} className={`supreme-achievement ${unlocked ? "supreme-achievement-on" : ""}`}>
                    <span aria-hidden="true">{achievement.badge}</span>
                    <div>
                      <strong>{achievement.name}</strong>
                      <small>{achievement.description}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="supreme-panel">
            <div className="flex items-center gap-3">
              <IconTile tone="violet">
                <Trophy className="h-6 w-6" />
              </IconTile>
              <div>
                <p className="section-kicker">Ranking</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase">Pessoal</h2>
              </div>
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
          </div>

          <div className="supreme-panel">
            <div className="flex items-center gap-3">
              <IconTile tone="green">
                <Award className="h-6 w-6" />
              </IconTile>
              <div>
                <p className="section-kicker">Recompensas</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase">Atual</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <RewardLine label="Titulo" value={currentLevel.level.reward.title} />
              <RewardLine label="Avatar" value={currentLevel.level.reward.avatar} />
              <RewardLine label="Moldura" value={currentLevel.level.reward.frame} />
              <RewardLine label="XP bonus" value={`+${formatNumber(currentLevel.level.reward.xpBonus)}`} />
              <RewardLine label="Escudos" value={`+${currentLevel.level.reward.shields}`} />
            </div>
          </div>
        </section>

        <section id="niveis" className="supreme-panel">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-kicker">Estrutura de niveis</p>
              <h2 className="mt-2 font-display text-3xl font-black uppercase">Da base ao SUPREMO</h2>
            </div>
            <Badge tone="green">
              <Star className="h-4 w-4" />
              {LEVELS.length} niveis
            </Badge>
          </div>
          <div className="supreme-level-grid mt-7">
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
        </section>

        <section id="supremo" className="supreme-section-grid">
          <div className="supreme-panel supreme-span-2">
            <div className="flex items-center gap-3">
              <IconTile tone="amber">
                <Crown className="h-6 w-6" />
              </IconTile>
              <div>
                <p className="section-kicker">Sistema Supremo</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase">
                  {isSupreme ? "Aura Suprema ativa" : "Bloqueado ate SUPREMO"}
                </h2>
              </div>
            </div>
            <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {SUPREME_UNLOCKS.map((unlock) => (
                <div key={unlock} className={`rpg-supreme-unlock ${isSupreme ? "rpg-supreme-unlock-active" : ""}`}>
                  {unlock}
                </div>
              ))}
            </div>
          </div>

          <div className="supreme-panel">
            <div className="flex items-center gap-3">
              <IconTile tone="violet">
                <Gem className="h-6 w-6" />
              </IconTile>
              <div>
                <p className="section-kicker">Modo Lendario</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase">Temporadas</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <RewardLine label="Titulo" value={getLegendaryTitle(profile.supremeStars)} />
              <RewardLine label="Estrelas" value={profile.supremeStars ? "⭐".repeat(profile.supremeStars) : "0"} />
              <Button type="button" variant="secondary" onClick={startLegendarySeason} disabled={!isSupreme}>
                <Sparkles className="h-5 w-5" />
                Iniciar temporada
              </Button>
              <Button type="button" variant="ghost" onClick={resetSystem}>
                Zerar pontuacao
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function calculateSessionXp(session, profile) {
  return Object.entries(session).reduce((sum, [type, reps]) => {
    return sum + calculateExerciseXp(type, Number(reps) || 0, profile).totalXp;
  }, 0);
}

function Metric({ label, value, compact = false }) {
  return (
    <div className={`supreme-metric ${compact ? "supreme-metric-compact" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ExerciseControl({ exercise, personalBest, total, value, onChange }) {
  return (
    <div className="supreme-exercise-control">
      <div className="flex items-start justify-between gap-3">
        <div>
          <strong>{exercise.label}</strong>
          <span>Total {formatNumber(total)}</span>
        </div>
        <Badge tone="neutral">PB {formatNumber(personalBest)}</Badge>
      </div>
      <label className="mt-5 block">
        <span className="sr-only">{exercise.label}</span>
        <input
          className="supreme-reps-input"
          min="0"
          max="9999"
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {exercise.rules.map((rule) => (
          <button key={rule.reps} type="button" className="supreme-step-button" onClick={() => onChange(rule.reps)}>
            {rule.reps}
          </button>
        ))}
      </div>
    </div>
  );
}

function MissionList({ missions, onComplete, profile }) {
  return (
    <div className="grid gap-3">
      {missions.map((mission) => {
        const completed = profile.completedMissionIds.includes(mission.id);
        const blocked = mission.minStreak && profile.streak < mission.minStreak;
        const reward = mission.rewardXp + calculateMissionExerciseXp(mission, profile);
        return (
          <div key={mission.id} className="mission-row">
            <CheckCircle2 className={`h-5 w-5 ${completed ? "text-forge-green" : "text-white/40"}`} />
            <span>
              <strong className="block text-white">{mission.title}</strong>
              <small className="text-white/56">{mission.description}</small>
            </span>
            <div className="flex items-center gap-2">
              <Badge tone={blocked ? "neutral" : "green"}>+{formatNumber(reward)} XP</Badge>
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

function RewardLine({ label, value }) {
  return (
    <div className="rpg-reward-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default SupremeDisciplineApp;
