import { describe, expect, it } from "vitest";
import {
  BONUS_XP,
  LEVELS,
  SHIELD_LIMIT,
  applyLevelRewards,
  canUseShield,
  createEmptyPlayer,
  createInitialPlayer,
  getExerciseBaseXp,
  getStreakFlames,
} from "@/data/gamification.js";

describe("discipline RPG rules", () => {
  it("creates a zeroed player with only the initial Honor Shields", () => {
    const player = createEmptyPlayer();

    expect(player).toMatchObject({
      xp: 0,
      missionsCompleted: 0,
      streak: 0,
      shields: 2,
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
      earnedAchievementIds: [],
      levelIndex: 0,
    });
  });

  it("keeps the complete 15-level ladder ending at SUPREMO", () => {
    expect(LEVELS).toHaveLength(15);
    expect(LEVELS.map((level) => level.name)).toEqual([
      "Recruta",
      "Aprendiz",
      "Guerreiro",
      "Combatente",
      "Elite",
      "Veterano",
      "Gladiador",
      "Campeao",
      "Mestre",
      "Lendario",
      "Imortal",
      "Ascendente",
      "Divino",
      "Transcendente",
      "SUPREMO",
    ]);
  });

  it("calculates exercise XP from the configured tiers", () => {
    expect(getExerciseBaseXp("pushups", 10)).toBe(5);
    expect(getExerciseBaseXp("pushups", 30)).toBe(15);
    expect(getExerciseBaseXp("pushups", 100)).toBe(70);
    expect(getExerciseBaseXp("squats", 200)).toBe(80);
    expect(getExerciseBaseXp("abs", 250)).toBe(95);
  });

  it("maps streaks to fire tiers", () => {
    expect(getStreakFlames(0)).toBe("Sem chama");
    expect(getStreakFlames(1)).toBe("🔥");
    expect(getStreakFlames(5)).toBe("🔥🔥");
    expect(getStreakFlames(10)).toBe("🔥🔥🔥");
    expect(getStreakFlames(30)).toBe("🔥🔥🔥🔥");
    expect(getStreakFlames(100)).toBe("🔥🔥🔥🔥🔥");
  });

  it("blocks consecutive Honor Shield usage", () => {
    expect(canUseShield({ shields: 1, shieldCooldown: false })).toBe(true);
    expect(canUseShield({ shields: 1, shieldCooldown: true })).toBe(false);
    expect(canUseShield({ shields: 0, shieldCooldown: false })).toBe(false);
  });

  it("grants XP and shields when a new level is earned", () => {
    const previous = createInitialPlayer();
    const next = {
      ...previous,
      xp: 4300,
      missionsCompleted: 65,
      streak: 21,
      shields: SHIELD_LIMIT - 1,
      totalExercises: {
        pushups: 1600,
        squats: 1600,
        abs: 900,
      },
    };

    const result = applyLevelRewards(previous, next);

    expect(result.levelUps.map((level) => level.name)).toContain("Gladiador");
    expect(result.profile.xp).toBeGreaterThan(next.xp);
    expect(result.profile.shields).toBe(SHIELD_LIMIT);
  });

  it("keeps configured bonus XP values stable", () => {
    expect(BONUS_XP).toMatchObject({
      dailyChallenge: 20,
      sevenDayStreak: 100,
      thirtyDayStreak: 500,
      personalRecord: 50,
    });
  });
});
