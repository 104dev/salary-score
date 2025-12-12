// app/routes/articles.salary-score-checker-faq.tsx

export default function SalaryScoreCheckerFaqRoute() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      {/* ヘッダー */}
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          年収偏差値チェッカーはおかしい？結果がズレて感じる理由と仕組みの説明
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「年収偏差値チェッカーを使ってみたけれど、結果が高すぎる／低すぎる気がする」
          「本当に信じていいのか不安」という人に向けて、年収偏差値の基本的な考え方と、
          結果が「おかしい」と感じられやすい代表的なケースを整理して解説するページです。
        </p>
        <p className="text-xs sm:text-sm text-base-content/60">
          ※本ページは、「年収偏差値チェッカー SALARY SCORE」を含む年収偏差値ツール全般の考え方を説明するものであり、
          個別の結果の正確性や将来の年収を保証するものではありません。
        </p>
      </header>

      {/* なぜ「おかしい」と感じるのか */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          なぜ年収偏差値チェッカーを「おかしい」と感じるのか
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値ツールを使ったときに、「え、こんなに偏差値高いの？」「逆に低すぎない？」と違和感を覚えることがあります。
          その多くは、ツールのバグというよりも、
          <strong>「自分の体感」と「統計の見方」のズレ</strong> から生まれます。
        </p>

        <p className="text-sm leading-relaxed text-base-content/80">
          よく見られる原因は、主に次の3つです。
        </p>

        <ul className="list-disc pl-5 text-sm leading-relaxed text-base-content/80 space-y-2">
          <li>
            <span className="font-semibold">① 周囲の年収が高く（低く）偏っている：</span>
            同僚や友人の年収レンジが一般分布とズレていて、統計上の平均と体感平均が違っている。
          </li>
          <li>
            <span className="font-semibold">② 年齢・職種ごとの分布を意識していない：</span>
            「全体平均」だけをイメージして判断してしまい、「同年代・同職種」の分布と比較していない。
          </li>
          <li>
            <span className="font-semibold">③ 平均と中央値・偏差値の違いを混同している：</span>
            平均＝みんなの真ん中だと考えてしまい、高所得者に引っ張られていることを見落としている。
          </li>
        </ul>

        <p className="text-sm leading-relaxed text-base-content/80">
          以下では、年収偏差値の仕組みと、よくある「おかしい」ポイントを順番に整理していきます。
        </p>
      </section>

      {/* 仕組みの説明 */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値の基本：平均・標準偏差・Zスコア
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値は、「同じ条件の人たちの分布の中で、自分がどの位置にいるか」を数値化したものです。
          一般的には、<strong>平均値</strong> と <strong>標準偏差</strong> を使って Zスコアを算出し、それを偏差値形式に変換します。
        </p>

        <div className="rounded-lg bg-base-200/60 px-4 py-3 text-xs sm:text-sm space-y-1">
          <p className="font-semibold">年収偏差値のイメージ</p>
          <p>
            1. 「年齢 × 職種」など条件ごとの年収データを集計する
            <br />
            2. その集団の平均年収と標準偏差を求める
            <br />
            3. 自分の年収が平均からどれだけ離れているか（Zスコア）を出す
            <br />
            4. 偏差値 = 50 + Zスコア × 10 としてスコア化する
          </p>
        </div>

        <p className="text-sm leading-relaxed text-base-content/80">
          ここで重要なのは、年収偏差値は<strong>「同じ条件で区切った集団」ごとに算出される</strong>という点です。
          20代と40代がごちゃ混ぜの分布、エンジニアと販売職が混ざった分布では、偏差値は意味を持ちません。
        </p>
      </section>

      {/* 「高すぎる」「低すぎる」と感じるケース */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          結果が「高すぎる」「低すぎる」と感じやすい典型パターン
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">ケース1：周囲が高年収の環境にいる</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            外資系コンサル、投資銀行、大手ITなど、そもそも給与水準の高い業界・職場にいる場合、
            自分のまわりの「普通」がすでに世間一般より高くなっていることがあります。
          </p>
          <p className="text-sm leading-relaxed text-base-content/80">
            この場合、統計的には偏差値60〜65であっても、本人の感覚としては「周りの同期はもっと高いから、自分は平均かそれ以下」
            と感じることがあり、結果を「おかしい」と受け取りがちです。
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">ケース2：年齢差を意識せずに比べている</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            20代と40代では、同じ年収でも位置づけがまったく変わります。
            たとえば「年収600万円」は、20代後半なら上位層に近い金額ですが、40代後半なら平均〜やや上程度に落ち着くこともあります。
          </p>
          <p className="text-sm leading-relaxed text-base-content/80">
            年収偏差値チェッカーは、基本的に<strong>「同年代のデータ」</strong>を前提に計算するため、
            「全世代の平均」イメージで比較してしまうとズレが生じます。
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">ケース3：職種ごとの分布の違いを見落としている</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            ITエンジニアやコンサルタントなど、もともと年収レンジが高い職種もあれば、
            販売・サービス・クリエイティブなど、平均年収としては抑えめになりやすい職種もあります。
          </p>
          <p className="text-sm leading-relaxed text-base-content/80">
            年収偏差値は、こうした「職種ごとの分布」を前提に計算するため、
            「世の中全員」と比較した感覚と、「同じ職種の中での位置」とが一致しないことがあります。
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">ケース4：中央値と平均値を混同している</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            年収の世界では、ごく一部の高所得者が平均を大きく押し上げていることがあります。
            そのため「平均年収」は実態より高く見えがちで、「中央値（真ん中の人）」との間に差が生まれます。
          </p>
          <p className="text-sm leading-relaxed text-base-content/80">
            中央値ベースで考えると「思ったより自分は高い／低い」ということもあり、
            ここでも体感と統計結果のギャップが「おかしい」という印象につながります。
          </p>
        </div>
      </section>

      {/* 母数やデータの限界 */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          サンプル数・データの偏りによる限界
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値の計算は、もとになるデータの質と量に依存します。一般に、次のような点に注意が必要です。
        </p>

        <ul className="list-disc pl-5 text-sm leading-relaxed text-base-content/80 space-y-2">
          <li>
            <span className="font-semibold">サンプル数が少ない条件では、偏差値が安定しない：</span>
            特定の職種・年齢・年収帯のデータがごく少ない場合、平均や分布が実態とズレることがあります。
          </li>
          <li>
            <span className="font-semibold">ユーザー入力データにはバイアスがかかる：</span>
            自主的に入力する人は、年収が高い人／低い人など特定の傾向に偏っている可能性があります。
          </li>
          <li>
            <span className="font-semibold">公開統計とユーザーデータの組み合わせにもばらつきがある：</span>
            公的な統計データと、Webサービス上での入力データを組み合わせる場合、それぞれの母集団が一致していないこともあります。
          </li>
        </ul>

        <p className="text-sm leading-relaxed text-base-content/80">
          このような理由から、年収偏差値チェッカーは<strong>あくまで「参考指標」</strong>として捉え、
          結果を完全な真実としてではなく、「自分の位置をざっくり把握するための物差し」のひとつとして利用するのが現実的です。
        </p>
      </section>

      {/* チェックリスト */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          結果が本当に「おかしい」のか確認するチェックリスト
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          実際に年収偏差値チェッカーを使ったあと、「やっぱりおかしい気がする…」と感じた場合は、
          次のポイントを一度確認してみると、違和感の原因が見えやすくなります。
        </p>

        <ol className="list-decimal pl-5 text-sm leading-relaxed text-base-content/80 space-y-2">
          <li>年齢を「満年齢」で正しく入力しているか</li>
          <li>職種が、実態に近いカテゴリになっているか（可能な範囲で一番近いものを選んでいるか）</li>
          <li>年収を「額面ベース・税込み」で入力しているか（手取りと混同していないか）</li>
          <li>単年の一時金・特別ボーナスを含めず、通常の年収で考えているか</li>
          <li>周囲と比較する際、「同じ年齢・同じ職種」の人と比べているか</li>
        </ol>

        <p className="text-sm leading-relaxed text-base-content/80">
          それでも違和感が強い場合は、
          「自分の周りの平均がたまたま高い／低い」「自分のキャリアが分布の端に寄っている」
          といった可能性も含めて、少し引いた視点から眺めてみると、結果との折り合いがつきやすくなります。
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値チェッカーに関するよくある質問
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">Q. 「年収600万円なら偏差値60ですよね？」</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            年収600万円という数字だけでは偏差値は決まりません。
            20代後半であれば偏差値60〜70に相当する場合もありますが、40代後半であれば偏差値50前後に収まることもあります。
            年収偏差値は、必ず年齢・職種とセットで見ていく必要があります。
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">Q. 地方在住だと偏差値が低く出る？</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            地方は都市部に比べて平均年収が低い傾向はありますが、「同じ地域・同じ職種の中での分布」を前提とした偏差値であれば、
            必ずしも不利とは限りません。最近はリモートワークや、地方在住で首都圏企業に勤務するケースも増えており、
            一概に「地方だから偏差値が下がる」とは言えません。
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">Q. 結果が気に入らないときはどう考えればいい？</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            年収偏差値は、あくまで今時点のスナップショットです。
            「なぜこの結果になっているのか」を分解して、職種・業界・スキル・転職タイミングなどの観点から、
            次の一手を考える材料として使うと建設的です。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-4 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値チェッカーを「参考値」として上手に使う
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値チェッカーは、完璧な真実を示すものではありませんが、
          年齢・職種・年収レンジを基準に「自分の立ち位置を大まかにつかむ」ための目安としては有効なツールです。
        </p>
        <p className="text-sm leading-relaxed text-base-content/80">
          数字そのものに一喜一憂するのではなく、
          「今どのあたりにいて、どの方向に動けばよいか」を考えるきっかけとして活用するのがおすすめです。
        </p>

        <div className="rounded-lg border border-primary/40 bg-primary/5 px-4 py-5 space-y-3">
          <p className="text-sm font-semibold">
            実際に自分の年収偏差値をチェックしてみる
          </p>
          <p className="text-xs sm:text-sm text-base-content/70">
            年齢・職種・年収レンジを入力すると、同年代・同職種の中での年収ポジションを偏差値形式で確認できます。
            入力は匿名で、個人を特定する情報は不要です。
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-btn btn btn-primary btn-sm sm:btn-md"
          >
            年収偏差値を診断する（無料）
          </a>
        </div>
      </section>

      {/* 関連リンク */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">関連ページ</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 text-primary">
          <li>
            <a href="/articles/salary-score-60" className="link link-primary">
              年収偏差値60とは？上位何％・具体的な年収・生活レベルまで解説
            </a>
          </li>
          <li>
            <a href="/articles/salary-score-ranking" className="link link-primary">
              年収偏差値ランキング：年代×職種別の年収ポジション
            </a>
          </li>
          <li>
            <a href="/articles/salary-score-median" className="link link-primary">
              年収偏差値と中央値・平均値の違いをわかりやすく解説
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
