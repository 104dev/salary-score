import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("result/:entryId", "routes/result.$entryId.tsx"),
  route("terms", "routes/terms.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("share-result", "routes/share-result.tsx"),
  route("articles", "routes/articles.tsx"),
  route("articles/salary-score-60", "routes/articles/salary-score-60.tsx"),
  route("articles/salary-score-checker-faq", "routes/articles/salary-score-checker-faq.tsx"),
  route("articles/salary-score-median", "routes/articles/salary-score-median.tsx"),
  route("articles/salary-score-prefecture", "routes/articles/salary-score-prefecture.tsx"),
  route("articles/salary-score-ranking", "routes/articles/salary-score-ranking.tsx"),
  route("articles/salary-score-80", "routes/articles/salary-score-80.tsx"),
  route("articles/salary-score-university", "routes/articles/salary-score-university.tsx"),
  route("articles/salary-score-women", "routes/articles/salary-score-women.tsx"),
  route("articles/salary-score-tokyo", "routes/articles/salary-score-tokyo.tsx"),
  route("articles/salary-checker-boyfriend", "routes/articles/salary-checker-boyfriend.tsx"),
] satisfies RouteConfig;