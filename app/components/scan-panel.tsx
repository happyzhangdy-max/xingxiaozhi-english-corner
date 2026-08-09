"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Worker } from "tesseract.js";
import type { DictionaryEntry } from "../dictionary-data";
import type { LearningState, Mastery } from "../learning-progress";
import { LessonCard } from "./lesson-card";

type ScanPanelProps = {
  entries: DictionaryEntry[];
  learningState: LearningState;
  onMastery: (lessonId: number, mastery: Mastery) => void;
  onFavorite: (lessonId: number) => void;
  onLookup: (query: string) => void;
};

const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function extractWords(text: string) {
  const matches = text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) ?? [];
  return [...new Set(matches.map((word) => word.toLocaleLowerCase()))].filter(
    (word) => word.length > 1,
  );
}

export function ScanPanel({
  entries,
  learningState,
  onMastery,
  onFavorite,
  onLookup,
}: ScanPanelProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState("");
  const workerRef = useRef<Worker | null>(null);

  useEffect(
    () => () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    },
    [imageUrl],
  );

  useEffect(
    () => () => {
      void workerRef.current?.terminate();
      workerRef.current = null;
    },
    [],
  );

  const words = useMemo(() => extractWords(recognizedText), [recognizedText]);
  const matchedEntries = useMemo(() => {
    if (!words.length) return [];
    const wordSet = new Set(words);
    return entries
      .filter((entry) => {
        const tokens = extractWords(entry.phrase);
        return tokens.some((token) => wordSet.has(token));
      })
      .slice(0, 12);
  }, [entries, words]);

  const chooseImage = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("请选择 JPG、PNG、WebP 等图片文件。 ");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("图片不能超过 12 MB，请先裁剪或压缩。 ");
      return;
    }

    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setRecognizedText("");
    setStatus("idle");
    setProgress(0);
    setStatusText("");
    setError("");
  };

  const runOcr = async () => {
    if (!imageFile || status === "loading") return;
    setStatus("loading");
    setError("");
    setProgress(0.02);
    setStatusText("准备本地识别引擎");

    try {
      const { createWorker } = await import("tesseract.js");
      if (!workerRef.current) {
        workerRef.current = await createWorker("eng", 1, {
          workerPath: `${PUBLIC_BASE_PATH}/tesseract/worker.min.js`,
          langPath: `${PUBLIC_BASE_PATH}/tesseract/lang`,
          corePath: `${PUBLIC_BASE_PATH}/tesseract/core`,
          gzip: false,
          logger: (message) => {
            if (typeof message.progress === "number") {
              setProgress(message.progress);
            }
            if (message.status) setStatusText(message.status);
          },
        });
      }

      const result = await workerRef.current.recognize(imageFile);
      setRecognizedText(result.data.text.trim());
      setProgress(1);
      setStatusText("识别完成");
      setStatus("done");
    } catch (caught) {
      setStatus("error");
      setError(
        caught instanceof Error
          ? `识别失败：${caught.message}`
          : "识别失败，请换一张更清晰的图片再试。",
      );
    }
  };

  return (
    <main id="main-content" className="view-shell scan-view">
      <header className="section-heading">
        <p className="eyebrow">LOCAL OCR / IMAGE TO WORDS</p>
        <div>
          <h1>识图查词</h1>
          <p>上传截图、菜单或文档照片。识别在浏览器本地完成，图片不会上传到服务器。</p>
        </div>
      </header>

      <section className="scan-workbench">
        <div className="scan-dropzone">
          <input
            id="scan-image"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(event) => chooseImage(event.target.files?.[0])}
          />
          {imageUrl ? (
            // The URL is created from a user-selected local file.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="待识别的本地图片预览" />
          ) : (
            <label htmlFor="scan-image" className="scan-placeholder">
              <span aria-hidden="true">▣</span>
              <strong>拍照或选择图片</strong>
              <small>JPG / PNG / WebP · 最大 12 MB</small>
            </label>
          )}
          {imageUrl && (
            <label htmlFor="scan-image" className="replace-image">
              更换图片
            </label>
          )}
        </div>

        <div className="scan-control-panel">
          <div className="privacy-note">
            <span aria-hidden="true">●</span>
            <div>
              <strong>LOCAL-FIRST</strong>
              <p>只加载本仓库内的开源 OCR 模型；不发送图片，不保存识别历史。</p>
            </div>
          </div>

          <button
            className="primary-button scan-button"
            type="button"
            disabled={!imageFile || status === "loading"}
            onClick={runOcr}
          >
            {status === "loading" ? "正在识别…" : "开始识别英文"}
          </button>

          {status === "loading" && (
            <div className="ocr-progress" aria-live="polite">
              <div>
                <span>{statusText}</span>
                <strong>{Math.round(progress * 100)}%</strong>
              </div>
              <span aria-hidden="true">
                <span style={{ width: `${Math.max(2, progress * 100)}%` }} />
              </span>
            </div>
          )}

          {error && <p className="form-error" role="alert">{error}</p>}

          <label className="recognized-copy">
            <span>识别文本</span>
            <textarea
              value={recognizedText}
              placeholder="识别结果会出现在这里，也可以手动修正。"
              onChange={(event) => setRecognizedText(event.target.value)}
            />
          </label>
        </div>
      </section>

      {words.length > 0 && (
        <section className="detected-words" aria-labelledby="detected-title">
          <div className="subsection-heading">
            <div>
              <p className="eyebrow">DETECTED WORDS</p>
              <h2 id="detected-title">识别到 {words.length} 个英文词</h2>
            </div>
            <p>点击任意词进入完整词库查询。</p>
          </div>
          <div className="word-chips">
            {words.slice(0, 80).map((word) => (
              <button type="button" key={word} onClick={() => onLookup(word)}>
                {word}
              </button>
            ))}
          </div>
        </section>
      )}

      {matchedEntries.length > 0 && (
        <section className="scan-matches" aria-labelledby="scan-matches-title">
          <div className="subsection-heading">
            <div>
              <p className="eyebrow">DICTIONARY MATCHES</p>
              <h2 id="scan-matches-title">词库中的相关表达</h2>
            </div>
          </div>
          <div className="lesson-grid">
            {matchedEntries.map((entry) => (
              <LessonCard
                key={entry.id}
                lesson={entry}
                mastery={learningState.records[entry.id]?.mastery}
                favorite={learningState.favorites.includes(entry.id)}
                onMastery={(mastery) => onMastery(entry.id, mastery)}
                onFavorite={() => onFavorite(entry.id)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
