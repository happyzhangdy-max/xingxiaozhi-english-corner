"use client";

import { useMemo, useState } from "react";
import {
  BANKS,
  DICTIONARY_ENTRIES,
  type DictionaryEntry,
} from "./dictionary-data";
import { getDueLessons, getLearningStats } from "./learning-progress";
import { useLearningProgress } from "./use-learning-progress";
import { AdventurePanel } from "./components/adventure-panel";
import { AutoplayPanel } from "./components/autoplay-panel";
import { DictionaryPanel } from "./components/dictionary-panel";
import { HomePanel } from "./components/home-panel";
import { ReviewPanel } from "./components/review-panel";
import { ScanPanel } from "./components/scan-panel";
import { ThemeToggle } from "./components/theme-toggle";
import type { AppView } from "./components/types";

const PRIMARY_NAV: Array<{ view: AppView; label: string; short: string }> = [
  { view: "home", label: "首页", short: "HOME" },
  { view: "dictionary", label: "查词", short: "LOOK UP" },
  { view: "scan", label: "识图", short: "SCAN" },
  { view: "adventure", label: "大冒险", short: "PLAY" },
];

const NIHONGO_URL =
  process.env.NEXT_PUBLIC_NIHONGO_URL ??
  "https://nihongo.xn--9iq784ays8a.com/";

function searchEntries(query: string) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return [];
  return DICTIONARY_ENTRIES.filter((entry) =>
    [entry.phrase, entry.meaning, entry.example, entry.translation, entry.note].some(
      (value) => value.toLocaleLowerCase().includes(normalized),
    ),
  );
}

export function EnglishCorner() {
  const [view, setView] = useState<AppView>("home");
  const [query, setQuery] = useState("");
  const [bankId, setBankId] = useState("all");
  const [autoplayOpen, setAutoplayOpen] = useState(false);
  const [autoplayEntries, setAutoplayEntries] =
    useState<DictionaryEntry[]>(DICTIONARY_ENTRIES);
  const { state, markLesson, favoriteLesson } = useLearningProgress();

  const stats = useMemo(
    () => getLearningStats(DICTIONARY_ENTRIES, state),
    [state],
  );
  const dueEntries = useMemo(
    () => getDueLessons(DICTIONARY_ENTRIES, state),
    [state],
  );
  const homeSearchResults = useMemo(() => searchEntries(query), [query]);

  const navigate = (nextView: AppView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAutoplay = (entries = DICTIONARY_ENTRIES) => {
    setAutoplayEntries(entries.length ? entries : DICTIONARY_ENTRIES);
    setAutoplayOpen(true);
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>

      <header className="site-header">
        <button className="site-brand" type="button" onClick={() => navigate("home")}>
          <span className="brand-diamond" aria-hidden="true" />
          <span>
            <strong>行小之 · 英语角</strong>
            <small>ENGLISH PRACTICE FIELD</small>
          </span>
        </button>

        <nav className="primary-nav" aria-label="主要功能">
          {PRIMARY_NAV.map((item) => (
            <button
              type="button"
              key={item.view}
              className={view === item.view ? "is-active" : ""}
              aria-current={view === item.view ? "page" : undefined}
              onClick={() => navigate(item.view)}
            >
              <span>{item.label}</span>
              <small>{item.short}</small>
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="header-language" href={NIHONGO_URL}>
            <span>日语角</span>
            <small>日本語</small>
          </a>
          <button className="header-autoplay" type="button" onClick={() => openAutoplay()}>
            <span aria-hidden="true">◉</span>
            自动背词
          </button>
        </div>
      </header>

      {view === "home" && (
        <HomePanel
          stats={stats}
          query={query}
          searchResults={homeSearchResults}
          onQueryChange={setQuery}
          onNavigate={navigate}
          onOpenAutoplay={() => openAutoplay()}
        />
      )}

      {view === "dictionary" && (
        <DictionaryPanel
          entries={DICTIONARY_ENTRIES}
          learningState={state}
          query={query}
          bankId={bankId}
          onQueryChange={setQuery}
          onBankChange={setBankId}
          onMastery={markLesson}
          onFavorite={favoriteLesson}
          onAutoplay={openAutoplay}
        />
      )}

      {view === "scan" && (
        <ScanPanel
          entries={DICTIONARY_ENTRIES}
          learningState={state}
          onMastery={markLesson}
          onFavorite={favoriteLesson}
          onLookup={(nextQuery) => {
            setQuery(nextQuery);
            navigate("dictionary");
          }}
        />
      )}

      {view === "review" && (
        <ReviewPanel
          dueEntries={dueEntries}
          learningState={state}
          onMastery={markLesson}
          onOpenDictionary={() => navigate("dictionary")}
        />
      )}

      {view === "adventure" && (
        <AdventurePanel
          entries={DICTIONARY_ENTRIES}
          bankId={bankId}
          learningState={state}
          onBankChange={setBankId}
          onMastery={markLesson}
        />
      )}

      <footer className="site-footer">
        <div>
          <span className="brand-diamond" aria-hidden="true" />
          <strong>行小之 · 英语角</strong>
        </div>
        <p>{BANKS.length} 个词库 · {DICTIONARY_ENTRIES.length} 条首发内容 · 进度仅存本机</p>
        <p>
          岗位分类参考 O*NET 30.3（CC BY 4.0）；OCR 由 Tesseract.js 提供。
        </p>
      </footer>

      <nav className="mobile-nav" aria-label="移动端主要功能">
        {PRIMARY_NAV.map((item) => (
          <button
            type="button"
            key={item.view}
            className={view === item.view ? "is-active" : ""}
            onClick={() => navigate(item.view)}
          >
            <span aria-hidden="true">
              {item.view === "home"
                ? "⌂"
                : item.view === "dictionary"
                  ? "⌕"
                  : item.view === "scan"
                    ? "▣"
                    : "⚑"}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {autoplayOpen && (
        <AutoplayPanel
          entries={autoplayEntries}
          initialBankId={bankId}
          learningState={state}
          onBankChange={setBankId}
          onMastery={markLesson}
          onFavorite={favoriteLesson}
          onClose={() => setAutoplayOpen(false)}
        />
      )}
    </div>
  );
}
