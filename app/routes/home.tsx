import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import {
  jobCategories,
  jobSubCategories,
  type JobCategoryCode,
} from "../jobCategories";
import { salaryBandsV1 } from "../salaryBands";
import { genderOptions } from "../gender";
import { regionOptions } from "../regionOptions";
import { prisma } from "../db.server";

// React Router の Action
export async function action({ request }: { request: Request }) {
const formData = await request.formData();

// ニックネーム
const rawNickname = (formData.get("nickname") as string | null) ?? "";
let nickname: string | null = null;
if (rawNickname.trim() !== "") {
    const trimmed = rawNickname.trim();
    nickname = trimmed.slice(0, 16); // 最大16文字
}

const age = Number(formData.get("age"));
if (!Number.isFinite(age) || age < 18 || age > 70) {
  throw new Response("Invalid age", { status: 400 });
}

const workRegionCode = formData.get("workRegionCode");
if (!workRegionCode || typeof workRegionCode !== "string" || workRegionCode.trim() === "") {
  throw new Response("Invalid region", { status: 400 });
}

const jobCategoryCode = String(formData.get("jobCategoryCode") || "");

// -----------------------------
// サブカテゴリ（カテゴリごとの制御）
// -----------------------------
const rawJobSubCategory =
((formData.get("jobSubCategory") as string | null) ?? "").trim();
const rawJobSubCategoryOther =
((formData.get("jobSubCategoryOther") as string | null) ?? "").trim();

// この職種がサブカテゴリを持つか？
const subList = jobSubCategories[jobCategoryCode] ?? [];
const hasSub = Array.isArray(subList) && subList.length > 0;

let jobSubCategory: string | null = null;

if (hasSub) {
    // -----------------------------
    // サブカテゴリが存在する職種 → 必須
    // -----------------------------
    const validSubCodes = subList.map((s) => s.code);

    // 未選択または不正値
    if (!rawJobSubCategory || !validSubCodes.includes(rawJobSubCategory)) {
        throw new Response("Invalid job sub category", { status: 400 });
    }

    if (rawJobSubCategory === "OTHER") {
        // OTHER 選択時 → 自由入力必須
        if (!rawJobSubCategoryOther) {
        throw new Response("Sub category detail required", { status: 400 });
        }
        jobSubCategory = rawJobSubCategoryOther.slice(0, 50);
    } else {
        // プリセットをそのまま保存
        jobSubCategory = rawJobSubCategory;
    }
} else {
    // -----------------------------
    // サブカテゴリが存在しない職種 → 何も保存しない
    // -----------------------------
    jobSubCategory = null;
}

  // ▼ 性別（任意・統計用）
  const rawGender = (formData.get("genderCode") as string | null) ?? "NO_ANSWER";
  const genderCode = rawGender === "" ? "NO_ANSWER" : rawGender;

  const salaryBandCode = Number(formData.get("salaryBandCode"));

  // バンド → 代表値（万円）取得
  const band = salaryBandsV1.find((b) => b.code === salaryBandCode);
  if (!band) {
    throw new Response("Invalid salary band", { status: 400 });
  }

  // 代表値を円単位に変換（例：525 → 5,250,000円）
  const annualIncome = band.median * 10_000;

  // 匿名 clientId を Cookie から取得 or 生成
  const cookie = request.headers.get("Cookie") || "";
  const clientIdFromCookie = cookie
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith("sid="))
    ?.split("=")[1];

  const clientId = clientIdFromCookie ?? crypto.randomUUID();

  // DB保存
  const entry = await prisma.salaryEntry.create({
    data: {
      nickname,
      age,
      jobCategoryCode,
      jobSubCategory,
      annualIncome,
      clientId,
      genderCode,
      workRegionCode
      // industryCode は今は null, surveyVersion は default(1)
    },
  });

  // Cookie & リダイレクト
  const headers = new Headers();
  if (!clientIdFromCookie) {
    headers.append(
      "Set-Cookie",
      `sid=${clientId}; Path=/; HttpOnly; SameSite=Lax`
    );
  }
  headers.append("Location", `/result/${entry.id}`);

  return new Response(null, { status: 302, headers });
}

export default function HomeRoute() {
  const [selectedJob, setSelectedJob] = useState<JobCategoryCode | null>(null);
  const [age, setAge] = useState(29); 
  const [salaryBandCode, setSalaryBandCode] = useState<number | "">("");
  const [jobSubCategory, setJobSubCategory] = useState<string>("");
  const [jobSubCategoryOther, setJobSubCategoryOther] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<string>("NO_ANSWER"); // デフォルト「回答しない」

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const isOtherCategory = selectedJob === "OTHER";

  // ▼ サブカテゴリ候補
  const subOptions =
    selectedJob && jobSubCategories
      ? jobSubCategories[selectedJob] ?? []
      : [];

  const hasSub =
    !!selectedJob &&
    !isOtherCategory && // OTHER カテゴリはサブカテゴリなし
    Array.isArray(subOptions) &&
    subOptions.length > 0;

  const requiresSubOther = hasSub && jobSubCategory === "OTHER";
  const requiresOtherDetail = isOtherCategory; // その他カテゴリは自由入力必須にする

  return (
    <>
      {/* HERO */}
      <section className="pt-16 sm:pt-24 pb-14 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
          年収<span className="text-primary">偏差値チェッカー</span>
        </h1>

        <p className="mt-6 text-base-content/80 text-sm sm:text-base leading-relaxed">
          <strong>SALARY SCORE</strong> は、市場データをもとに
          <strong>あなたの年収ポジション</strong> を偏差値形式で見える化するサービスです。
          <br />
          転職市場では、企業やエージェントに情報が偏り、求職者自身が市場価値を把握しづらくなっています。
          <br />
          オファーの妥当性を判断するための
          <strong>客観的な「基準」</strong> を提供します。
        </p>
      </section>

      {/* FORM */}
      <Form method="post" className="mx-auto max-w-xl space-y-8">
        {/* 年齢 */}
        <div className="form-control w-full">
        <label className="label">
            <span className="label-text font-medium">年齢</span>
        </label>

        {/* 現在値 */}
        <div className="text-center mb-2">{age} 歳</div>

        {/* スライダー本体（w-full が超重要） */}
        <input
            type="range"
            name="age"
            min={18}
            max={70}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="range range-primary w-full"
        />

        {/* 目盛ラベルも同じ幅にそろえる */}
        <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>18</span>
            <span>70</span>
        </div>
        </div>

        {/* 勤務地エリア */}
        <div className="form-control w-full">
        <label className="label">
            <span className="label-text font-semibold">勤務地エリア</span>
        </label>
        <select
            name="workRegionCode"
            required
            defaultValue=""
            className="select select-bordered w-full"
        >
            <option value="" disabled>
            選択してください
            </option>

            {regionOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
                {opt.label}
            </option>
            ))}
        </select>
        </div>

        {/* 性別（任意・統計用） */}
        <div className="form-control">
            <label className="label flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="label-text font-medium">性別（任意）</span>
            <span className="label-text-alt text-xs text-base-content/60">
                スコアの計算には利用しません。
            </span>
            </label>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                {genderOptions.map((g) => (
                <label
                    key={g.code}
                    className="label cursor-pointer gap-2 justify-start"
                >
                    <input
                    type="radio"
                    name="genderCode"
                    value={g.code}
                    className="radio radio-sm"
                    checked={gender === g.code}
                    onChange={() => setGender(g.code)}
                    />
                    <span className="label-text">{g.label}</span>
                </label>
                ))}
            </div>
        </div>

        {/* 職種 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">職種</span>
          </label>

          {/* 選択された職種コードを hidden で送信 */}
          <input
            type="hidden"
            name="jobCategoryCode"
            value={selectedJob ?? ""}
          />

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {jobCategories.map(({ emoji, label, code }) => {
              const isActive = selectedJob === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setSelectedJob(code);
                    setJobSubCategory("");
                    setJobSubCategoryOther("");
                  }}
                  className={`btn h-auto min-h-[3.5rem] whitespace-normal text-sm border transition-colors ${
                    isActive
                      ? "btn-primary text-primary-content border-primary"
                      : "btn-ghost bg-base-100 text-base-content border-base-300 hover:border-base-400 hover:bg-base-100"
                  }`}
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="ml-1">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* サブカテゴリ（対応がある職種だけ表示） */}
        {hasSub && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">職種の内訳</span>
              <span className="label-text-alt text-xs text-base-content/70">
                一番近いものを選んでください（その他を選ぶと自由入力できます）
              </span>
            </label>
            <select
              name="jobSubCategory"
              className="select select-bordered w-full"
              value={jobSubCategory}
              onChange={(e) => setJobSubCategory(e.target.value)}
              required
            >
              <option value="">選択してください</option>
              {subOptions.map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.label}
                </option>
              ))}
            </select>

            {jobSubCategory === "OTHER" && (
              <div className="mt-3">
                <input
                  type="text"
                  name="jobSubCategoryOther"
                  className="input input-bordered w-full text-sm"
                  value={jobSubCategoryOther}
                  onChange={(e) => setJobSubCategoryOther(e.target.value)}
                  placeholder="例：心理カウンセラー / コンサルタント など"
                />
                <label className="label">
                  <span className="label-text-alt text-xs text-base-content/50">
                    ※ 50文字以内でご記入ください。
                  </span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* 親カテゴリが OTHER のときの自由入力（サブカテゴリは出さない） */}
        {isOtherCategory && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">職種の説明</span>
              <span className="label-text-alt text-xs text-base-content/70">
                どのカテゴリにも当てはまらない場合、簡単にご記入ください。
              </span>
            </label>
            <input
              type="text"
              name="jobSubCategoryOther"
              className="input input-bordered w-full text-sm"
              value={jobSubCategoryOther}
              onChange={(e) => setJobSubCategoryOther(e.target.value)}
              placeholder="例：YouTuber／ナイトワーク／複業フリーランス など"
            />
            <label className="label">
              <span className="label-text-alt text-xs text-base-content/50">
                ※ 50文字以内。偏差値の計算にはまだ利用しませんが、統計的に参考にします。
              </span>
            </label>
          </div>
        )}

        {/* 年収レンジ */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">年収</span>
          </label>
          <select
            name="salaryBandCode"
            className="select select-bordered w-full"
            value={salaryBandCode}
            onChange={(e) =>
              setSalaryBandCode(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            required
          >
            <option value="">選択してください</option>
            {salaryBandsV1.map((b) => (
              <option key={b.code} value={b.code}>
                {b.display}
              </option>
            ))}
          </select>
        </div>

        {/* SUBMIT */}
        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={
              !age ||
              !selectedJob ||
              !salaryBandCode ||
              (hasSub &&
                (!jobSubCategory ||
                  (requiresSubOther &&
                    jobSubCategoryOther.trim() === ""))) ||
              (requiresOtherDetail &&
                jobSubCategoryOther.trim() === "") ||
              isSubmitting
            }
          >
            {isSubmitting ? "集計中..." : "結果を見る"}
          </button>
        </div>
      </Form>
      {/* 対応職種一覧（SEO + ユーザー説明用） */}
      <section className="mt-16 max-w-3xl mx-auto space-y-6">
        <h2 className="text-lg font-bold">
          対応している職種の例
        </h2>
        <p className="text-sm text-base-content/70">
          年収偏差値チェッカーは、以下のような職種の年収ポジションを診断できます。
        </p>

        <div className="space-y-4">
          {jobCategories.map((cat) => {
            const subs = jobSubCategories[cat.code] ?? [];
            return (
              <div key={cat.code} className="border-t pt-3">
                <h3 className="font-semibold text-sm">
                  {cat.label} の年収偏差値・年収ポジション
                </h3>
                {subs.length > 0 && (
                  <p className="mt-1 text-xs text-base-content/70">
                    例：
                    {subs
                      .slice(0, 5) // 多すぎる場合は上位数件だけでもOK
                      .map((s) => s.label)
                      .join("、")}
                    など
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
