"use client";

import { useMemo, useState } from "react";
import {
  BANKS,
  type BankKind,
  type DictionaryEntry,
} from "../dictionary-data";
import type { LearningState, Mastery } from "../learning-progress";
import { LessonCard } from "./lesson-card";

type DictionaryPanelProps = {
  entries: DictionaryEntry[];
  learningState: LearningState;
  query: string;
  bankId: string;
  onQueryChange: (query: string) => void;
  onBankChange: (bankId: string) => void;
  onMastery: (lessonId: number, mastery: Mastery) => void;
  onFavorite: (lessonId: number) => void;
  onAutoplay: (entries: DictionaryEntry[]) => void;
};

const KIND_OPTIONS: Array<"全部" | BankKind> = [
  "全部",
  "职场岗位",
  "场景",
  "通用",
];

function matchesQuery(entry: DictionaryEntry, rawQuery: string) {
  const query = rawQuery.trim().toLocaleLowerCase();
  if (!query) return true;
  return [
    entry.phrase,
    entry.meaning,
    entry.example,
    entry.translation,
    entry.note,
  ].some((value) => value.toLocaleLowerCase().includes(query));
}

export function DictionaryPanel({
  entries,
  learningState,
  query,
  bankId,
  onQueryChange,
  onBankChange,
  onMastery,
  onFavorite,
  onAutoplay,
}: DictionaryPanelProps) {
  const [kind, setKind] = useState<(typeof KIND_OPTIONS)[number]>("全部");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);

  const visibleBanks = useMemo(
    () => BANKS.filter((bank) => kind === "全部" || bank.kind === kind),
    [kind],
  );

  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) => {
        const bank = BANKS.find((candidate) => candidate.id === entry.bankId);
        const kindMatches = kind === "全部" || bank?.kind === kind;
        const bankMatches = bankId === "all" || entry.bankId === bankId;
        const favoriteMatches =
          !favoriteOnly || learningState.favorites.includes(entry.id);
        return (
          kindMatches &&
          bankMatches &&
          favoriteMatches &&
          matchesQuery(entry, query)
        );
      }),
    [bankId, entries, favoriteOnly, kind, learningState.favorites, query],
  );

  const selectKind = (nextKind: (typeof KIND_OPTIONS)[number]) => {
    setKind(nextKind);
    setVisibleCount(24);
    if (
      bankId !== "all" &&
      !BANKS.some(
        (bank) =>
          bank.id === bankId && (nextKind === "全部" || bank.kind === nextKind),
      )
    ) {
      onBankChange("all");
    }
  };

  return (
    <main id="main-content" className="view-shell dictionary-view">
      <header className="section-heading">
        <p className="eyebrow">LOOK UP / LISTEN / MARK</p>
        <div>
          <h1>英语词库</h1>
          <p>先按岗位或场景选词库，再查词。等级不是主轴，使用语境才是。</p>
        </div>
      </header>

      <section className="dictionary-toolbar" aria-label="词库筛选">
        <div className="dictionary-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="搜英文、中文、例句或用法"
            value={query}
            onChange={(event) => {
              onQueryChange(event.target.value);
              setVisibleCount(24);
            }}
          />
          {query && (
            <button type="button" onClick={() => onQueryChange("")}>
              清除
            </button>
          )}
        </div>

        <div className="filter-row" aria-label="词库类型">
          {KIND_OPTIONS.map((option) => (
            <button
              type="button"
              className={kind === option ? "is-active" : ""}
              aria-pressed={kind === option}
              key={option}
              onClick={() => selectKind(option)}
            >
              {option}
            </button>
          ))}
          <button
            type="button"
            className={favoriteOnly ? "is-active favorite-filter" : "favorite-filter"}
            aria-pressed={favoriteOnly}
            onClick={() => setFavoriteOnly((current) => !current)}
          >
            ★ 我的收藏
          </button>
        </div>

        <div className="bank-tabs" aria-label="选择词库">
          <button
            type="button"
            className={bankId === "all" ? "is-active" : ""}
            onClick={() => {
              onBankChange("all");
              setVisibleCount(24);
            }}
          >
            全部词库
          </button>
          {visibleBanks.map((bank) => (
            <button
              type="button"
              className={bankId === bank.id ? "is-active" : ""}
              key={bank.id}
              onClick={() => {
                onBankChange(bank.id);
                setVisibleCount(24);
              }}
            >
              <span>{bank.title}</span>
              <small>{bank.englishTitle}</small>
            </button>
          ))}
        </div>
      </section>

      <div className="dictionary-results-head">
        <p>
          <strong>{filteredEntries.length}</strong> 条表达
        </p>
        <button
          type="button"
          disabled={!filteredEntries.length}
          onClick={() => onAutoplay(filteredEntries)}
        >
          ◉ 连播当前词库
        </button>
      </div>

      {filteredEntries.length ? (
        <section className="lesson-grid" aria-live="polite">
          {filteredEntries.slice(0, visibleCount).map((entry) => (
            <LessonCard
              key={entry.id}
              lesson={entry}
              mastery={learningState.records[entry.id]?.mastery}
              favorite={learningState.favorites.includes(entry.id)}
              onMastery={(mastery) => onMastery(entry.id, mastery)}
              onFavorite={() => onFavorite(entry.id)}
            />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <span aria-hidden="true">⌕</span>
          <h2>没有匹配结果</h2>
          <p>换一个词库、岗位或更短的关键词试试。</p>
        </section>
      )}

      {visibleCount < filteredEntries.length && (
        <button
          className="load-more"
          type="button"
          onClick={() => setVisibleCount((count) => count + 24)}
        >
          再显示 24 条
        </button>
      )}
    </main>
  );
}
