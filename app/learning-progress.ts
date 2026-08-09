import type { Lesson } from "./learning-data";

export type Mastery = "unknown" | "learning" | "mastered";

export type ProgressRecord = {
  mastery: Mastery;
  reviewCount: number;
  lastReviewed: string;
  nextReview: string;
};

export type LearningState = {
  records: Record<number, ProgressRecord>;
  favorites: number[];
};

export const EMPTY_LEARNING_STATE: LearningState = {
  records: {},
  favorites: [],
};

const STORAGE_KEY = "xingxiaozhi-english-corner:v1";
const REVIEW_INTERVALS: Record<Mastery, number> = {
  unknown: 0,
  learning: 2,
  mastered: 7,
};

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

export function loadLearningState(): LearningState {
  if (typeof window === "undefined") return EMPTY_LEARNING_STATE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_LEARNING_STATE;
    const parsed = JSON.parse(raw) as Partial<LearningState>;

    return {
      records:
        parsed.records && typeof parsed.records === "object"
          ? parsed.records
          : {},
      favorites: Array.isArray(parsed.favorites)
        ? parsed.favorites.filter((id): id is number => Number.isInteger(id))
        : [],
    };
  } catch {
    return EMPTY_LEARNING_STATE;
  }
}

export function saveLearningState(state: LearningState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Learning still works in-memory when storage is blocked or full.
  }
}

export function updateMastery(
  state: LearningState,
  lessonId: number,
  mastery: Mastery,
): LearningState {
  const previous = state.records[lessonId];

  return {
    ...state,
    records: {
      ...state.records,
      [lessonId]: {
        mastery,
        reviewCount: (previous?.reviewCount ?? 0) + 1,
        lastReviewed: dateKey(new Date()),
        nextReview: addDays(REVIEW_INTERVALS[mastery]),
      },
    },
  };
}

export function toggleFavorite(
  state: LearningState,
  lessonId: number,
): LearningState {
  const exists = state.favorites.includes(lessonId);
  return {
    ...state,
    favorites: exists
      ? state.favorites.filter((id) => id !== lessonId)
      : [...state.favorites, lessonId],
  };
}

export function getDueLessons<T extends Lesson>(
  lessons: T[],
  state: LearningState,
): T[] {
  const today = dateKey(new Date());
  return lessons.filter((lesson) => {
    const record = state.records[lesson.id];
    return record && record.nextReview <= today;
  });
}

export function getLearningStats(lessons: Lesson[], state: LearningState) {
  const records = Object.values(state.records);
  return {
    touched: records.length,
    due: getDueLessons(lessons, state).length,
    mastered: records.filter((record) => record.mastery === "mastered").length,
    favorite: state.favorites.length,
    completion: Math.round((records.length / lessons.length) * 100),
  };
}
