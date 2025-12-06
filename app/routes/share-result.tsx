import type { ActionFunctionArgs } from "react-router";
import { createShareToken } from "../utils/shareToken.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const entryId = String(formData.get("entryId") ?? "");
  const nicknameRaw = String(formData.get("nickname") ?? "").trim();

  if (!entryId || !nicknameRaw) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const nickname = nicknameRaw.slice(0, 32); // 長さ制限など

  // 例: 30日有効
  const ttlSeconds = 60 * 60 * 24 * 30;

  const token = createShareToken({ entryId, nickname }, ttlSeconds);

  const shareUrl = `https://salary-score.com/result/${entryId}?d=${encodeURIComponent(
    token
  )}`;

  return Response.json({ ok: true, shareUrl });
}