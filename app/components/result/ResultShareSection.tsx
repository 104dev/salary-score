// app/components/result/ResultShareSection.tsx
import { useState } from "react";
import type { ResultLoaderData } from "../../routes/result.$entryId";

type Props = {
  data: ResultLoaderData;
  jobLabel: string;
};

export function ResultShareSection({ data, jobLabel }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const namePart = data.nickname ? `${data.nickname} さんの` : "";
  const shareText =
    data.score !== null
      ? `${namePart}年収スコア${data.score}（${jobLabel} / ${data.age}歳）をSALARY INDEXでチェックしました。`
      : `${namePart}年収ポジション（${jobLabel} / ${data.age}歳）をSALARY INDEXでチェックしました。`;

  const xShareUrl =
    "https://twitter.com/intent/tweet?" +
    new URLSearchParams({
      text: shareText,
      url: shareUrl || "https://salary-index.example",
    }).toString();

  const handleCopy = async () => {
    try {
      if (!shareUrl) return;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="pt-4 border-t space-y-3">
      <h2 className="text-sm font-semibold">結果をシェア</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={xShareUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-primary flex-1"
        >
          X で結果をシェアする
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-sm btn-outline flex-1"
        >
          {copied ? "URLをコピーしました" : "結果ページのURLをコピー"}
        </button>
      </div>
      <p className="text-xs text-base-content/60">
        個人が特定される情報は保存していません。年齢・職種・年収レンジのみをもとにした結果です。
      </p>
    </section>
  );
}
