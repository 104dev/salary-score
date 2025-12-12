// app/routes/articles.tsx

export default function ArticlesRoute() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* ページヘッダー */}
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          年収偏差値・年収の基礎知識 記事一覧
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「年収偏差値チェッカー SALARY SCORE」に関連する年収・市場価値・偏差値の
          基礎知識をまとめた記事一覧です。  
          年収偏差値の意味、具体的な年収ライン、生活レベル、統計の仕組みなどを整理して学べます。
        </p>
      </header>

      {/* 記事リスト */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">公開中の記事</h2>

        <div className="space-y-6">
          {/* 1. 年収偏差値60 */}
          <article className="border rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="/articles/salary-score-60" className="link link-hover link-primary">
                年収偏差値60とは？上位何％・具体的な年収・生活レベルまで解説
              </a>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-base-content/70 leading-relaxed">
              年収偏差値60がどの位置に相当するのか、年代別・職種別の年収イメージ、
              生活レベルの目安、よくある誤解などをまとめた解説記事。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-base-content/60">
              <span className="badge badge-outline badge-sm">年収偏差値</span>
              <span className="badge badge-outline badge-sm">年収の目安</span>
              <span className="badge badge-outline badge-sm">生活レベル</span>
            </div>
          </article>

          {/* 2. 年収偏差値チェッカーはおかしい？ */}
          <article className="border rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold">
              <a
                href="/articles/salary-score-checker-faq"
                className="link link-hover link-primary"
              >
                年収偏差値チェッカーはおかしい？結果がズレて感じる理由と仕組みの説明
              </a>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-base-content/70 leading-relaxed">
              「高すぎる／低すぎる」と感じる理由の大半は、体感と統計のズレ。
              年収偏差値の仕組み・よくある誤解・注意点を整理したFAQ形式の解説記事。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-base-content/60">
              <span className="badge badge-outline badge-sm">仕組み</span>
              <span className="badge badge-outline badge-sm">FAQ</span>
              <span className="badge badge-outline badge-sm">よくある疑問</span>
            </div>
          </article>

          {/* 3. 年収偏差値と中央値 */}
          <article className="border rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="/articles/salary-score-median" className="link link-hover link-primary">
                年収偏差値と中央値・平均値の違いをわかりやすく解説
              </a>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-base-content/70 leading-relaxed">
              平均年収・中央値・偏差値の違いを整理し、年収を見るときにどの指標をどう使うべきかをわかりやすく説明。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-base-content/60">
              <span className="badge badge-outline badge-sm">中央値</span>
              <span className="badge badge-outline badge-sm">平均年収</span>
              <span className="badge badge-outline badge-sm">統計の基礎</span>
            </div>
          </article>

          {/* 4. 都道府県別の年収偏差値 */}
          <article className="border rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="/articles/salary-score-prefecture" className="link link-hover link-primary">
                都道府県別の年収偏差値：地域差はどこまで重要か？
              </a>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-base-content/70 leading-relaxed">
              都道府県ごとの平均年収の違いと、年収偏差値を見るときに地域差をどう扱うべきかを整理した記事。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-base-content/60">
              <span className="badge badge-outline badge-sm">地域差</span>
              <span className="badge badge-outline badge-sm">都道府県</span>
              <span className="badge badge-outline badge-sm">年収分布</span>
            </div>
          </article>

          {/* 5. 年収偏差値ランキング */}
          <article className="border rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="/articles/salary-score-ranking" className="link link-hover link-primary">
                年収偏差値ランキング：年代×職種で見る年収ポジション
              </a>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-base-content/70 leading-relaxed">
              偏差値と順位の関係、年代×職種ごとにランキングを見るべき理由など、
              年収ランキングの「正しい読み方」を整理した記事。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-base-content/60">
              <span className="badge badge-outline badge-sm">ランキング</span>
              <span className="badge badge-outline badge-sm">偏差値</span>
              <span className="badge badge-outline badge-sm">統計の見方</span>
            </div>
          </article>

          {/* 6. 年収偏差値80 */}
          <article className="border rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="/articles/salary-score-80" className="link link-hover link-primary">
                年収偏差値80とは？上位2〜3％の世界とキャリアパターン
              </a>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-base-content/70 leading-relaxed">
              年収偏差値80が意味する上位数％の世界、具体的な年収イメージ、到達しやすい職種やキャリアを整理した記事。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-base-content/60">
              <span className="badge badge-outline badge-sm">高年収</span>
              <span className="badge badge-outline badge-sm">偏差値80</span>
              <span className="badge badge-outline badge-sm">キャリア</span>
            </div>
          </article>

          {/* 7. 大学別の年収偏差値 */}
          <article className="border rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="/articles/salary-score-university" className="link link-hover link-primary">
                大学別の年収偏差値は？学歴と年収の関係を整理する
              </a>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-base-content/70 leading-relaxed">
              大学別年収ランキングの見方、学歴と年収の関係、偏差値の扱い方をまとめた記事。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-base-content/60">
              <span className="badge badge-outline badge-sm">大学別</span>
              <span className="badge badge-outline badge-sm">学歴</span>
              <span className="badge badge-outline badge-sm">年収傾向</span>
            </div>
          </article>

          {/* 8. 女性の年収偏差値 */}
          <article className="border rounded-xl p-4 sm:p-5 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="/articles/salary-score-women" className="link link-hover link-primary">
                女性の年収偏差値はどう見ればいい？男女差が生まれる理由と注意点
              </a>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-base-content/70 leading-relaxed">
              年収分布の男女差の理由、同条件で比較する重要性など、
              女性が年収偏差値を見てキャリアを考える際のポイントをまとめた記事。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-base-content/60">
              <span className="badge badge-outline badge-sm">女性</span>
              <span className="badge badge-outline badge-sm">男女差</span>
              <span className="badge badge-outline badge-sm">キャリア</span>
            </div>
          </article>
        </div>
      </section>

      {/* 診断ツールへの導線 */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          まだ診断していない場合は、まず年収偏差値をチェック
        </h2>
        <p className="text-sm text-base-content/80 leading-relaxed">
          記事で基礎知識を把握したうえで、実際の年齢・職種・年収レンジをもとに
          自分の現在位置を診断すると理解が深まりやすくなります。
        </p>
        <a href="/" className="btn btn-primary btn-sm sm:btn-md">
          年収偏差値を診断する（無料）
        </a>
      </section>
    </main>
  );
}
