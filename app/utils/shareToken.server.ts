import crypto from "crypto";

const SHARE_TOKEN_SECRET = process.env.SHARE_TOKEN_SECRET ?? "dev-secret";

export type ShareTokenPayload = {
  entryId: string;
  nickname: string;
  exp: number; // Unix time (秒)
};

function base64UrlEncode(buf: Buffer) {
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string) {
  const pad = 4 - (str.length % 4 || 4);
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  return Buffer.from(base64, "base64");
}

export function createShareToken(
  payload: Omit<ShareTokenPayload, "exp">,
  ttlSeconds: number
): string {
  const fullPayload: ShareTokenPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };

  const json = JSON.stringify(fullPayload);
  const payloadPart = base64UrlEncode(Buffer.from(json, "utf8"));

  const hmac = crypto
    .createHmac("sha256", SHARE_TOKEN_SECRET)
    .update(payloadPart)
    .digest();

  const sigPart = base64UrlEncode(hmac);

  return `${payloadPart}.${sigPart}`;
}

export function verifyShareToken(token: string): ShareTokenPayload | null {
  const [payloadPart, sigPart] = token.split(".");
  if (!payloadPart || !sigPart) return null;

  const expectedSig = base64UrlEncode(
    crypto.createHmac("sha256", SHARE_TOKEN_SECRET).update(payloadPart).digest()
  );

  // タイミング攻撃対策
  const sigBuf = Buffer.from(sigPart);
  const expectedBuf = Buffer.from(expectedSig);
  if (
    sigBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expectedBuf)
  ) {
    return null;
  }

  try {
    const json = base64UrlDecode(payloadPart).toString("utf8");
    const payload = JSON.parse(json) as ShareTokenPayload;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // 有効期限切れ
    }

    return payload;
  } catch {
    return null;
  }
}
