import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

// 共通リンク（フォントなど）
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function meta() {
  const title = "年収偏差値チェッカー | SALARY SCORE";
  const description =
    "年齢・職種・年収から、あなたの市場ポジションを偏差値スコアで可視化する年収診断ツールです。";

  const url = "https://salary-score.com";
  const ogImage = "https://salary-score.com/ogp-default.png";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
  ];
}

const GTM_ID = "GTM-W9FG4KSZ";

export function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body>
        {/* GTM noscript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <div className="min-h-screen flex flex-col bg-base-200 text-base-content">
          {/* Header */}
        <header className="navbar bg-base-100 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">

            {/* ==== ロゴ + サブタイトル ==== */}
            <Link to="/" className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2 no-underline">
            {/* ロゴ */}
            <span className="text-2xl font-extrabold tracking-tight leading-none">
                SALARY<span className="text-primary">SCORE</span>
            </span>

            {/* サブタイトル（スマホではロゴの下に来る） */}
            <span className="text-sm text-base-content/60 leading-tight mt-1 sm:mt-0">
                あなたの年収ポジションを偏差値で見る
            </span>
            </Link>

            {/* ==== 右側ナビ ==== */}
            <nav className="flex items-center gap-4 text-sm text-base-content/70">
                <Link to="/articles" className="link link-hover">
                  記事一覧
                </Link>
                <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "年収偏差値チェッカー『SALARY SCORE』で市場ポジションを診断しよう📊"
                )}&url=${encodeURIComponent("https://salary-score.com")}`}
                className="link link-hover"
                target="_blank"
                rel="noreferrer"
                >
                X でシェア
                </a>
            </nav>

        </div>
        </header>

          {/* Main */}
          {/* ★ スマホでの余白を付与（横: px-4, 縦: py-6） */}
          <main className="flex-1 px-4 py-6 sm:px-0 sm:py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-12 border-t border-base-300 bg-base-100">
            <div className="container mx-auto px-4 py-6 text-xs sm:text-sm text-base-content/60 flex flex-col sm:flex-row gap-3 justify-between">
              <span>© {currentYear} SALARY SCORE</span>

              <nav className="flex items-center gap-4">
                <Link to="/articles" className="link link-hover">
                  記事一覧
                </Link>
                <a href="/terms" className="link link-hover">
                  利用規約
                </a>
                <a href="/privacy-policy" className="link link-hover">
                  プライバシー
                </a>
                <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "年収偏差値チェッカー『SALARY SCORE』で市場ポジションを診断しよう📊"
                )}&url=${encodeURIComponent("https://salary-score.com")}`}
                className="link link-hover"
                target="_blank"
                rel="noreferrer"
                >
                X でシェア
                </a>
              </nav>
            </div>

            <div className="text-center pb-4 text-[11px] text-base-content/50">
              本ツールは公開データに基づく
              <span className="font-semibold">統計的な参考値</span>
              を提供するものです。
              <br className="sm:hidden" />
              内容の正確性や結果の保証を行うものではありません。
            </div>
          </footer>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-2">{message}</h1>
      <p className="mb-4">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-base-200 rounded">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
