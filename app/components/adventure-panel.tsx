"use client";

import { useMemo, useState } from "react";
import {
  BANKS,
  getBank,
  type DictionaryEntry,
} from "../dictionary-data";
import type { LearningState, Mastery } from "../learning-progress";
import { speakEnglish } from "../speech";

type AdventurePanelProps = {
  entries: DictionaryEntry[];
  bankId: string;
  learningState: LearningState;
  onBankChange: (bankId: string) => void;
  onMastery: (lessonId: number, mastery: Mastery) => void;
};

type AdventureQuestion = {
  entry: DictionaryEntry;
  options: DictionaryEntry[];
};

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next;
}

function buildQuestions(entries: DictionaryEntry[]): AdventureQuestion[] {
  const selected = shuffle(entries).slice(0, Math.min(10, entries.length));
  return selected.map((entry) => {
    const distractors = shuffle(
      entries.filter(
        (candidate) => candidate.id !== entry.id && candidate.meaning !== entry.meaning,
      ),
    ).slice(0, 3);
    return { entry, options: shuffle([entry, ...distractors]) };
  });
}

export function AdventurePanel({
  entries,
  bankId,
  learningState,
  onBankChange,
  onMastery,
}: AdventurePanelProps) {
  const [questions, setQuestions] = useState<AdventureQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rightCount, setRightCount] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [combo, setCombo] = useState(0);

  const pool = useMemo(
    () => entries.filter((entry) => bankId === "all" || entry.bankId === bankId),
    [bankId, entries],
  );
  const current = questions[index];
  const finished = questions.length > 0 && index >= questions.length;

  const start = () => {
    const nextQuestions = buildQuestions(pool);
    setQuestions(nextQuestions);
    setIndex(0);
    setSelectedId(null);
    setRightCount(0);
    setEnergy(0);
    setCombo(0);
  };

  const answer = (option: DictionaryEntry) => {
    if (!current || selectedId !== null) return;
    const correct = option.id === current.entry.id;
    setSelectedId(option.id);

    if (correct) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setRightCount((count) => count + 1);
      setEnergy((score) => score + 100 + Math.max(0, nextCombo - 1) * 20);
      const previous = learningState.records[current.entry.id]?.mastery;
      onMastery(current.entry.id, previous === "learning" ? "mastered" : "learning");
    } else {
      setCombo(0);
      onMastery(current.entry.id, "unknown");
    }
  };

  const next = () => {
    setSelectedId(null);
    setIndex((currentIndex) => currentIndex + 1);
  };

  return (
    <main id="main-content" className="view-shell adventure-view">
      <header className="section-heading adventure-heading">
        <p className="eyebrow">WORD ADVENTURE / TEN STAGES</p>
        <div>
          <h1>单词大冒险</h1>
          <p>从一个词库出发，连续闯过十个节点。答错的内容会自动进入今天的复习队列。</p>
        </div>
      </header>

      {!questions.length && (
        <section className="adventure-start">
          <div className="adventure-map" aria-hidden="true">
            {Array.from({ length: 10 }, (_, mapIndex) => (
              <span key={mapIndex} className={mapIndex === 9 ? "map-goal" : ""}>
                {mapIndex === 9 ? "⚑" : mapIndex + 1}
              </span>
            ))}
          </div>
          <div className="adventure-brief">
            <p className="eyebrow">CHOOSE YOUR TERRITORY</p>
            <h2>选择本次闯关词库</h2>
            <select value={bankId} onChange={(event) => onBankChange(event.target.value)}>
              <option value="all">混合全部词库 · {entries.length} 条</option>
              {BANKS.map((bank) => (
                <option value={bank.id} key={bank.id}>
                  {bank.title} · {entries.filter((entry) => entry.bankId === bank.id).length} 条
                </option>
              ))}
            </select>
            <div className="adventure-rules">
              <span><b>10</b> 个关卡</span>
              <span><b>+100</b> 基础能量</span>
              <span><b>COMBO</b> 连对加成</span>
            </div>
            <button className="primary-button" type="button" onClick={start} disabled={pool.length < 4}>
              开始冒险 →
            </button>
          </div>
        </section>
      )}

      {current && !finished && (
        <section className="adventure-game" aria-live="polite">
          <div className="adventure-hud">
            <div>
              <span>STAGE</span>
              <strong>{index + 1} / {questions.length}</strong>
            </div>
            <div>
              <span>ENERGY</span>
              <strong>{energy}</strong>
            </div>
            <div>
              <span>COMBO</span>
              <strong>×{combo}</strong>
            </div>
          </div>

          <div className="adventure-path" aria-hidden="true">
            {questions.map((question, questionIndex) => (
              <span
                key={question.entry.id}
                className={
                  questionIndex < index
                    ? "is-done"
                    : questionIndex === index
                      ? "is-current"
                      : ""
                }
              />
            ))}
          </div>

          <article className="adventure-question">
            <p className="eyebrow">{getBank(current.entry.bankId)?.title}</p>
            <button
              className="adventure-word"
              type="button"
              onClick={() => speakEnglish(current.entry.phrase)}
              aria-label={`朗读 ${current.entry.phrase}`}
            >
              <strong>{current.entry.phrase}</strong>
              <span>▶ 点击听发音</span>
            </button>
            <p>选择最准确的中文含义</p>

            <div className="adventure-options">
              {current.options.map((option, optionIndex) => {
                const isCorrect = option.id === current.entry.id;
                const isSelected = option.id === selectedId;
                const className =
                  selectedId === null
                    ? ""
                    : isCorrect
                      ? "is-correct"
                      : isSelected
                        ? "is-wrong"
                        : "is-muted";
                return (
                  <button
                    type="button"
                    className={className}
                    disabled={selectedId !== null}
                    key={option.id}
                    onClick={() => answer(option)}
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    {option.meaning}
                  </button>
                );
              })}
            </div>

            {selectedId !== null && (
              <div
                className={
                  selectedId === current.entry.id
                    ? "adventure-feedback is-correct"
                    : "adventure-feedback is-wrong"
                }
              >
                <div>
                  <strong>
                    {selectedId === current.entry.id ? "命中！" : "这条会再出现"}
                  </strong>
                  <p>{current.entry.example}</p>
                  <span>{current.entry.translation}</span>
                </div>
                <button type="button" onClick={next}>
                  {index + 1 === questions.length ? "查看战果" : "下一关 →"}
                </button>
              </div>
            )}
          </article>
        </section>
      )}

      {finished && (
        <section className="adventure-result">
          <span aria-hidden="true">⚑</span>
          <p className="eyebrow">EXPEDITION COMPLETE</p>
          <h2>{rightCount >= 8 ? "路线已打通。" : "地图已经亮起来了。"}</h2>
          <p>
            答对 {rightCount} / {questions.length} · 获得 {energy} 能量
          </p>
          <div>
            <button className="primary-button" type="button" onClick={start}>
              再闯一次
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setQuestions([]);
                setIndex(0);
              }}
            >
              更换词库
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
