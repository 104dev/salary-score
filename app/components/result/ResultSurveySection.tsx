// app/components/result/ResultSurveySection.tsx
import { useState } from "react";
import { Form } from "react-router-dom";
import type { ResultLoaderData, ActionData } from "../../routes/result.$entryId";

type Props = {
  data: ResultLoaderData;
  actionOk: ActionData["ok"];
};

export function ResultSurveySection({ data, actionOk }: Props) {
  const [otherChecked, setOtherChecked] = useState(false);

  return (
    <>
      {data.isOwner && (
        <section className="pt-6 border-t space-y-4">
          <h2 className="text-sm font-semibold">
            教えてください：今の年収について
          </h2>
          <p className="text-xs text-base-content/60">
            いただいた回答は統計的に集計し、「年収と満足度」「高年収の人に共通するポイント」として分析します。
            個人が特定されることはありません。
          </p>

          {/* フラッシュメッセージ */}
          {actionOk && (
            <div className="alert alert-success text-sm">
              <span>
                ご回答ありがとうございました！ 集計に反映させていただきます。
              </span>
            </div>
          )}

          {/* まだベースアンケートに回答していない & 送信直後でないときだけフォーム表示 */}
          {!actionOk && data.canAnswerBaseSurvey && (
            <Form method="post" replace className="card bg-base-100 shadow">
              <div className="card-body space-y-4 text-sm">
                {/* Q1: 年収満足度（全員） */}
                <div className="space-y-2">
                  <p className="text-xs text-base-content/70">
                    Q1. 今の年収に満足していますか？（必須）
                  </p>
                  <div className="flex flex-col gap-2">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="radio"
                        name="satisfaction"
                        value="SATISFIED"
                        className="radio radio-sm"
                        required
                      />
                      <span className="label-text">満足している</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="radio"
                        name="satisfaction"
                        value="UNSATISFIED"
                        className="radio radio-sm"
                      />
                      <span className="label-text">満足していない</span>
                    </label>
                  </div>
                </div>

                {/* Q2: 高年収候補だけに見せる追加アンケート */}
                {data.isHighIncomeCandidate && (
                  <div className="space-y-2">
                    <p className="text-xs text-base-content/70">
                      Q2. データ上では平均より高めのゾーンにいます。
                      なぜ平均以上もらえていると思いますか？（当てはまるものをすべて選択・任意）
                    </p>

                    <div className="flex flex-col space-y-2">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                            type="checkbox"
                            name="reasonCodes"
                            value="SKILL"
                            className="checkbox checkbox-sm"
                            />
                            <span className="label-text">
                            専門スキル・資格などで、人より差別化できている
                            </span>
                        </label>

                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                            type="checkbox"
                            name="reasonCodes"
                            value="MANAGEMENT"
                            className="checkbox checkbox-sm"
                            />
                            <span className="label-text">
                            チームリーダー / 管理職など、マネジメント経験がある
                            </span>
                        </label>

                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                            type="checkbox"
                            name="reasonCodes"
                            value="RESULT_DRIVEN"
                            className="checkbox checkbox-sm"
                            />
                            <span className="label-text">
                            営業や歩合制など、成果が数字で評価される仕事で結果を出している
                            </span>
                        </label>

                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                            type="checkbox"
                            name="reasonCodes"
                            value="LONG_TENURE"
                            className="checkbox checkbox-sm"
                            />
                            <span className="label-text">
                            同じ会社に長く勤めていて、年功・社内評価の積み上げが効いている
                            </span>
                        </label>

                        <label className="label cursor-pointer justify-start gap-3">
                            <input
                            type="checkbox"
                            name="reasonCodes"
                            value="HIGH_COMP_RANGE"
                            className="checkbox checkbox-sm"
                            />
                            <span className="label-text">
                            そもそも所属している会社・業界の給与レンジが高い
                            </span>
                        </label>

                        {/* その他だけ 2 行に & チェック時に自由記述表示 */}
                        <label className="label cursor-pointer justify-start gap-3 items-start">
                        <input
                            type="checkbox"
                            name="reasonCodes"
                            value="OTHER"
                            className="checkbox checkbox-sm"
                            onChange={(e) => setOtherChecked(e.target.checked)}
                        />
                        {/* ★ ここから自前レイアウトにする */}
                        <span className="flex flex-col leading-tight text-sm">
                            <span>その他</span>
                            <span className="text-xs text-base-content/70">
                            （自由記述で書きたいことがある）
                            </span>
                        </span>
                        </label>


                    </div>

                    {otherChecked && (
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-xs">
                            自由記述（任意）
                          </span>
                        </label>
                        <textarea
                          name="freeText"
                          className="textarea textarea-bordered h-24 text-sm"
                          placeholder="例）◯◯の資格を活かしてニッチなポジションを取っている、転職で年収テーブルの高い会社に移った など"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="card-actions justify-end mt-2">
                  <button type="submit" className="btn btn-primary btn-sm">
                    回答を送信する
                  </button>
                </div>
              </div>
            </Form>
          )}
        </section>
      )}
    </>
  );
}
