export const SHIELD_LIMIT = 10;

export const BONUS_XP = {
  dailyChallenge: 20,
  sevenDayStreak: 100,
  thirtyDayStreak: 500,
  personalRecord: 50,
};

export const EXERCISE_TYPES = {
  pushups: {
    label: "Flexoes",
    shortLabel: "Flex",
    rules: [
      { reps: 10, xp: 5 },
      { reps: 20, xp: 10 },
      { reps: 50, xp: 30 },
      { reps: 100, xp: 70 },
    ],
  },
  squats: {
    label: "Agachamentos",
    shortLabel: "Agach",
    rules: [
      { reps: 20, xp: 5 },
      { reps: 50, xp: 15 },
      { reps: 100, xp: 35 },
      { reps: 200, xp: 80 },
    ],
  },
  abs: {
    label: "Abdominais",
    shortLabel: "Abs",
    rules: [
      { reps: 20, xp: 5 },
      { reps: 50, xp: 15 },
      { reps: 100, xp: 35 },
      { reps: 200, xp: 80 },
    ],
  },
};

export const LEVELS = [
  {
    name: "Recruta",
    requirements: { xp: 0, missions: 0, streak: 0, exercises: 0 },
    reward: {
      title: "Recruta da Forja",
      avatar: "Elmo de Ferro",
      frame: "Moldura Inicial",
      xpBonus: 0,
      shields: 0,
      unlocks: ["Painel do Jogador"],
    },
  },
  {
    name: "Aprendiz",
    requirements: { xp: 150, missions: 3, streak: 2, exercises: 150 },
    reward: {
      title: "Aprendiz da Disciplina",
      avatar: "Mascara de Treino",
      frame: "Moldura Bronze",
      xpBonus: 25,
      shields: 2,
      unlocks: ["Missao diaria extra"],
    },
  },
  {
    name: "Guerreiro",
    requirements: { xp: 450, missions: 8, streak: 4, exercises: 400 },
    reward: {
      title: "Guerreiro da Dor",
      avatar: "Armadura Leve",
      frame: "Moldura Aco",
      xpBonus: 60,
      shields: 2,
      unlocks: ["Badge de combate"],
    },
  },
  {
    name: "Combatente",
    requirements: { xp: 900, missions: 15, streak: 7, exercises: 850 },
    reward: {
      title: "Combatente Firme",
      avatar: "Capuz Tatico",
      frame: "Moldura Carmesim",
      xpBonus: 100,
      shields: 2,
      unlocks: ["Tema visual vermelho"],
    },
  },
  {
    name: "Elite",
    requirements: { xp: 1600, missions: 25, streak: 10, exercises: 1500 },
    reward: {
      title: "Elite da Constancia",
      avatar: "Armadura Elite",
      frame: "Moldura Neon",
      xpBonus: 160,
      shields: 2,
      unlocks: ["Tema visual tatico"],
    },
  },
  {
    name: "Veterano",
    requirements: { xp: 2600, missions: 40, streak: 14, exercises: 2500 },
    reward: {
      title: "Veterano Implacavel",
      avatar: "Capa de Campo",
      frame: "Moldura Rubi",
      xpBonus: 240,
      shields: 2,
      unlocks: ["Medalha rara de foco"],
    },
  },
  {
    name: "Gladiador",
    requirements: { xp: 4000, missions: 60, streak: 21, exercises: 4000 },
    reward: {
      title: "Gladiador da Forja",
      avatar: "Elmo de Arena",
      frame: "Moldura Arena",
      xpBonus: 340,
      shields: 2,
      unlocks: ["Efeito visual de impacto"],
    },
  },
  {
    name: "Campeao",
    requirements: { xp: 5900, missions: 85, streak: 30, exercises: 6200 },
    reward: {
      title: "Campeao da Rotina",
      avatar: "Coroa de Aco",
      frame: "Moldura Ouro",
      xpBonus: 460,
      shields: 2,
      unlocks: ["Tema dourado"],
    },
  },
  {
    name: "Mestre",
    requirements: { xp: 8300, missions: 120, streak: 45, exercises: 9000 },
    reward: {
      title: "Mestre da Disciplina",
      avatar: "Manto Mestre",
      frame: "Moldura Prisma",
      xpBonus: 620,
      shields: 2,
      unlocks: ["Medalha rara mestre"],
    },
  },
  {
    name: "Lendario",
    requirements: { xp: 11200, missions: 165, streak: 60, exercises: 12500 },
    reward: {
      title: "Lendario Vivo",
      avatar: "Armadura Lendaria",
      frame: "Moldura Estelar",
      xpBonus: 820,
      shields: 2,
      unlocks: ["Efeito visual lendario"],
    },
  },
  {
    name: "Imortal",
    requirements: { xp: 15000, missions: 220, streak: 75, exercises: 17000 },
    reward: {
      title: "Imortal da Forja",
      avatar: "Aura Imortal",
      frame: "Moldura Infinita",
      xpBonus: 1050,
      shields: 2,
      unlocks: ["Insignia animada"],
    },
  },
  {
    name: "Ascendente",
    requirements: { xp: 19500, missions: 290, streak: 90, exercises: 22500 },
    reward: {
      title: "Ascendente",
      avatar: "Armadura Celeste",
      frame: "Moldura Celeste",
      xpBonus: 1320,
      shields: 2,
      unlocks: ["Medalha ascendente"],
    },
  },
  {
    name: "Divino",
    requirements: { xp: 25000, missions: 370, streak: 110, exercises: 29500 },
    reward: {
      title: "Divino da Disciplina",
      avatar: "Avatar Divino",
      frame: "Moldura Divina",
      xpBonus: 1650,
      shields: 2,
      unlocks: ["Tema divino"],
    },
  },
  {
    name: "Transcendente",
    requirements: { xp: 32000, missions: 470, streak: 135, exercises: 38000 },
    reward: {
      title: "Transcendente",
      avatar: "Forma Transcendente",
      frame: "Moldura Cosmica",
      xpBonus: 2050,
      shields: 2,
      unlocks: ["Insignia cosmica animada"],
    },
  },
  {
    name: "SUPREMO",
    requirements: { xp: 42000, missions: 600, streak: 180, exercises: 50000 },
    reward: {
      title: "Titulo Supremo",
      avatar: "Aura Suprema",
      frame: "Moldura Suprema",
      xpBonus: 3000,
      shields: 2,
      unlocks: [
        "Aura Suprema",
        "Hall da Fama",
        "Multiplicador permanente de XP",
        "Insignia unica",
        "Certificado Supremo",
      ],
    },
  },
];

export const MISSIONS = {
  daily: [
    {
      id: "daily-pushups-30",
      title: "30 flexoes",
      description: "Fazer 30 flexoes.",
      rewardXp: BONUS_XP.dailyChallenge,
      exercises: { pushups: 30 },
    },
    {
      id: "daily-squats-50",
      title: "50 agachamentos",
      description: "Fazer 50 agachamentos.",
      rewardXp: BONUS_XP.dailyChallenge,
      exercises: { squats: 50 },
    },
    {
      id: "daily-abs-30",
      title: "30 abdominais",
      description: "Fazer 30 abdominais.",
      rewardXp: BONUS_XP.dailyChallenge,
      exercises: { abs: 30 },
    },
  ],
  weekly: [
    {
      id: "weekly-squats-500",
      title: "500 agachamentos",
      description: "Fechar 500 agachamentos na semana.",
      rewardXp: 120,
      exercises: { squats: 500 },
    },
    {
      id: "weekly-pushups-300",
      title: "300 flexoes",
      description: "Fechar 300 flexoes na semana.",
      rewardXp: 120,
      exercises: { pushups: 300 },
    },
    {
      id: "weekly-abs-300",
      title: "300 abdominais",
      description: "Fechar 300 abdominais na semana.",
      rewardXp: 120,
      exercises: { abs: 300 },
    },
  ],
  epic: [
    {
      id: "epic-streak-10",
      title: "10 dias sem falhar",
      description: "Manter 10 dias consecutivos ativos.",
      rewardXp: 280,
      minStreak: 10,
      exercises: {},
    },
    {
      id: "epic-pushups-1000",
      title: "1000 flexoes acumuladas",
      description: "Acumular 1000 flexoes.",
      rewardXp: 420,
      exercises: { pushups: 1000 },
    },
    {
      id: "epic-total-5000",
      title: "5000 repeticoes totais",
      description: "Acumular 5000 repeticoes totais.",
      rewardXp: 520,
      exercises: { pushups: 1200, squats: 2200, abs: 1600 },
    },
  ],
};

export const ACHIEVEMENTS = [
  {
    id: "first-workout",
    badge: "🥉",
    name: "Primeiro Treino",
    description: "Primeiro registro de treino concluido.",
    isUnlocked: (profile) => getTotalExercises(profile) > 0,
  },
  {
    id: "streak-7",
    badge: "🥈",
    name: "7 Dias Consecutivos",
    description: "Uma semana inteira sem quebrar.",
    isUnlocked: (profile) => profile.streak >= 7,
  },
  {
    id: "streak-30",
    badge: "🥇",
    name: "30 Dias Consecutivos",
    description: "Um mes inteiro no caminho.",
    isUnlocked: (profile) => profile.streak >= 30,
  },
  {
    id: "pain-warrior",
    badge: "⚔️",
    name: "Guerreiro da Dor",
    description: "5000 repeticoes totais acumuladas.",
    isUnlocked: (profile) => getTotalExercises(profile) >= 5000,
  },
  {
    id: "discipline-master",
    badge: "👑",
    name: "Mestre da Disciplina",
    description: "Chegar ao nivel Mestre.",
    isUnlocked: (profile) => getCurrentLevel(profile).index >= 8,
  },
  {
    id: "relentless",
    badge: "🔥",
    name: "Incansavel",
    description: "100 dias consecutivos ativos.",
    isUnlocked: (profile) => profile.streak >= 100,
  },
  {
    id: "supreme",
    badge: "🌟",
    name: "Supremo",
    description: "Alcancar o nivel SUPREMO.",
    isUnlocked: (profile) => getCurrentLevel(profile).level.name === "SUPREMO" || profile.supremeStars > 0,
  },
];

export const SUPREME_UNLOCKS = [
  "👑 Titulo Supremo",
  "⚡ Aura Suprema",
  "🏆 Hall da Fama",
  "🔥 Multiplicador permanente de XP",
  "💎 Insignia unica",
  "📜 Certificado Supremo",
];

export function createEmptyPlayer() {
  return {
    xp: 0,
    missionsCompleted: 0,
    streak: 0,
    shields: 2,
    shieldCooldown: false,
    totalExercises: {
      pushups: 0,
      squats: 0,
      abs: 0,
    },
    personalBest: {
      pushups: 0,
      squats: 0,
      abs: 0,
    },
    completedMissionIds: [],
    recoveryMission: null,
    supremeStars: 0,
    earnedAchievementIds: [],
    earnedTitles: [LEVELS[0].reward.title],
    rewardedLevelNames: [LEVELS[0].name],
    levelIndex: 0,
  };
}

export function createInitialPlayer() {
  const baseProfile = {
    xp: 2860,
    missionsCompleted: 42,
    streak: 14,
    shields: 4,
    shieldCooldown: false,
    totalExercises: {
      pushups: 820,
      squats: 1030,
      abs: 760,
    },
    personalBest: {
      pushups: 50,
      squats: 100,
      abs: 100,
    },
    completedMissionIds: ["daily-pushups-30", "daily-squats-50"],
    recoveryMission: null,
    supremeStars: 0,
    earnedAchievementIds: [],
    earnedTitles: [],
    rewardedLevelNames: [],
  };

  const levelIndex = getEligibleLevelIndex(baseProfile);
  return {
    ...baseProfile,
    levelIndex,
    rewardedLevelNames: LEVELS.slice(0, levelIndex + 1).map((level) => level.name),
    earnedTitles: LEVELS.slice(0, levelIndex + 1).map((level) => level.reward.title),
  };
}

export function getTotalExercises(profile) {
  return Object.values(profile.totalExercises || {}).reduce((sum, value) => sum + value, 0);
}

export function getEligibleLevelIndex(profile) {
  const totalExercises = getTotalExercises(profile);
  return LEVELS.reduce((highestIndex, level, index) => {
    const { xp, missions, streak, exercises } = level.requirements;
    const eligible =
      profile.xp >= xp &&
      profile.missionsCompleted >= missions &&
      profile.streak >= streak &&
      totalExercises >= exercises;
    return eligible ? index : highestIndex;
  }, 0);
}

export function getCurrentLevel(profile) {
  const index = Math.max(0, Math.min(profile.levelIndex ?? getEligibleLevelIndex(profile), LEVELS.length - 1));
  return { index, level: LEVELS[index] };
}

export function getNextLevel(profile) {
  const { index } = getCurrentLevel(profile);
  return LEVELS[index + 1] ? { index: index + 1, level: LEVELS[index + 1] } : null;
}

export function getRequirementProgress(profile, level) {
  if (!level) return [];
  const totalExercises = getTotalExercises(profile);
  return [
    { label: "XP acumulado", value: profile.xp, max: level.requirements.xp },
    { label: "Missoes concluidas", value: profile.missionsCompleted, max: level.requirements.missions },
    { label: "Sequencia ativa", value: profile.streak, max: level.requirements.streak },
    { label: "Exercicios totais", value: totalExercises, max: level.requirements.exercises },
  ].map((item) => ({
    ...item,
    percent: item.max === 0 ? 100 : Math.min(100, Math.round((item.value / item.max) * 100)),
    complete: item.value >= item.max,
  }));
}

export function getExerciseBaseXp(type, reps) {
  const exercise = EXERCISE_TYPES[type];
  if (!exercise || reps <= 0) return 0;

  let remaining = reps;
  let xp = 0;
  const tiers = [...exercise.rules].sort((a, b) => b.reps - a.reps);
  tiers.forEach((tier) => {
    const sets = Math.floor(remaining / tier.reps);
    if (sets > 0) {
      xp += sets * tier.xp;
      remaining -= sets * tier.reps;
    }
  });

  return xp;
}

export function getStreakTier(days) {
  if (days >= 100) {
    return { flames: 5, label: "100 dias", xpMultiplier: 1.4, bonusLabel: "+40%" };
  }
  if (days >= 30) {
    return { flames: 4, label: "30 dias", xpMultiplier: 1.25, bonusLabel: "+25%" };
  }
  if (days >= 10) {
    return { flames: 3, label: "10 dias", xpMultiplier: 1.15, bonusLabel: "+15%" };
  }
  if (days >= 5) {
    return { flames: 2, label: "5 dias", xpMultiplier: 1.08, bonusLabel: "+8%" };
  }
  if (days >= 1) {
    return { flames: 1, label: "1 dia", xpMultiplier: 1, bonusLabel: "+0%" };
  }
  return { flames: 0, label: "Sem sequencia", xpMultiplier: 1, bonusLabel: "+0%" };
}

export function getStreakFlames(days) {
  const { flames } = getStreakTier(days);
  return flames > 0 ? "🔥".repeat(flames) : "Sem chama";
}

export function getSupremeMultiplier(profile) {
  return getCurrentLevel(profile).level.name === "SUPREMO" || profile.supremeStars > 0 ? 1.5 : 1;
}

export function calculateExerciseXp(type, reps, profile) {
  const baseXp = getExerciseBaseXp(type, reps);
  const streakMultiplier = getStreakTier(profile.streak).xpMultiplier;
  const supremeMultiplier = getSupremeMultiplier(profile);
  const totalXp = Math.round(baseXp * streakMultiplier * supremeMultiplier);

  return {
    baseXp,
    streakMultiplier,
    supremeMultiplier,
    totalXp,
  };
}

export function calculateMissionExerciseXp(mission, profile) {
  return Object.entries(mission.exercises || {}).reduce((sum, [type, reps]) => {
    return sum + calculateExerciseXp(type, reps, profile).totalXp;
  }, 0);
}

export function canCompleteMission(mission, profile) {
  if (profile.completedMissionIds?.includes(mission.id)) return false;
  if (mission.minStreak && profile.streak < mission.minStreak) return false;
  return true;
}

export function canUseShield(profile) {
  return profile.shields > 0 && !profile.shieldCooldown;
}

export function applyLevelRewards(previousProfile, nextProfile) {
  let updated = { ...nextProfile };
  const levelUps = [];
  const rewarded = new Set(previousProfile.rewardedLevelNames || []);
  let currentIndex = getCurrentLevel(previousProfile).index;

  while (true) {
    const eligibleIndex = getEligibleLevelIndex(updated);
    if (eligibleIndex <= currentIndex) break;

    for (let index = currentIndex + 1; index <= eligibleIndex; index += 1) {
      const level = LEVELS[index];
      if (!rewarded.has(level.name)) {
        updated = {
          ...updated,
          xp: updated.xp + level.reward.xpBonus,
          shields: Math.min(SHIELD_LIMIT, updated.shields + level.reward.shields),
          earnedTitles: uniqueValues([...(updated.earnedTitles || []), level.reward.title]),
        };
        rewarded.add(level.name);
        levelUps.push(level);
      }
    }

    currentIndex = eligibleIndex;
    updated = {
      ...updated,
      levelIndex: eligibleIndex,
      rewardedLevelNames: Array.from(rewarded),
    };
  }

  return {
    profile: {
      ...updated,
      levelIndex: Math.max(getCurrentLevel(previousProfile).index, updated.levelIndex ?? currentIndex),
      rewardedLevelNames: Array.from(rewarded),
    },
    levelUps,
  };
}

export function applyAchievementUnlocks(previousProfile, nextProfile) {
  const previousIds = new Set(getUnlockedAchievements(previousProfile).map((achievement) => achievement.id));
  const currentAchievements = getUnlockedAchievements(nextProfile);
  const unlocked = currentAchievements.filter((achievement) => !previousIds.has(achievement.id));
  const earnedAchievementIds = uniqueValues([
    ...(nextProfile.earnedAchievementIds || []),
    ...currentAchievements.map((achievement) => achievement.id),
  ]);

  return {
    achievements: unlocked,
    profile: {
      ...nextProfile,
      earnedAchievementIds,
    },
  };
}

export function getUnlockedAchievements(profile) {
  const earned = new Set(profile.earnedAchievementIds || []);
  return ACHIEVEMENTS.filter((achievement) => earned.has(achievement.id) || achievement.isUnlocked(profile));
}

export function getLockedAchievements(profile) {
  const unlocked = new Set(getUnlockedAchievements(profile).map((achievement) => achievement.id));
  return ACHIEVEMENTS.filter((achievement) => !unlocked.has(achievement.id));
}

export function createRecoveryMission(lostStreak) {
  return {
    lostStreak,
    recoverableStreak: Math.ceil(lostStreak * 0.5),
    expiresInDays: 3,
    goals: {
      pushups: 100,
      squats: 150,
      abs: 100,
    },
    text: "Complete 100 flexoes, 150 agachamentos e 100 abdominais em ate 3 dias para recuperar 50% da sequencia perdida.",
  };
}

export function getPersonalRanking(profile) {
  const totalExercises = getTotalExercises(profile);
  return [
    { label: "Sequencia", value: profile.streak, suffix: "dias" },
    { label: "Flexoes", value: profile.totalExercises.pushups, suffix: "reps" },
    { label: "Agachamentos", value: profile.totalExercises.squats, suffix: "reps" },
    { label: "Abdominais", value: profile.totalExercises.abs, suffix: "reps" },
    { label: "Missoes", value: profile.missionsCompleted, suffix: "feitas" },
    { label: "Total", value: totalExercises, suffix: "reps" },
  ].sort((a, b) => b.value - a.value);
}

export function getLegendaryTitle(stars) {
  if (stars >= 5) return "⭐⭐⭐⭐⭐ Rei da Disciplina";
  if (stars === 4) return "⭐⭐⭐⭐ Supremo IV";
  if (stars === 3) return "⭐⭐⭐ Supremo III";
  if (stars === 2) return "⭐⭐ Supremo II";
  if (stars === 1) return "⭐ Supremo I";
  return "Temporadas bloqueadas";
}

export function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean)));
}
