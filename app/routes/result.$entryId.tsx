// app/routes/result.$entryId.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { useLoaderData, useActionData } from "react-router-dom";
import { prisma } from "../db.server";
import { jobCategories } from "../jobCategories";
import { salaryBandsV1, findBandForIncome } from "../salaryBands";
import { CURRENT_SCORE_VERSION } from "../config/salaryIndexVersion";

import { ResultScoreSection } from "../components/result/ResultScoreSection";
import { ResultSummaryCard } from "../components/result/ResultSummaryCard";
import { ResultHistogramSection } from "../components/result/ResultHistogramSection";
import { ResultShareSection } from "../components/result/ResultShareSection";
import { ResultSurveySection } from "../components/result/ResultSurveySection";
import { verifyShareToken } from "../utils/shareToken.server";

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

export type ResultLoaderData = {
  entryId: string;
  age: number;
  jobCategoryCode: string;
  annualIncome: number;
  score: number | null; // 表示用スコア（サンプル不足時は null）
  sampleSize: number;
  histogram: HistogramBin[];
  isOwner: boolean;
  nickname: string | null;
  canAnswerBaseSurvey: boolean;       // 満足度アンケートを出して良いか
  isHighIncomeCandidate: boolean;     // 高年収理由Q2を出す対象か
};

export type ActionData = {
  ok?: boolean;
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const entryId = params.entryId;
  if (!entryId) {
    throw new Response("Not found", { status: 404 });
  }

  // ▼ URLクエリからトークン取得
  const url = new URL(request.url);
  const rawToken = url.searchParams.get("d"); // ?d=xxxxx

  let nicknameFromToken: string | null = null;
  if (rawToken) {
    const payload = verifyShareToken(rawToken);
    if (payload && payload.entryId === entryId) {
      nicknameFromToken = payload.nickname;
    }
  }

  // ▼ エントリ + スナップショット + アンケートを取得
  const entry = await prisma.salaryEntry.findUnique({
    where: { id: entryId },
    include: {
      SnapshotResult: true,
      SurveyResponse: true,
      HighIncomeReason: true,
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
      const mean = incomes.reduce((sum, v) => sum + v, 0) / sampleSize;

      const variance =
        incomes.reduce((sum, v) => sum + (v - mean) ** 2, 0) / sampleSize;

      const stdDev = Math.sqrt(variance || 1);

      zScore = (entry.annualIncome - mean) / stdDev;

      // 偏差値っぽいスコア（0〜100 にクランプ）
      score = Math.round(50 + zScore * 10);
      if (score < 0) score = 0;
      if (score > 100) score = 100;

      // 単純パーセンタイル（自分以下の割合）
      const belowOrEqual = incomes.filter((v) => v <= entry.annualIncome).length;
      percentile = (belowOrEqual / sampleSize) * 100;
    }

    // 分布スナップショット
    const histogramForSnapshot: SnapshotHistogramItem[] = salaryBandsV1.map(
      (band) => {
        const count = cohort.filter((c) => {
          const incomeInMan = c.annualIncome / 10_000; // 万円
          return incomeInMan >= band.min && incomeInMan <= band.max;
        }).length;

        return {
          bandCode: band.code,
          label: band.display,
          count,
        };
      }
    );

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
  const displayScore = snapshot.sampleSize >= 5 ? snapshot.score : null;

  // アンケ表示ロジック
  const hasBaseSurvey = !!entry.SurveyResponse;
  const rawScore = snapshot.score; // サンプル不足でも数値は入っている前提
  const isHighIncomeCandidate = rawScore != null && rawScore >= 55; // 閾値はお好みで

  const canAnswerBaseSurvey = isOwner && !hasBaseSurvey;

  return Response.json({
    entryId,
    age: entry.age,
    jobCategoryCode: entry.jobCategoryCode,
    annualIncome: entry.annualIncome,
    score: displayScore,
    sampleSize: snapshot.sampleSize,
    histogram,
    isOwner,
    nickname: nicknameFromToken,
    canAnswerBaseSurvey,
    isHighIncomeCandidate,
  } satisfies ResultLoaderData);
}

// ==========================
// action（満足度＋高年収理由アンケを1フォームで保存）
// ==========================
export async function action({ params, request }: ActionFunctionArgs) {
  const entryId = params.entryId;
  if (!entryId) {
    return new Response("Not found", { status: 404 });
  }

  const entry = await prisma.salaryEntry.findUnique({
    where: { id: entryId },
    include: {
      SnapshotResult: true,
      SurveyResponse: true,
      HighIncomeReason: true,
    },
  });

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  // 本人チェック（loader と同じロジック）
  const cookieHeader = request.headers.get("Cookie") ?? "";
  const sid = cookieHeader
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith("sid="))
    ?.split("=")[1];

  const isOwner = !!sid && sid === entry.clientId;
  if (!isOwner) {
    return new Response("Forbidden", { status: 403 });
  }

  // すでにベースアンケート回答済みなら何もしない
  if (entry.SurveyResponse) {
    return Response.json({ ok: false });
  }

  const formData = await request.formData();

  // Q1: 年収満足度（全員）
  const satisfaction = formData.get("satisfaction");
  let isSatisfied: boolean | null = null;
  if (satisfaction === "SATISFIED") {
    isSatisfied = true;
  } else if (satisfaction === "UNSATISFIED") {
    isSatisfied = false;
  }

  // 一応バリデーション（ラジオに required 付けているので基本通る想定）
  if (isSatisfied === null) {
    return Response.json({ ok: false });
  }

  // SurveyResponse 作成（MVPなので create 固定）
  await prisma.surveyResponse.create({
    data: {
      entryId,
      isSatisfied, // ← Prisma側で Boolean カラムにしておく
    },
  });

  // Q2: 高年収理由（高スコアの人にだけ有効）
  const snapshot = entry.SnapshotResult;
  const rawScore = snapshot?.score ?? null;
  const isHighIncomeCandidate = rawScore != null && rawScore >= 55;

  const reasonCodes = formData
    .getAll("reasonCodes")
    .map(String)
    .filter((v) => v.trim().length > 0);

  const freeTextRaw = formData.get("freeText");
  const freeText =
    typeof freeTextRaw === "string" && freeTextRaw.trim().length > 0
      ? freeTextRaw.trim().slice(0, 1000)
      : null;

  if (
    isHighIncomeCandidate &&
    !entry.HighIncomeReason &&
    (reasonCodes.length > 0 || freeText)
  ) {
    await prisma.highIncomeReasonResponse.create({
      data: {
        entryId,
        reasonCodes,
        freeText,
      },
    });
  }

  // リダイレクトせず、フラッシュ用の actionData だけ返す
  return Response.json({ ok: true });
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
  const scoreText = d.score != null ? `偏差値 ${d.score}` : "年収スコア";

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
// 画面コンポーネント（骨組み）
// ==========================
export default function ResultRoute() {
  const data = useLoaderData() as ResultLoaderData;
  const actionData = useActionData() as ActionData | undefined;

  const bandSize = 5;
  const lowerAge = Math.floor(data.age / bandSize) * bandSize;
  const upperAge = lowerAge + (bandSize - 1);

  const jobLabel =
    jobCategories.find((j) => j.code === data.jobCategoryCode)?.label ??
    data.jobCategoryCode;

  const incomeMan = Math.round(data.annualIncome / 10_000); // 万円表示

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <ResultScoreSection
        data={data}
        jobLabel={jobLabel}
        lowerAge={lowerAge}
        upperAge={upperAge}
      />

      <ResultSummaryCard
        data={data}
        jobLabel={jobLabel}
        lowerAge={lowerAge}
        upperAge={upperAge}
        incomeMan={incomeMan}
      />

      <ResultHistogramSection histogram={data.histogram} sampleSize={data.sampleSize} />

      <ResultShareSection data={data} jobLabel={jobLabel} />

      <ResultSurveySection data={data} actionOk={!!actionData?.ok} />
    </main>
  );
}
