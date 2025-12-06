// app/components/result/ResultHistogramSection.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type HistogramBin = {
  bandCode: number;
  label: string;
  count: number;
  isUserBand: boolean;
};

type Props = {
  histogram: HistogramBin[];
  sampleSize: number;
};

export function ResultHistogramSection({ histogram, sampleSize }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">
        年収分布（あなたの位置）
      </h2>
      <div className="w-full h-64 bg-base-100 rounded-2xl border p-3">
        {sampleSize > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={histogram}>
              <XAxis
                dataKey="label"
                interval={0}
                tick={{ fontSize: 10 }}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {histogram.map((bin, index) => (
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
  );
}
