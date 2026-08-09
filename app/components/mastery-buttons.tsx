import type { Mastery } from "../learning-progress";

type MasteryButtonsProps = {
  value?: Mastery;
  onChange: (mastery: Mastery) => void;
  compact?: boolean;
};

const OPTIONS: Array<{
  value: Mastery;
  symbol: string;
  label: string;
}> = [
  { value: "unknown", symbol: "●", label: "不认识" },
  { value: "learning", symbol: "●", label: "还不熟" },
  { value: "mastered", symbol: "●", label: "已掌握" },
];

export function MasteryButtons({
  value,
  onChange,
  compact = false,
}: MasteryButtonsProps) {
  return (
    <div className={`mastery-buttons${compact ? " is-compact" : ""}`}>
      {OPTIONS.map((option) => (
        <button
          className={`mastery-button mastery-${option.value}${
            value === option.value ? " is-active" : ""
          }`}
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          aria-label={option.label}
          title={option.label}
          onClick={() => onChange(option.value)}
        >
          <span aria-hidden="true">{option.symbol}</span>
          {!compact && <span>{option.label}</span>}
        </button>
      ))}
    </div>
  );
}
