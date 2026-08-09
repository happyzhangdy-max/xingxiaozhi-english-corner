import { getBank, type DictionaryEntry } from "../dictionary-data";
import { speakEnglish } from "../speech";
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
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="eyebrow">XINGXIAOZHI / ENGLISH PRACTICE FIELD</p>
          <h1 id="home-title">
            把英语，
            <br />
            <em>说到嘴边。</em>
          </h1>
          <p className="hero-intro">
            不背孤立词义。查一条，听一句，做一次判断；让高频表达在真实语境里反复出现。
          </p>
        </div>
        <div className="hero-counter" aria-hidden="true">
          EN
        </div>
      </section>

      <section className="home-search" aria-label="搜索英语表达">
        <label htmlFor="home-search">想找哪种说法？</label>
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

      <section className="action-grid four-actions" aria-label="首页核心功能">
        <button
          className="action-card action-card-paper"
          type="button"
          onClick={() => onNavigate("dictionary")}
        >
          <span className="action-index">01 / LOOK UP</span>
          <span className="action-symbol" aria-hidden="true">
            ⌕
          </span>
          <strong>查词</strong>
          <span>通用、职场岗位和场景词库统一搜索</span>
          <b aria-hidden="true">打开词库 →</b>
        </button>
        <button
          className="action-card action-card-scan"
          type="button"
          onClick={() => onNavigate("scan")}
        >
          <span className="action-index">02 / SCAN</span>
          <span className="action-symbol" aria-hidden="true">
            ▣
          </span>
          <strong>识图</strong>
          <span>图片留在本机，识别英文后逐词查询</span>
          <b aria-hidden="true">选择图片 →</b>
        </button>
        <button className="action-card action-card-acid" type="button" onClick={onOpenAutoplay}>
          <span className="action-index">03 / AUTOPLAY</span>
          <span className="action-symbol" aria-hidden="true">
            ◉
          </span>
          <strong>自动背词</strong>
          <span>按当前词库连播：术语 → 释义 → 例句</span>
          <b aria-hidden="true">开始播放 →</b>
        </button>
        <button
          className="action-card action-card-signal"
          type="button"
          onClick={() => onNavigate("adventure")}
        >
          <span className="action-index">04 / ADVENTURE</span>
          <span className="action-symbol" aria-hidden="true">
            ⚑
          </span>
          <strong>单词大冒险</strong>
          <span>带着当前词库闯关，答对积能量，答错进复习队列</span>
          <b aria-hidden="true">进入地图 →</b>
        </button>
      </section>

      <section className="progress-strip" aria-label="学习概览">
        <button type="button" onClick={() => onNavigate("dictionary")}>
          <strong>{stats.touched}</strong>
          <span>已接触</span>
        </button>
        <button type="button" onClick={() => onNavigate("review")}>
          <strong>{stats.mastered}</strong>
          <span>已掌握</span>
        </button>
        <button type="button" onClick={() => onNavigate("dictionary")}>
          <strong>{stats.favorite}</strong>
          <span>已收藏</span>
        </button>
        <div className="progress-meter">
          <div>
            <strong>{stats.completion}%</strong>
            <span>词库进度</span>
          </div>
          <span className="progress-track" aria-hidden="true">
            <span style={{ width: `${stats.completion}%` }} />
          </span>
        </div>
      </section>

      <button className="review-link" type="button" onClick={() => onNavigate("review")}>
        <span>到期复习</span>
        <strong>{stats.due ? `${stats.due} 条今天再见` : "今天没有到期内容"}</strong>
        <span aria-hidden="true">→</span>
      </button>
    </main>
  );
}
