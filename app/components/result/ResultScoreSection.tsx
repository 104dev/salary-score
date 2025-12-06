// app/components/result/ResultScoreSection.tsx
import type { ResultLoaderData } from "../../routes/result.$entryId";

type Props = {
  data: ResultLoaderData;
  jobLabel: string;
  lowerAge: number;
  upperAge: number;
};

export function ResultScoreSection({ data, jobLabel, lowerAge, upperAge }: Props) {
  const displayName = data.nickname ? `${data.nickname} さん` : "";

  const scoreLabel =
    data.score === null
      ? "※データ少なめ（参考値なし）"
      : data.score >= 60
      ? "上位ゾーン"
      : data.score >= 50
      ? "だいたい平均ゾーン"
      : "やや控えめゾーン";

  return (
    <section className="text-center space-y-4">
      <p className="text-sm text-base-content/70">あなたの年収スコア</p>
      {displayName && (
        <p className="text-sm text-base-content/70 mt-1">
          <span className="font-semibold">{displayName}</span>の結果
        </p>
      )}
      {data.score !== null ? (
        <>
          <div className="flex justify-center items-baseline gap-2">
            <span className="text-6xl font-extrabold text-primary">
              {data.score}
            </span>
            <span className="text-sm text-base-content/60">偏差値</span>
          </div>
          <p className="text-sm text-base-content/70">
            同職種 × 近い年代の中で{" "}
            <span className="font-semibold">{scoreLabel}</span>
            に位置しています。
          </p>
        </>
      ) : (
        <p className="mt-4 text-sm text-warning">
          まだ十分なデータがないため、スコアは表示していません。
        </p>
      )}

      <p className="mt-2 text-xs text-base-content/60">
        {lowerAge}〜{upperAge} 歳 × {jobLabel}
      </p>
    </section>
  );
}
