// app/routes/articles.salary-score-ranking.tsx
export default function SalaryScoreRankingRoute() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          年収偏差値ランキング：年代×職種で見る年収ポジション
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「自分の年収は、同年代・同職種のなかでどのくらいの順位なのか？」という疑問に答えるために、
          年収偏差値の考え方をベースにした「ランキング」の見方を整理します。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">偏差値と順位のざっくり対応</h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値は、順位と密接に結びついています。
          あくまで目安ですが、次のようなイメージで対応します。
        </p>

        <div className="overflow-x-auto">
          <table className="table table-sm border text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-200">
                <th>偏差値</th>
                <th>ざっくりした順位イメージ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>70</td>
                <td>上位2〜3％程度（100人中1〜3位）</td>
              </tr>
              <tr>
                <td>65</td>
                <td>上位7％程度（100人中7位前後）</td>
              </tr>
              <tr>
                <td>60</td>
                <td>上位15％程度（100人中15位前後）</td>
              </tr>
              <tr>
                <td>55</td>
                <td>上位30％程度（100人中30位前後）</td>
              </tr>
              <tr>
                <td>50</td>
                <td>真ん中付近（100人中50位前後）</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-relaxed text-base-content/80">
          細かいパーセンタイルは分布の形によって変わりますが、
          「偏差値60であれば、同じ集団のなかでだいたい上位15％くらい」という感覚を持っておくと便利です。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          年代別・職種別にランキングを見るべき理由
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          20代と40代、ITエンジニアと営業職など、年齢や職種をまたいだ「全員まとめてのランキング」はあまり意味を持ちません。
          経験年数やキャリアパスがまったく違うためです。
        </p>
        <p className="text-sm leading-relaxed text-base-content/80">
          実際の年収偏差値ランキングは、
          <strong>「年代 × 職種」ごとに分けたうえで、その分布の中でどの位置にいるか</strong> を見ることで、
          はじめて現実的な比較ができるようになります。
        </p>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          ランキングそのものより「次にどう動くか」に目を向ける
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値ランキングは、今の立ち位置を知るには便利ですが、それ自体が目的になってしまうとあまり意味はありません。
          大切なのは、「今どこにいるのか」を把握したうえで、
          「どのスキルや経験を積めば、どのゾーンを目指せるのか」を考えることです。
        </p>
        <a href="/" className="btn btn-primary btn-sm sm:btn-md">
          年収偏差値を診断する（無料）
        </a>
      </section>
    </main>
  );
}
