export default function ArticleNenshuCheckerBoyfriend() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">

      {/* タイトル */}
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          彼氏の年収はどれくらいが普通？平均額・推測方法・チェックポイントを徹底解説
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「彼氏の年収はどれくらいが普通？」「結婚を考えたとき本当に大丈夫…？」  
          そんな不安を解消するために、年代別の平均年収、婚活市場で人気の年収ライン、  
          そして無理なく相手の年収を推測する方法まで、丁寧にまとめました。
        </p>
      </header>

      {/* セクション1：平均 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">男性の年代別の平均年収</h2>
        <p className="text-sm leading-relaxed">
          国税庁「民間給与実態統計調査」によると、一般的な男性の年収は以下のとおりです。
        </p>

        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>20代前半：260〜320万円</li>
          <li>20代後半：350〜420万円</li>
          <li>30代前半：420〜500万円</li>
          <li>30代後半：470〜560万円</li>
        </ul>

        <p className="text-sm text-base-content/70 leading-relaxed">
          婚活調査でも、女性が「彼氏に求める年収」は  
          <strong>400〜500万円が最多</strong>であることが複数の調査で示されています。
        </p>
      </section>

      {/* セクション2：推測方法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">彼氏の年収を“自然に”推測する3つのポイント</h2>

        <ol className="list-decimal pl-6 text-sm space-y-2">
          <li>
            <strong>住んでいる地域・家賃</strong><br />
            家賃は年収と相関があります。一般的に、
            <span className="font-semibold">手取りの3分の1</span>が目安とされています。
          </li>
          <li>
            <strong>勤め先の企業規模</strong><br />
            上場企業か、従業員数、業界などで大まかなレンジは推測可能です。
          </li>
          <li>
            <strong>食事・旅行・デートプランの傾向</strong><br />
            完全ではありませんが、可処分所得の大きさを推測できます。
          </li>
        </ol>

        <p className="text-sm text-base-content/70">
          ただし、推測はあくまで推測。  
          正確に知りたい場合は、結婚の話が出たタイミングで率直に話すのがベストです。
        </p>
      </section>

      {/* セクション3：人気ライン */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">婚活・恋愛市場で人気の「年収ライン」</h2>
        <p className="text-sm leading-relaxed">
          調査では、女性が「理想」とする年収帯は次のような傾向があります。
        </p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>400〜500万円：現実的で最も人気</li>
          <li>500〜700万円：結婚を見据えて安心感がある層</li>
          <li>700万円以上：全体の上位10〜15%の希少層</li>
        </ul>
        <p className="text-sm text-base-content/70">
          ただし「生活力」は年収だけでは測れません。貯金・支出バランス・価値観も大切です。
        </p>
      </section>

      {/* セクション4：誘導 */}
      <section className="space-y-4 border-t pt-6">
        <h2 className="text-lg font-semibold">年収の“立ち位置”を客観的に知りたい人へ</h2>
        <p className="text-sm leading-relaxed">
          年収が「同世代の中で高いのか？普通なのか？」は、感覚では判断が難しいもの。  
          年齢・職種をもとに偏差値として可視化できるツールがあります。
        </p>
        <a href="/" className="btn btn-primary btn-sm sm:btn-md">
          年収偏差値をチェックする（無料）
        </a>
      </section>
    </main>
  );
}
