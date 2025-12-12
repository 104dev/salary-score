// app/routes/articles.salary-score-80.tsx
export default function SalaryScore80Route() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          年収偏差値80とは？上位2〜3％の世界とキャリアパターン
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「年収偏差値80」と聞くと、どれくらいのレベルを想像するでしょうか。
          この記事では、偏差値80が意味する位置づけと、具体的な年収イメージ、到達しやすい職種・キャリアの傾向を整理します。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">年収偏差値80＝上位2〜3％程度</h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          偏差値の感覚として、80は上位数％にあたるゾーンです。
          年収偏差値80は、おおよそ<strong>上位2〜3％程度</strong>に相当し、統計的にはかなり稀な層になります。
        </p>
        <p className="text-sm leading-relaxed text-base-content/80">
          ただし、「年収偏差値80だから必ずしも贅沢な暮らしをしている」とは限らず、
          住宅ローンや教育費など、ライフスタイルによって体感は変わってきます。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">年代別のざっくり年収イメージ</h2>
        <div className="overflow-x-auto">
          <table className="table table-sm border text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-200">
                <th>年代</th>
                <th>年収偏差値80の目安</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20代後半</td>
                <td>800〜1,000万円前後</td>
              </tr>
              <tr>
                <td>30代</td>
                <td>1,000〜1,500万円前後</td>
              </tr>
              <tr>
                <td>40代</td>
                <td>1,200〜2,000万円前後</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs sm:text-sm text-base-content/60">
          ※あくまで目安であり、業界・企業規模・インセンティブなどによって大きく上下します。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値80に多い職種・キャリアの傾向
        </h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-base-content/80 space-y-2">
          <li>外資系コンサルティングファーム・投資銀行の中堅〜シニア層</li>
          <li>大手企業の部長クラス以上や専門性の高い管理職</li>
          <li>ストックオプションや成果報酬比率の高いポジション</li>
          <li>高付加価値な専門スキルを持つITエンジニア・アーキテクトなど</li>
        </ul>
        <p className="text-sm leading-relaxed text-base-content/80">
          このゾーンにいる人たちは、学歴や最初の就職先だけでなく、
          その後のキャリア選択・転職タイミング・スキルへの投資など、複数の要素が積み重なって現在の水準に到達しているケースが多いと言えます。
        </p>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          まずは「今の自分の位置」を把握するところから
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値80は確かに高いハードルですが、いきなりそこだけを目指すよりも、
          まずは同年代・同職種の中での現在位置を把握し、「次にどのゾーンを目標にするか」を決めていくほうが現実的です。
        </p>
        <a href="/" className="btn btn-primary btn-sm sm:btn-md">
          年収偏差値を診断する（無料）
        </a>
      </section>
    </main>
  );
}
