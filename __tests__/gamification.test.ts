/**
 * TDD Unit Tests – Gamification Logic
 * User Story: As a user, I want to earn points for completing daily tasks
 *             and maintain a daily streak so I stay motivated.
 *
 * These tests were written BEFORE the implementation (TDD Red phase).
 */

import {
  calculateNewStreak,
  calculateNewLongest,
  isValidPositiveNumber,
  WALK_POINTS,
  WATER_POINTS,
  CALORIE_GOAL_POINTS,
  PROTEIN_GOAL_POINTS,
  WALK_CALORIE_BURN,
} from "../utils/gamification";

// ─── Streak Logic ────────────────────────────────────────────────────────────

describe("calculateNewStreak", () => {
  const TODAY = "2026-06-02";
  const YESTERDAY = "2026-06-01";
  const TWO_DAYS_AGO = "2026-05-31";

  test("increments streak by 1 when completing a task on a consecutive day", () => {
    const result = calculateNewStreak(YESTERDAY, 4, TODAY, YESTERDAY);
    expect(result.shouldUpdate).toBe(true);
    expect(result.newStreak).toBe(5);
  });

  test("resets streak to 1 when a day has been skipped", () => {
    const result = calculateNewStreak(TWO_DAYS_AGO, 4, TODAY, YESTERDAY);
    expect(result.shouldUpdate).toBe(true);
    expect(result.newStreak).toBe(1);
  });

  test("does not update streak if task already completed today", () => {
    const result = calculateNewStreak(TODAY, 4, TODAY, YESTERDAY);
    expect(result.shouldUpdate).toBe(false);
    expect(result.newStreak).toBe(4);
  });

  test("starts streak at 1 on first ever task completion", () => {
    const result = calculateNewStreak("", 0, TODAY, YESTERDAY);
    expect(result.shouldUpdate).toBe(true);
    expect(result.newStreak).toBe(1);
  });
});

// ─── Longest Streak ───────────────────────────────────────────────────────────

describe("calculateNewLongest", () => {
  test("updates longest streak when new streak exceeds previous best", () => {
    expect(calculateNewLongest(5, 6)).toBe(6);
  });

  test("keeps previous longest streak when new streak is lower", () => {
    expect(calculateNewLongest(10, 3)).toBe(10);
  });

  test("keeps longest when streaks are equal", () => {
    expect(calculateNewLongest(5, 5)).toBe(5);
  });
});

// ─── Points Constants ─────────────────────────────────────────────────────────

describe("points constants", () => {
  test("WALK_POINTS is 50", () => {
    expect(WALK_POINTS).toBe(50);
  });

  test("WATER_POINTS is 20 per glass", () => {
    expect(WATER_POINTS).toBe(20);
  });

  test("CALORIE_GOAL_POINTS is 10 (one-time reward for reaching goal)", () => {
    expect(CALORIE_GOAL_POINTS).toBe(10);
  });

  test("PROTEIN_GOAL_POINTS is 10 (one-time reward for reaching goal)", () => {
    expect(PROTEIN_GOAL_POINTS).toBe(10);
  });

  test("WALK_CALORIE_BURN is 80 kcal", () => {
    expect(WALK_CALORIE_BURN).toBe(80);
  });
});

// ─── Input Validation ────────────────────────────────────────────────────────

describe("isValidPositiveNumber", () => {
  test("returns true for a valid positive number string", () => {
    expect(isValidPositiveNumber("200")).toBe(true);
  });

  test("returns false for empty string", () => {
    expect(isValidPositiveNumber("")).toBe(false);
  });

  test("returns false for zero", () => {
    expect(isValidPositiveNumber("0")).toBe(false);
  });

  test("returns false for a negative number", () => {
    expect(isValidPositiveNumber("-50")).toBe(false);
  });

  test("returns false for non-numeric string", () => {
    expect(isValidPositiveNumber("abc")).toBe(false);
  });
});
