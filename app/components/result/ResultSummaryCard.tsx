// app/components/result/ResultSummaryCard.tsx
import type { ResultLoaderData } from "../../routes/result.$entryId";

type Props = {
  data: ResultLoaderData;
  jobLabel: string;
  lowerAge: number;
  upperAge: number;
  incomeMan: number;
};

export function ResultSummaryCard({
  data,
  jobLabel,
  lowerAge,
  upperAge,
  incomeMan,
}: Props) {
  return (
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
          スコアは SALARY SCORE 内のデータだけをもとにした簡易的な指標です。
          母数が少ない場合、数値は大きくぶれます。
        </p>
      </div>
    </section>
  );
}
