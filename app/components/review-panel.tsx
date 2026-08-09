"use client";

import { useState } from "react";
import { getBank, type DictionaryEntry } from "../dictionary-data";
import type { LearningState, Mastery } from "../learning-progress";
import { speakEnglish } from "../speech";
import { MasteryButtons } from "./mastery-buttons";

type ReviewPanelProps = {
  dueEntries: DictionaryEntry[];
  learningState: LearningState;
  onMastery: (lessonId: number, mastery: Mastery) => void;
  onOpenDictionary: () => void;
};

export function ReviewPanel({
  dueEntries,
  learningState,
  onMastery,
  onOpenDictionary,
}: ReviewPanelProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const safeIndex = dueEntries.length ? index % dueEntries.length : 0;
  const entry = dueEntries[safeIndex];

  const answer = (mastery: Mastery) => {
    if (!entry) return;
    onMastery(entry.id, mastery);
    setRevealed(false);
    setIndex((current) => (current + 1) % Math.max(1, dueEntries.length));
  };

  return (
    <main id="main-content" className="view-shell review-view">
      <header className="section-heading">
        <p className="eyebrow">SPACED REVIEW / LOCAL PROGRESS</p>
        <div>
          <h1>到期复习</h1>
          <p>这是辅助功能：三色判断会决定内容何时再次出现，记录只保存在当前浏览器。</p>
        </div>
      </header>

      {!entry ? (
        <section className="empty-state review-empty">
          <span aria-hidden="true">✓</span>
          <h2>今天的队列已经清空</h2>
          <p>去词库标记新内容，或在单词大冒险里继续积累。</p>
          <button className="primary-button" type="button" onClick={onOpenDictionary}>
            打开英语词库
          </button>
        </section>
      ) : (
        <section className="review-session">
          <div className="review-session-head">
            <span>{getBank(entry.bankId)?.title}</span>
            <strong>{safeIndex + 1} / {dueEntries.length}</strong>
          </div>
          <article className={`review-card${revealed ? " is-revealed" : ""}`}>
            <button
              className="review-listen"
              type="button"
              aria-label={`朗读 ${entry.phrase}`}
              onClick={() => speakEnglish(entry.phrase)}
            >
              ▶
            </button>
            <h2>{entry.phrase}</h2>
            {entry.ipa && <p>{entry.ipa}</p>}

            {!revealed ? (
              <button className="reveal-button" type="button" onClick={() => setRevealed(true)}>
                想一想，再看答案
              </button>
            ) : (
              <div className="review-answer">
                <strong>{entry.meaning}</strong>
                <p>{entry.example}</p>
                <span>{entry.translation}</span>
                <MasteryButtons
                  value={learningState.records[entry.id]?.mastery}
                  onChange={answer}
                />
              </div>
            )}
          </article>
        </section>
      )}
    </main>
  );
}
