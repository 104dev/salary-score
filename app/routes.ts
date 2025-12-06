import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("result/:entryId", "routes/result.$entryId.tsx"),
  route("terms", "routes/terms.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("share-result", "routes/share-result.tsx"),
] satisfies RouteConfig;