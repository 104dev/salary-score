// app/routes/articles.salary-score-median.tsx
export default function SalaryScoreMedianRoute() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      {/* ページヘッダー */}
      <section className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          年収偏差値と中央値・平均値の違いをわかりやすく解説
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「平均年収」と「中央値」と「年収偏差値」。似たような言葉が並ぶものの、指しているものは微妙に違います。
          この記事では、それぞれの指標の意味と使いどころ、勘違いしやすいポイントを整理します。
        </p>
        <p className="text-xs sm:text-sm text-base-content/60">
          ※本ページの内容は一般的な統計の考え方をもとにした解説であり、個々の企業や職種の実態を完全に反映するものではありません。
        </p>
      </section>

      {/* 中央値と平均値 */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">平均年収と中央値の違い</h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収の話題でよく使われるのが「平均年収」と「年収の中央値」です。
          ざっくりと言うと、平均年収は「合計を人数で割った値」、中央値は「年収順に並べたときの真ん中の人」です。
        </p>

        <div className="rounded-lg bg-base-200/60 px-4 py-3 text-xs sm:text-sm space-y-1">
          <p className="font-semibold">例：5人の年収が 300 / 350 / 400 / 450 / 1,000（万円）の場合</p>
          <p>
            ・平均年収： (300 + 350 + 400 + 450 + 1000) ÷ 5 = 500万円
            <br />
            ・中央値： 真ん中の人の年収 = 400万円
          </p>
        </div>

        <p className="text-sm leading-relaxed text-base-content/80">
          一部の高所得者がいると平均は大きく引き上げられますが、中央値は「真ん中の人」なので極端な値の影響を受けにくく、
          多くの人の体感に近い指標になります。
        </p>
      </section>

      {/* 年収偏差値との関係 */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">年収偏差値は「分布の中の位置」を示す指標</h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値は、平均年収や中央値とは違い、年収分布全体の中で「自分がどの位置にいるか」を表す指標です。
          偏差値50が真ん中、60が上位約15％、70が上位数％といったイメージになります。
        </p>
        <p className="text-sm leading-relaxed text-base-content/80">
          そのため、「中央値との差」や「平均とのギャップ」を見るだけでなく、
          年収偏差値を合わせて見ることで、自分の立ち位置をより立体的に把握することができます。
        </p>
      </section>

      {/* どう使い分けるか */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">平均・中央値・偏差値の使い分け</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-base-content/80 space-y-2">
          <li>
            <span className="font-semibold">平均年収：</span>
            業界全体のざっくりした水準感を知るのに便利。高所得層に引っ張られやすい点に注意。
          </li>
          <li>
            <span className="font-semibold">中央値：</span>
            「真ん中の生活感」を知りたいときに有効。自分の年収が中央値と比べて高いか低いかを見たいときに役立つ。
          </li>
          <li>
            <span className="font-semibold">年収偏差値：</span>
            年齢や職種を揃えたうえで、自分が分布のどの位置にいるかを把握したいときに使う指標。
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          中央値・平均値だけでなく「年収偏差値」もあわせて確認してみる
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          中央値や平均だけでは、自分の年収が「どのくらい上なのか／下なのか」を数字で把握しにくいことがあります。
          年収偏差値をあわせて確認すると、同年代・同職種の中でのポジションがより具体的にイメージしやすくなります。
        </p>
        <a href="/" className="btn btn-primary btn-sm sm:btn-md">
          年収偏差値を診断する（無料）
        </a>
      </section>
    </main>
  );
}
