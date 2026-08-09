import { getBank, type DictionaryEntry } from "../dictionary-data";
import type { Mastery } from "../learning-progress";
import { speakEnglish } from "../speech";
import { MasteryButtons } from "./mastery-buttons";

type LessonCardProps = {
  lesson: DictionaryEntry;
  mastery?: Mastery;
  favorite: boolean;
  onMastery: (mastery: Mastery) => void;
  onFavorite: () => void;
};

export function LessonCard({
  lesson,
  mastery,
  favorite,
  onMastery,
  onFavorite,
}: LessonCardProps) {
  const bank = getBank(lesson.bankId);

  return (
    <article className="lesson-card">
      <div className="lesson-card-topline">
        <span className="bank-badge">{bank?.title ?? lesson.category}</span>
        <span className="lesson-category">{bank?.kind}</span>
        <button
          className={`icon-button favorite-button${favorite ? " is-active" : ""}`}
          type="button"
          aria-label={favorite ? "取消收藏" : "收藏表达"}
          aria-pressed={favorite}
          onClick={onFavorite}
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>

      <div className="lesson-phrase-row">
        <div>
          <h3>{lesson.phrase}</h3>
          {lesson.ipa && <p className="lesson-ipa">{lesson.ipa}</p>}
        </div>
        <button
          className="listen-button"
          type="button"
          aria-label={`朗读 ${lesson.phrase}`}
          onClick={() => speakEnglish(lesson.phrase)}
        >
          <span aria-hidden="true">▶</span>
          听
        </button>
      </div>

      <p className="lesson-meaning">{lesson.meaning}</p>

      <details className="lesson-details">
        <summary>例句与用法</summary>
        <div className="example-row">
          <p>{lesson.example}</p>
          <button
            className="mini-listen"
            type="button"
            aria-label="朗读例句"
            onClick={(event) => {
              event.preventDefault();
              speakEnglish(lesson.example);
            }}
          >
            ▶
          </button>
        </div>
        <p className="example-translation">{lesson.translation}</p>
        <p className="lesson-note">{lesson.note}</p>
      </details>

      <MasteryButtons value={mastery} onChange={onMastery} compact />
    </article>
  );
}
