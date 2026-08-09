import { getBank, type DictionaryEntry } from "../dictionary-data";
import { speakEnglish } from "../speech";
import styles from "./home-panel.module.css";
import type { AppView } from "./types";

type HomePanelProps = {
  stats: {
    touched: number;
    due: number;
    mastered: number;
    favorite: number;
    completion: number;
  };
  query: string;
  searchResults: DictionaryEntry[];
  onQueryChange: (query: string) => void;
  onNavigate: (view: AppView) => void;
  onOpenAutoplay: () => void;
};

export function HomePanel({
  stats,
  query,
  searchResults,
  onQueryChange,
  onNavigate,
  onOpenAutoplay,
}: HomePanelProps) {
  return (
    <main id="main-content" className="view-shell">
      <section className={`${styles.hero} home-hero`} aria-labelledby="home-title">
        <div className={`${styles.heroCopy} home-hero-copy`}>
          <p className="eyebrow">XINGXIAOZHI / ENGLISH PRACTICE FIELD</p>
          <h1 id="home-title">
            把英语，<em>说到嘴边。</em>
          </h1>
          <p className="hero-intro">
            不背孤立词义。查一条，听一句，做一次判断；让高频表达在真实语境里反复出现。
          </p>
        </div>
        <div className={styles.heroMark} aria-hidden="true">
          <span>EN</span>
          <small>LOCAL-FIRST</small>
        </div>
      </section>

      <section className={`${styles.searchSection} home-search`} aria-label="查词">
        <label htmlFor="home-search">查词 · LOOK UP</label>
        <div className="search-control">
          <span aria-hidden="true">⌕</span>
          <input
            id="home-search"
            type="search"
            autoComplete="off"
            maxLength={80}
            placeholder="搜英文、中文或场景，例如：开会 / long run"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <button type="button" onClick={() => onNavigate("dictionary")}>
            进入词库 <span aria-hidden="true">→</span>
          </button>
        </div>
        {query.trim() && (
          <div className="search-preview" role="region" aria-live="polite">
            {searchResults.length ? (
              searchResults.slice(0, 4).map((lesson) => (
                <button
                  className="search-preview-row"
                  type="button"
                  key={lesson.id}
                  onClick={() => speakEnglish(lesson.phrase)}
                >
                  <span className="search-result-level">
                    {getBank(lesson.bankId)?.title ?? "英语词库"}
                  </span>
                  <strong>{lesson.phrase}</strong>
                  <span>{lesson.meaning}</span>
                  <span className="search-play" aria-hidden="true">
                    ▶
                  </span>
                </button>
              ))
            ) : (
              <p className="search-empty">本地词库暂时没有匹配结果。</p>
            )}
          </div>
        )}
      </section>

      <section className={styles.primaryGrid} aria-label="首页主功能">
        <button
          className={`${styles.primaryCard} ${styles.scanCard}`}
          type="button"
          onClick={() => onNavigate("scan")}
        >
          <span className={styles.cardIcon} aria-hidden="true">
            ▣
          </span>
          <span className={styles.cardCopy}>
            <strong>拍照识图</strong>
            <small>图片留在本机 · 识别后逐词查</small>
          </span>
          <span className={styles.cardArrow} aria-hidden="true">
            →
          </span>
        </button>
        <button
          className={`${styles.primaryCard} ${styles.autoplayCard}`}
          type="button"
          onClick={onOpenAutoplay}
        >
          <span className={styles.cardIcon} aria-hidden="true">
            ◉
          </span>
          <span className={styles.cardCopy}>
            <strong>自动背单词</strong>
            <small>职场与场景词库 · 术语到例句连播</small>
          </span>
          <span className={styles.cardArrow} aria-hidden="true">
            →
          </span>
        </button>
      </section>

      <section className={styles.planSection} aria-label="我的学习进度">
        <button className={styles.planCard} type="button" onClick={() => onNavigate("review")}>
          <span className={styles.planIcon} aria-hidden="true">
            ↻
          </span>
          <span className={styles.planBody}>
            <strong>我的学习进度</strong>
            <small>
              已学习 {stats.touched} 条 · 已掌握 {stats.mastered} 条 · 今日待复习 {stats.due} 条
            </small>
            <span className={styles.progressTrack} aria-hidden="true">
              <span style={{ width: `${stats.completion}%` }} />
            </span>
          </span>
          <span className={styles.cardArrow} aria-hidden="true">
            →
          </span>
        </button>
      </section>

      <section className={styles.adventureSection} aria-label="单词大冒险">
        <button
          className={styles.adventureCard}
          type="button"
          onClick={() => onNavigate("adventure")}
        >
          <span className={styles.adventureIcon} aria-hidden="true">
            ⚑
          </span>
          <span className={styles.adventureBody}>
            <strong>单词大冒险</strong>
            <small>带上当前职场或场景词库，边答题边复习</small>
            <span className={styles.adventureChips} aria-hidden="true">
              <span>10 段闯关</span>
              <span>{stats.favorite} 条收藏可练</span>
            </span>
          </span>
          <span className={styles.cardArrow} aria-hidden="true">
            →
          </span>
        </button>
      </section>
    </main>
  );
}
