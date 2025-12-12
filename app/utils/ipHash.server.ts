import crypto from "crypto";

const IP_HASH_SALT = process.env.IP_HASH_SALT ?? process.env.CLIENT_ID_SALT ?? "";

export function hashIp(ip: string): string {
  if (!ip) return "";
  return crypto
    .createHash("sha256")
    .update(ip + IP_HASH_SALT)
    .digest("hex");
}
