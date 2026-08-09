"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BANKS,
  getBank,
  type DictionaryEntry,
} from "../dictionary-data";
import type { LearningState, Mastery } from "../learning-progress";
import { stopSpeaking } from "../speech";
import { MasteryButtons } from "./mastery-buttons";

type AutoplayPanelProps = {
  entries: DictionaryEntry[];
  initialBankId: string;
  learningState: LearningState;
  onBankChange: (bankId: string) => void;
  onMastery: (lessonId: number, mastery: Mastery) => void;
  onFavorite: (lessonId: number) => void;
  onClose: () => void;
};

function speakAutoplayEntry(
  entry: DictionaryEntry,
  rate: number,
  onComplete: () => void,
) {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    typeof SpeechSynthesisUtterance === "undefined"
  ) {
    return false;
  }

  stopSpeaking();
  const sequence = [
    { text: entry.phrase, lang: "en-US", rate },
    { text: entry.meaning, lang: "zh-CN", rate: 1 },
    { text: entry.example, lang: "en-US", rate },
  ];

  sequence.forEach((part, index) => {
    const utterance = new SpeechSynthesisUtterance(part.text);
    utterance.lang = part.lang;
    utterance.rate = part.rate;
    if (index === sequence.length - 1) {
      utterance.onend = onComplete;
      utterance.onerror = onComplete;
    }
    window.speechSynthesis.speak(utterance);
  });
  return true;
}

export function AutoplayPanel({
  entries,
  initialBankId,
  learningState,
  onBankChange,
  onMastery,
  onFavorite,
  onClose,
}: AutoplayPanelProps) {
  const [bankId, setBankId] = useState(() =>
    initialBankId === "all" ||
    entries.some((candidate) => candidate.bankId === initialBankId)
      ? initialBankId
      : "all",
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [rate, setRate] = useState(0.92);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const availableBanks = useMemo(() => {
    const availableIds = new Set(entries.map((candidate) => candidate.bankId));
    return BANKS.filter((candidate) => availableIds.has(candidate.id));
  }, [entries]);

  const queue = useMemo(
    () => entries.filter((entry) => bankId === "all" || entry.bankId === bankId),
    [bankId, entries],
  );
  const entry = queue[index % Math.max(queue.length, 1)];

  useEffect(() => {
    if (!playing || !entry) return;

    const supported = speakAutoplayEntry(entry, rate, () => {
      nextTimer.current = setTimeout(() => {
        setIndex((current) => (current + 1) % queue.length);
      }, 800);
    });
    if (!supported) setPlaying(false);

    return () => {
      stopSpeaking();
      if (nextTimer.current) clearTimeout(nextTimer.current);
    };
  }, [entry, playing, queue.length, rate]);

  useEffect(
    () => () => {
      stopSpeaking();
      if (nextTimer.current) clearTimeout(nextTimer.current);
    },
    [],
  );

  if (!entry) return null;

  const bank = getBank(entry.bankId);
  const favorite = learningState.favorites.includes(entry.id);
  const goTo = (nextIndex: number) => {
    stopSpeaking();
    setIndex((nextIndex + queue.length) % queue.length);
  };

  return (
    <div className="autoplay-overlay" role="dialog" aria-modal="true" aria-label="自动背词">
      <header className="autoplay-header">
        <div>
          <span className="brand-diamond" aria-hidden="true" />
          <strong>自动背词</strong>
          <small>AUTOPLAY</small>
        </div>
        <button type="button" onClick={onClose} aria-label="关闭自动背词">
          关闭 ×
        </button>
      </header>

      <div className="autoplay-toolbar">
        <label>
          <span>词库</span>
          <select
            value={bankId}
            onChange={(event) => {
              const nextBank = event.target.value;
              setBankId(nextBank);
              setIndex(0);
              onBankChange(nextBank);
            }}
          >
            <option value="all">全部词库</option>
            {availableBanks.map((candidate) => (
              <option value={candidate.id} key={candidate.id}>
                {candidate.title}
              </option>
            ))}
          </select>
        </label>
        <div className="autoplay-rate" aria-label="播放速度">
          {[0.75, 0.92, 1.15].map((option) => (
            <button
              type="button"
              className={rate === option ? "is-active" : ""}
              key={option}
              aria-pressed={rate === option}
              onClick={() => setRate(option)}
            >
              {option === 0.75 ? "慢" : option === 0.92 ? "标准" : "快"}
            </button>
          ))}
        </div>
      </div>

      <main className="autoplay-stage">
        <div className="autoplay-progress-copy">
          <span>{bank?.title ?? "全部词库"}</span>
          <strong>
            {index + 1} / {queue.length}
          </strong>
        </div>
        <div className="autoplay-progress" aria-hidden="true">
          <span style={{ width: `${((index + 1) / queue.length) * 100}%` }} />
        </div>

        <article className="autoplay-card">
          <p className="eyebrow">{bank?.englishTitle ?? "ENGLISH BANK"}</p>
          <h2>{entry.phrase}</h2>
          {entry.ipa && <p className="autoplay-ipa">{entry.ipa}</p>}
          <p className="autoplay-meaning">{entry.meaning}</p>
          <div className="autoplay-example">
            <p>{entry.example}</p>
            <span>{entry.translation}</span>
          </div>
          <p className="autoplay-note">{entry.note}</p>

          <div className="autoplay-card-actions">
            <MasteryButtons
              value={learningState.records[entry.id]?.mastery}
              onChange={(mastery) => onMastery(entry.id, mastery)}
            />
            <button
              className={`autoplay-favorite${favorite ? " is-active" : ""}`}
              type="button"
              aria-pressed={favorite}
              onClick={() => onFavorite(entry.id)}
            >
              {favorite ? "★ 已收藏" : "☆ 收藏"}
            </button>
          </div>
        </article>

        <div className="autoplay-controls">
          <button type="button" onClick={() => goTo(index - 1)} aria-label="上一条">
            ←
          </button>
          <button
            className="play-toggle"
            type="button"
            aria-label={playing ? "暂停" : "继续播放"}
            onClick={() => {
              if (playing) stopSpeaking();
              setPlaying((current) => !current);
            }}
          >
            {playing ? "Ⅱ" : "▶"}
          </button>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="下一条">
            →
          </button>
        </div>
      </main>
    </div>
  );
}
