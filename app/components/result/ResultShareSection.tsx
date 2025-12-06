// app/components/result/ResultShareSection.tsx
import { useState } from "react";
import type { ResultLoaderData } from "../../routes/result.$entryId";

type Props = {
  data: ResultLoaderData;
  jobLabel: string;
};

export function ResultShareSection({ data, jobLabel }: Props) {
  const [nicknameInput, setNicknameInput] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // いま利用可能なURL（トークン付きがあればそちらを優先）
  const fallbackUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const effectiveShareUrl = shareUrl || fallbackUrl;

  const namePart = nicknameInput
    ? `${nicknameInput} さんの`
    : data.nickname
    ? `${data.nickname} さんの`
    : "";

  const shareText =
    data.score !== null
      ? `${namePart}年収スコア${data.score}（${jobLabel} / ${data.age}歳）をSALARY SCOREでチェックしました。`
      : `${namePart}年収ポジション（${jobLabel} / ${data.age}歳）をSALARY SCOREでチェックしました。`;

  // シェアURL生成ロジックを関数化しておく
  const generateShareUrl = async () => {
    const nickname = nicknameInput.trim();
    if (!nickname) {
      // 名前未入力ならURL生成せず、そのまま元URLでシェアする想定なら null 返す
      return null;
    }

    setError(null);
    setGenerating(true);
    try {
      const res = await fetch("/share-result", {
        method: "POST",
        body: new URLSearchParams({
          entryId: data.entryId,
          nickname,
        }),
      });

      if (!res.ok) {
        setError("シェアURLの生成に失敗しました。時間をおいて再度お試しください。");
        return null;
      }

      const json = (await res.json()) as { ok?: boolean; shareUrl?: string };
      if (!json.ok || !json.shareUrl) {
        setError("シェアURLの生成に失敗しました。");
        return null;
      }

      setShareUrl(json.shareUrl);
      return json.shareUrl;
    } catch (e) {
      console.error(e);
      setError("シェアURLの生成に失敗しました。");
      return null;
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      if (!effectiveShareUrl) return;
      await navigator.clipboard.writeText(effectiveShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShareToX = async () => {
    // 1. ニックネームが入力されていて、まだ shareUrl がない場合 → 生成
    let urlToUse = effectiveShareUrl;
    if (nicknameInput.trim() && !shareUrl) {
      const generated = await generateShareUrl();
      if (generated) {
        urlToUse = generated;
      }
    }

    // 2. X の intent URL を組み立てて開く
    const intentUrl =
      "https://twitter.com/intent/tweet?" +
      new URLSearchParams({
        text: shareText,
        url: urlToUse || "https://salary-score.com",
      }).toString();

    if (typeof window !== "undefined") {
      window.open(intentUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="pt-4 border-t space-y-3">
      <h2 className="text-sm font-semibold">結果をシェア</h2>

      {/* ニックネーム入力 */}
      <div className="space-y-1">
        <label className="block text-xs font-medium">
          シェア用の表示名（任意・本名は非推奨）
          <input
            type="text"
            value={nicknameInput}
            onChange={(e) => setNicknameInput(e.target.value)}
            maxLength={32}
            placeholder="例: 太郎"
            className="mt-1 w-full input input-sm input-bordered"
          />
        </label>
        <p className="text-[11px] text-base-content/60">
          ※ この名前はシェア用URLの中にのみ含まれ、サービス側のデータベースには保存されません。
          有効期限切れ後はこのURLから結果を閲覧できなくなります。
        </p>
      </div>

      {/* ボタン群 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={generateShareUrl}
          className="btn btn-sm btn-outline flex-1"
          disabled={generating}
        >
          {generating ? "シェアURLを生成中..." : "名前入りのシェアURLを生成"}
        </button>

        <button
          type="button"
          onClick={handleShareToX}
          className="btn btn-sm btn-primary flex-1"
          disabled={generating}
        >
          X で結果をシェアする
        </button>
      </div>

      {/* シェアURL表示＆コピー */}
      <div className="space-y-1">
        <p className="text-xs">
          {shareUrl
            ? "生成されたシェアURL："
            : "名前を入れずにシェアする場合は、このページのURLが使われます。"}
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            readOnly
            value={effectiveShareUrl}
            className="input input-sm input-bordered flex-1 text-xs"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-sm btn-outline"
          >
            {copied ? "コピーしました" : "URLをコピー"}
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <p className="text-xs text-base-content/60">
        個人が特定される情報（本名・会社名など）は保存していません。年齢・職種・年収レンジのみをもとにした結果です。
      </p>
    </section>
  );
}
