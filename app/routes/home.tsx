import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import { jobCategories, type JobCategoryCode } from "../jobCategories";
import { salaryBandsV1 } from "../salaryBands";
import { prisma } from "../db.server";

// React Router の Action（型はざっくりでOK）
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const rawNickname = (formData.get("nickname") as string | null) ?? "";
  let nickname: string | null = null;
  if (rawNickname.trim() !== "") {
    const trimmed = rawNickname.trim();
    // サニタイズ：最大16文字に切り捨て（念のため）
    nickname = trimmed.slice(0, 16);
  }
  const age = Number(formData.get("age"));
  const jobCategoryCode = String(formData.get("jobCategoryCode") || "");
  const rawJobSubCategory = (formData.get("jobSubCategory") as string) || "";
  const jobSubCategory = rawJobSubCategory === "" ? null : rawJobSubCategory;

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
      // industryCode は今は null, surveyVersion は default(1)
    },
  });

  // Cookie & リダイレクト
  const headers = new Headers();
  if (!clientIdFromCookie) {
    headers.append(
      "Set-Cookie",
      // 本番では Secure, Max-Age なども付けると良い
      `sid=${clientId}; Path=/; HttpOnly; SameSite=Lax`
    );
  }
  headers.append("Location", `/result/${entry.id}`);

  return new Response(null, { status: 302, headers });
}

export default function HomeRoute() {
  const [selectedJob, setSelectedJob] = useState<JobCategoryCode | null>(null);
  const [age, setAge] = useState<number | "">("");
  const [salaryBandCode, setSalaryBandCode] = useState<number | "">("");
  const [specialistSub, setSpecialistSub] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const isSpecialist = selectedJob === "SPECIALIST";

  return (
    <>
      {/* HERO */}
        <section className="pt-16 sm:pt-24 pb-14 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            年収<span className="text-primary">偏差値チェッカー</span>
        </h1>

        <p className="mt-6 text-base-content/80 text-sm sm:text-base leading-relaxed">
            <strong>SALARY SCORE</strong> は、市場データをもとに
            <strong>あなたの年収ポジション</strong> を偏差値形式で見える化するサービスです。<br />
            転職市場では、企業やエージェントに情報が偏り、求職者自身が市場価値を把握しづらくなっています。<br />
            オファーの妥当性を判断するための
            <strong>客観的な「基準」</strong> を提供します。
        </p>
        </section>

      {/* FORM */}
      <Form method="post" className="mx-auto max-w-xl space-y-8">
        {/* 年齢 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">年齢</span>
          </label>
          <input
            type="number"
            name="age"
            placeholder="例：29"
            min={18}
            max={70}
            value={age}
            onChange={(e) =>
              setAge(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* ニックネーム（任意） */}
        <div className="form-control">
        <label className="label">
            <span className="label-text font-medium">ニックネーム（任意）</span>
            <span className="label-text-alt text-xs text-base-content/60">
            本名や個人が特定できる名前は入力しないでください
            </span>
        </label>
        <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={16}
            placeholder="例：太郎 / 花子"
            className="input input-bordered w-full"
        />
        <label className="label">
            <span className="label-text-alt text-xs text-base-content/50">
            ※ 最大16文字。シェア画面に表示されます。
            </span>
        </label>
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
                  onClick={() => setSelectedJob(code)}
                  className={`btn h-auto min-h-[3.5rem] whitespace-normal text-sm border transition-colors ${
                    isActive
                      ? // 選択時：はっきりした色＋白文字
                        "btn-primary text-primary-content border-primary"
                      : // 非選択時：白背景＋濃い文字＋薄めの枠線（ライトでもハッキリ見える）
                        "btn-ghost bg-base-100 text-base-content border-base-300 hover:border-base-400 hover:bg-base-100"
                  }`}
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="ml-1">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 専門職サブカテゴリ（SPECIALIST のときだけ表示） */}
        {isSpecialist && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">専門職の内訳</span>
              <span className="label-text-alt text-xs text-base-content/70">
                一番近いものを選んでください
              </span>
            </label>
            <select
              name="jobSubCategory"
              className="select select-bordered w-full"
              value={specialistSub}
              onChange={(e) => setSpecialistSub(e.target.value)}
              required
            >
              <option value="">選択してください</option>
              <option value="HEALTH_MED">医療・看護・介護</option>
              <option value="LICENSED_PRO">士業（弁護士・税理士など）</option>
              <option value="EDUCATION">教育・研究</option>
              <option value="CREATIVE">クリエイティブ</option>
            </select>
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
              (isSpecialist && !specialistSub) ||
              isSubmitting
            }
          >
            {isSubmitting ? "集計中..." : "結果を見る"}
          </button>
        </div>
      </Form>
    </>
  );
}