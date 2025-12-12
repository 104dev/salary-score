export default function ArticleNenshuCheckerTokyo() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">

      {/* タイトル */}
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          東京の年収は全国で別格？東京都民の年収偏差値・平均年収・分布を詳しく解説
        </h1>
        <p className="text-sm sm:text-base text-base-content/70">
          「東京は給料が高い」と言われますが、実際どれくらい差があるのか？  
          東京都の平均年収、年代別・職種別の目安、全国との差などをまとめて解説します。
        </p>
      </header>

      {/* セクション1 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">なぜ東京の年収は全国トップなのか？</h2>
        <p className="text-sm leading-relaxed">
          東京都の平均年収は<strong>620万円</strong>で全国1位。  
          全国平均と比べて140万円以上高い水準です。
        </p>
        <ul className="list-disc text-sm pl-6 space-y-1">
          <li>本社機能が集中している</li>
          <li>管理職・専門職が多い</li>
          <li>高付加価値産業が多い（IT、金融、広告、商社）</li>
          <li>生活コストに合わせた給与テーブルが存在</li>
        </ul>
      </section>

      {/* セクション2 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">東京×年齢の年収目安</h2>

        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>20代後半：430〜520万円</li>
          <li>30代前半：500〜620万円</li>
          <li>30代後半：560〜700万円</li>
        </ul>

        <p className="text-sm text-base-content/70">
          同じ年齢でも、東京と地方では<strong>年収に100〜150万円ほど差</strong>が出ることがあります。
        </p>
      </section>

      {/* セクション3 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">東京の中で見たときの「年収偏差値」</h2>
        <p className="text-sm leading-relaxed">
          東京の年収水準は全国より高いため、全国偏差値と東京偏差値は大きく異なります。
        </p>

        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>地方では偏差値60でも、東京では偏差値50前後になることがある</li>
          <li>東京在住者同士で比較した方が実態に近い</li>
        </ul>
      </section>

      {/* セクション4 */}
      <section className="space-y-4 border-t pt-6">
        <h2 className="text-lg font-semibold">東京での“リアルな立ち位置”を知りたい人へ</h2>
        <p className="text-sm leading-relaxed">
          東京は給与分布が広く、体感だけでは自分のレベルが見えにくい特徴があります。  
          年齢×職種の中央値や偏差値を客観的に確認したい場合、診断ツールが役立ちます。
        </p>
        <a href="/" className="btn btn-primary btn-sm sm:btn-md">
          年収偏差値を診断する（無料）
        </a>
      </section>
    </main>
  );
}
