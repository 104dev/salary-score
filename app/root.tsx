// app/root.tsx
import {
  isRouteErrorResponse,
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

// 共通 meta / OGP（必要ならあとで上書きも可）
export function meta(_: Route.MetaArgs) {
  return [
    {
      title: "SALARY INDEX | 匿名で年収の立ち位置がわかる",
    },
    {
      name: "description",
      content:
        "年齢・職種・年収を入れるだけで、市場の中で自分のポジションをスコアで確認できます。",
    },
    {
      property: "og:title",
      content: "SALARY INDEX | 匿名で年収の立ち位置がわかる",
    },
    {
      property: "og:description",
      content:
        "年齢・職種・年収を入れるだけで、市場の中で自分のポジションをスコアで確認できます。",
    },
    {
      property: "og:image",
      content: "https://your-domain.example/ogp-default.png",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://your-domain.example/",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen flex flex-col bg-base-200 text-base-content">
          {/* Header */}
          <header className="navbar bg-base-100 shadow-sm">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight">
                  SALARY<span className="text-primary">INDEX</span>
                </span>
                <span className="text-xs sm:text-sm text-base-content/60">
                  あなたの年収ポジションを偏差値で見る
                </span>
              </div>
              <nav className="flex items-center gap-4 text-sm text-base-content/70">
                <a
                  href="https://x.com"
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
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-12 border-t border-base-300 bg-base-100">
            <div className="container mx-auto px-4 py-6 text-xs sm:text-sm text-base-content/60 flex flex-col sm:flex-row gap-2 justify-between">
              <span>© {currentYear} SALARY INDEX</span>
              <span>これは個人による年収リサーチプロトタイプです。</span>
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