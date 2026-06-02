// Gamification utility — pure functions extracted from fuel.tsx for testability

export const WALK_POINTS = 50;
export const WATER_POINTS = 20;
export const CALORIE_GOAL_POINTS = 10;
export const PROTEIN_GOAL_POINTS = 10;
export const WALK_CALORIE_BURN = 80;

export const getToday = (): string => new Date().toISOString().split("T")[0];

export const getYesterday = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

export interface StreakResult {
  newStreak: number;
  shouldUpdate: boolean;
}

export const calculateNewStreak = (
  lastActiveDate: string,
  currentStreak: number,
  today: string,
  yesterday: string
): StreakResult => {
  if (lastActiveDate === today) {
    return { newStreak: currentStreak, shouldUpdate: false };
  }
  const newStreak = lastActiveDate === yesterday ? currentStreak + 1 : 1;
  return { newStreak, shouldUpdate: true };
};

export const calculateNewLongest = (
  currentLongest: number,
  newStreak: number
): number => Math.max(currentLongest, newStreak);

export const isValidPositiveNumber = (input: string): boolean => {
  const amount = Number(input);
  return !!amount && amount > 0;
};
