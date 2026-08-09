"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EMPTY_LEARNING_STATE,
  loadLearningState,
  saveLearningState,
  toggleFavorite,
  updateMastery,
  type Mastery,
} from "./learning-progress";

export function useLearningProgress() {
  const [state, setState] = useState(EMPTY_LEARNING_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Persisted progress exists only after hydration; this is the intentional
    // client-store synchronization boundary.
    /* eslint-disable react-hooks/set-state-in-effect */
    setState(loadLearningState());
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (ready) saveLearningState(state);
  }, [ready, state]);

  const markLesson = useCallback((lessonId: number, mastery: Mastery) => {
    setState((current) => updateMastery(current, lessonId, mastery));
  }, []);

  const favoriteLesson = useCallback((lessonId: number) => {
    setState((current) => toggleFavorite(current, lessonId));
  }, []);

  return { state, ready, markLesson, favoriteLesson };
}
