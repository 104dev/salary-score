// app/routes/result.$entryId.tsx
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { prisma } from "../db.server";
import { jobCategories } from "../jobCategories";
import { salaryBandsV1, findBandForIncome } from "../salaryBands";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CURRENT_SCORE_VERSION } from "../config/salaryIndexVersion";

// ▼ ヒストグラム表示用
type HistogramBin = {
  bandCode: number;
  label: string;
  count: number;
  isUserBand: boolean;
};

// ▼ スナップショットに保存されている生データ用
type SnapshotHistogramItem = {
  bandCode: number;
  label: string;
  count: number;
};

type ResultLoaderData = {
  entryId: string;
  age: number;
  jobCategoryCode: string;
  annualIncome: number;
  score: number | null; // 表示用スコア（サンプル不足時は null）
  sampleSize: number;
  histogram: HistogramBin[];
  isOwner: boolean;
  nickname: string | null;
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const entryId = params.entryId;
  if (!entryId) {
    throw new Response("Not found", { status: 404 });
  }

  // ▼ エントリ + スナップショットを取得
  const entry = await prisma.salaryEntry.findUnique({
    where: { id: entryId },
    include: {
      SnapshotResult: true,
    },
  });

  if (!entry) {
    throw new Response("Not found", { status: 404 });
  }

  // Cookie から sid を取得して、本人判定
  const cookieHeader = request.headers.get("Cookie") ?? "";
  const sid = cookieHeader
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith("sid="))
    ?.split("=")[1];

  const isOwner = !!sid && sid === entry.clientId;

  // ▼ 既にスナップショットがあればそれを使う
  let snapshot = entry.SnapshotResult;

  // ▼ まだなければ、このタイミングで作成（以降は固定）
  if (!snapshot) {
    // 年齢レンジ（5歳幅）：例 27歳 → 25〜29歳
    const bandSize = 5;
    const lowerAge = Math.floor(entry.age / bandSize) * bandSize;
    const upperAge = lowerAge + (bandSize - 1);

    // 同職種 × 同年代レンジ × 同 surveyVersion の母集団
    const cohort = await prisma.salaryEntry.findMany({
      where: {
        jobCategoryCode: entry.jobCategoryCode,
        age: { gte: lowerAge, lte: upperAge },
        surveyVersion: entry.surveyVersion,
      },
      select: {
        annualIncome: true,
      },
    });

    const incomes = cohort.map((c) => c.annualIncome);
    const sampleSize = incomes.length;

    let zScore = 0;
    let score = 50;
    let percentile = 50;

    if (sampleSize > 0) {
      const mean =
        incomes.reduce((sum, v) => sum + v, 0) / sampleSize;

      const variance =
        incomes.reduce((sum, v) => sum + (v - mean) ** 2, 0) /
        sampleSize;

      const stdDev = Math.sqrt(variance || 1);

      zScore = (entry.annualIncome - mean) / stdDev;

      // 偏差値っぽいスコア（0〜100 にクランプ）
      score = Math.round(50 + zScore * 10);
      if (score < 0) score = 0;
      if (score > 100) score = 100;

      // 単純パーセンタイル（自分以下の割合）
      const belowOrEqual = incomes.filter(
        (v) => v <= entry.annualIncome
      ).length;
      percentile = (belowOrEqual / sampleSize) * 100;
    }

    // 分布スナップショット
    const histogramForSnapshot: SnapshotHistogramItem[] =
      salaryBandsV1.map((band) => {
        const count = cohort.filter((c) => {
          const incomeInMan = c.annualIncome / 10_000; // 万円
          return (
            incomeInMan >= band.min && incomeInMan <= band.max
          );
        }).length;

        return {
          bandCode: band.code,
          label: band.display,
          count,
        };
      });

    snapshot = await prisma.snapshotResult.create({
      data: {
        entryId,
        score,
        zScore,
        percentile,
        sampleSize,
        histogram: histogramForSnapshot,
        scoreVersion: CURRENT_SCORE_VERSION,
      },
    });
  }

  // ▼ スナップショットから画面用データを構成
  const rawHistogram =
    (snapshot.histogram as SnapshotHistogramItem[]) ?? [];

  const userBand = findBandForIncome(entry.annualIncome);

  const histogram: HistogramBin[] = rawHistogram.map((item) => ({
    ...item,
    isUserBand: userBand ? item.bandCode === userBand.code : false,
  }));

  // スコア表示はサンプル数がある程度たまってから
  const displayScore =
    snapshot.sampleSize >= 5 ? snapshot.score : null;

  return Response.json({
    entryId,
    age: entry.age,
    jobCategoryCode: entry.jobCategoryCode,
    annualIncome: entry.annualIncome,
    score: displayScore,
    sampleSize: snapshot.sampleSize,
    histogram,
    isOwner,
    nickname: entry.nickname, 
  } satisfies ResultLoaderData);
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "年収偏差値チェッカー | SALARY SCORE" }];
  }

  const d = data as ResultLoaderData;

  const jobLabel =
    jobCategories.find((j) => j.code === d.jobCategoryCode)?.label ??
    d.jobCategoryCode;

  const userName = d.nickname ? `${d.nickname} さん` : "匿名ユーザー";
  const scoreText =
    d.score != null ? `偏差値 ${d.score}` : "年収スコア";

  const title = `${userName}の${scoreText} | 年収偏差値チェッカー`;

  const incomeMan = Math.round(d.annualIncome / 10_000);

  const description = `${d.age}歳・${jobLabel}／年収${incomeMan}万円の市場ポジションを年収偏差値として表示しました。SALARY SCORE による年収診断結果です。`;

  const url = `https://salary-score.com/result/${d.entryId}`;
  const ogImage = "https://salary-score.com/ogp-default.png";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
  ];
}

// ==========================
// 画面コンポーネント
// ==========================
export default function ResultRoute() {
  const data = useLoaderData() as ResultLoaderData;
  const displayName = data.nickname ? `${data.nickname} さん` : "";
  const [copied, setCopied] = useState(false);

  const incomeMan = Math.round(data.annualIncome / 10_000); // 万円表示

  const bandSize = 5;
  const lowerAge = Math.floor(data.age / bandSize) * bandSize;
  const upperAge = lowerAge + (bandSize - 1);

  const jobLabel =
    jobCategories.find((j) => j.code === data.jobCategoryCode)?.label ??
    data.jobCategoryCode;

  const scoreLabel =
    data.score === null
      ? "※データ少なめ（参考値なし）"
      : data.score >= 60
      ? "上位ゾーン"
      : data.score >= 50
      ? "だいたい平均ゾーン"
      : "やや控えめゾーン";

  // ▼ シェア用
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
      url: shareUrl || "https://salary-index.example", // 本番ドメインに差し替え
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
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      {/* スコアどーん */}
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
              <span className="text-sm text-base-content/60">
                偏差値
              </span>
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

      {/* 集計条件カード */}
      <section className="card bg-base-100 shadow">
        <div className="card-body space-y-3 text-sm">
          <h2 className="card-title text-base">今回の集計条件</h2>
          <div>
            <div>
              年齢：{data.age}歳（{lowerAge}〜{upperAge}歳レンジ）
            </div>
            <div>職種：{jobLabel}</div>
          </div>

          <div className="mt-4 space-y-1">
            <div>
              あなたの年収：
              <span className="font-semibold">{incomeMan} 万円</span>
            </div>
          </div>

          <p className="mt-4 text-xs text-base-content/60">
            スコアは SALARY INDEX 内のデータだけをもとにした簡易的な指標です。
            母数が少ない場合、数値は大きくぶれます。
          </p>
        </div>
      </section>

      {/* ヒストグラム */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          年収分布（あなたの位置）
        </h2>
        <div className="w-full h-64 bg-base-100 rounded-2xl border p-3">
          {data.sampleSize > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.histogram}>
                <XAxis
                  dataKey="label"
                  interval={0}
                  tick={{ fontSize: 10 }}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count">
                  {data.histogram.map((bin, index) => (
                    <Cell
                      key={index}
                      fill={bin.isUserBand ? "#3b82f6" : "#9ca3af"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-base-content/70">
              まだデータが少ないため、分布グラフは表示できません。
            </p>
          )}
        </div>
      </section>

      {/* 結果シェア */}
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
    </main>
  );
}