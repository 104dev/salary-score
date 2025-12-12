export default function SalaryScore60Route() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          年収偏差値60とは？上位何％・具体的な年収・生活レベルまで解説
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「年収偏差値60ってどのくらいすごいのか」「自分はどの位置にいるのか」を知りたい人向けの解説ページです。
          年収偏差値の意味、年代・職種ごとの年収ライン、生活レベルのイメージ、到達しやすいキャリアパターンまでを整理してまとめています。
        </p>
        <p className="text-xs sm:text-sm text-base-content/60">
          ※本ページの内容は一般的な統計や傾向をもとにした目安であり、個々の状況によって変動します。
        </p>
      </header>

      {/* 年収偏差値60の意味 */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値60の意味：上位約15％の「かなり高い」ポジション
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値60は、受験などで使われる偏差値と同じ考え方で、
          「平均（偏差値50）より10ポイント高い位置」にいることを意味します。
          統計上はおおよそ<strong>上位15％前後</strong>に相当し、「かなり高い」部類に入る年収水準です。
        </p>

        <div className="overflow-x-auto">
          <table className="table table-sm border text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-200">
                <th>偏差値</th>
                <th>上位割合の目安</th>
                <th>位置づけ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>70</td>
                <td>上位2〜3％</td>
                <td>超高所得層</td>
              </tr>
              <tr>
                <td className="font-semibold">60</td>
                <td className="font-semibold">上位15％前後</td>
                <td className="font-semibold">かなり高い</td>
              </tr>
              <tr>
                <td>50</td>
                <td>上位50％</td>
                <td>中央値付近（ふつう）</td>
              </tr>
              <tr>
                <td>40</td>
                <td>上位70％</td>
                <td>平均よりやや低い</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-relaxed text-base-content/80">
          いわゆる「富裕層」と呼ばれるレベル（偏差値70台）には届かないものの、
          日常生活に大きな不安が少なく、貯蓄や投資にも余力を持てるゾーンが年収偏差値60付近です。
        </p>
      </section>

      {/* 偏差値の仕組み */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値の仕組み：平均・標準偏差・Zスコア
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値は、ある集団の中で「自分の年収がどの位置にいるか」を表す指標です。
          一般的には、平均年収と標準偏差を使って「Zスコア」という値を求め、偏差値に変換します。
        </p>

        <div className="rounded-lg bg-base-200/60 px-4 py-3 text-xs sm:text-sm space-y-1">
          <p className="font-semibold">年収偏差値のイメージ</p>
          <p>
            1. 集団の平均年収と標準偏差を求める
            <br />
            2. 「（自分の年収 − 平均年収） ÷ 標準偏差」でZスコアを算出
            <br />
            3. 偏差値 = 50 + Zスコア × 10 として計算
          </p>
        </div>

        <p className="text-sm leading-relaxed text-base-content/80">
          ここで重要なのは、年収偏差値は<strong>年齢や職種、場合によっては地域</strong>といった条件ごとに分布が変わるという点です。
          20代と40代、ITエンジニアと販売職など、前提となる集団が異なれば、同じ年収でも偏差値はまったく違う数値になります。
        </p>
      </section>

      {/* 年代別の目安 */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          年代別：年収偏差値60の年収目安
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年代によって「年収偏差値60」に相当する金額は変化します。
          以下は日本の一般的な給与水準をもとにした目安であり、業界や会社規模によって上下します。
        </p>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">20代の年収偏差値60</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm border text-xs sm:text-sm">
              <thead>
                <tr className="bg-base-200">
                  <th>年齢</th>
                  <th>年収偏差値60の目安</th>
                  <th>コメント</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>20〜24歳</td>
                  <td>350〜450万円前後</td>
                  <td>高専卒・大卒の一部、賞与込みで届くゾーン</td>
                </tr>
                <tr>
                  <td>25〜29歳</td>
                  <td className="font-semibold">450〜550万円前後</td>
                  <td>IT・総合商社・金融などでは珍しくない水準</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">30代の年収偏差値60</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm border text-xs sm:text-sm">
              <thead>
                <tr className="bg-base-200">
                  <th>年齢</th>
                  <th>年収偏差値60の目安</th>
                  <th>コメント</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30〜34歳</td>
                  <td>600〜700万円前後</td>
                  <td>大企業の中堅層や一部の専門職が多いレンジ</td>
                </tr>
                <tr>
                  <td>35〜39歳</td>
                  <td className="font-semibold">650〜750万円前後</td>
                  <td>管理職や成果報酬型の職種で到達しやすい</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">40代の年収偏差値60</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm border text-xs sm:text-sm">
              <thead>
                <tr className="bg-base-200">
                  <th>年齢</th>
                  <th>年収偏差値60の目安</th>
                  <th>コメント</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>40〜44歳</td>
                  <td>700〜850万円前後</td>
                  <td>管理職や専門性の高い職種が中心</td>
                </tr>
                <tr>
                  <td>45〜49歳</td>
                  <td className="font-semibold">750〜900万円前後</td>
                  <td>役職・会社規模による差が大きく出るゾーン</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-base-content/80">
          同じ「年収600万円」でも、20代後半なら偏差値60〜70相当、40代後半なら偏差値50前後など、
          年代によって意味合いは大きく変わります。
        </p>
      </section>

      {/* 職種別の目安 */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          職種別：年収偏差値60のライン比較
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収の水準は職種によっても大きく異なります。
          ここでは、20代後半（25〜29歳）を想定した「年収偏差値60」の目安を、主な職種ごとにざっくり比較します。
        </p>

        <div className="overflow-x-auto">
          <table className="table table-sm border text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-200">
                <th>職種</th>
                <th>年収偏差値60の目安</th>
                <th>コメント</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold">ITエンジニア</td>
                <td className="font-semibold">500〜600万円前後</td>
                <td>スキル・市場価値に応じたレンジで比較的到達しやすい</td>
              </tr>
              <tr>
                <td>コンサルタント</td>
                <td>600〜700万円前後</td>
                <td>外資系や戦略系ではさらに高い水準になることも多い</td>
              </tr>
              <tr>
                <td>法人営業</td>
                <td>450〜550万円前後</td>
                <td>インセンティブ込みで偏差値60を超えるケースも多い</td>
              </tr>
              <tr>
                <td>企画・マーケティング</td>
                <td>450〜520万円前後</td>
                <td>大企業と中小企業で差が出やすい職種</td>
              </tr>
              <tr>
                <td>経理・財務</td>
                <td>430〜520万円前後</td>
                <td>専門性が高まる30代以降に伸びやすい</td>
              </tr>
              <tr>
                <td>人事・採用</td>
                <td>400〜480万円前後</td>
                <td>評価制度や等級によって上下が大きい</td>
              </tr>
              <tr>
                <td>クリエイティブ職</td>
                <td>350〜450万円前後</td>
                <td>フリーランス・副業込みで年収を伸ばすケースも多い</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-relaxed text-base-content/80">
          同じ偏差値60でも「ITエンジニアの500万」と「クリエイティブ職の400万」など、職種によって絶対額は変わります。
          重要なのは、同じ年齢・同じ職種の中でどの位置にいるのかという「相対的なポジション」です。
        </p>
      </section>

      {/* 生活レベル */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値60の生活レベル目安
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値60の層は、おおむね「生活に大きな不安が少なく、貯蓄・投資にも余力がある」ゾーンに位置します。
          ここでは、単身者またはDINKsを想定した生活イメージをまとめます（首都圏・都市部ベース）。
        </p>

        <div className="overflow-x-auto">
          <table className="table table-sm border text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-200">
                <th>項目</th>
                <th>目安</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>家賃</td>
                <td>首都圏で9〜12万円前後の1K〜1LDKが無理なく借りられる</td>
              </tr>
              <tr>
                <td>貯蓄ペース</td>
                <td>年間100〜150万円程度の貯蓄が現実的</td>
              </tr>
              <tr>
                <td>自動車</td>
                <td>コンパクト〜ミドルクラスであれば維持可能（駐車場次第）</td>
              </tr>
              <tr>
                <td>投資</td>
                <td>つみたてNISA満額（年40万円）を継続できる余力がある</td>
              </tr>
              <tr>
                <td>旅行</td>
                <td>年に2〜3回の国内旅行、近場海外旅行も計画しやすい</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-relaxed text-base-content/80">
          実際の生活水準は家族構成や居住地、ライフスタイルによって大きく変わりますが、
          年収偏差値60前後は「ギリギリではなく、将来に備えながら生活を組み立てられる層」と考えられます。
        </p>
      </section>

      {/* 到達しやすいキャリアパターン */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値60に到達しやすいキャリアパターン
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値60に到達する人には、いくつか共通する傾向が見られます。
          学歴だけではなく、属している産業や職種、転職のタイミングなどが複合的に影響します。
        </p>

        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 text-base-content/80">
          <li>
            <span className="font-semibold">成長産業に属している：</span>
            IT・インターネット・金融・医療・専門コンサルなど、そもそもの給与水準が高い業界にいるケース。
          </li>
          <li>
            <span className="font-semibold">20代のうちに専門性を確立している：</span>
            エンジニア、データ、企画、財務など専門スキルを武器にしているケース。
          </li>
          <li>
            <span className="font-semibold">転職市場を活用している：</span>
            1〜2回の転職で年収レンジを引き上げ、大幅な昇給を実現しているケース。
          </li>
          <li>
            <span className="font-semibold">管理職やリーダーポジションについている：</span>
            チームマネジメントや予算責任とセットで年収が上がるパターン。
          </li>
          <li>
            <span className="font-semibold">副業・複業で総年収を底上げしている：</span>
            本業＋副業の合計で年収偏差値60を超えるパターンも増えつつある。
          </li>
        </ul>
      </section>

      {/* よくある誤解・FAQ */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          年収偏差値60に関するよくある誤解・勘違い
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">「年収600万円＝偏差値60」とは限らない</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            年収600万円という数字だけを切り取って偏差値を語ることはできません。
            20代後半であれば偏差値60〜70相当になることもありますが、40代後半であれば偏差値50台前半に収まるケースもあります。
            年収の絶対値ではなく、年齢と職種をそろえたうえで比較する必要があります。
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">「高年収企業に入れば偏差値60になる」とは限らない</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            有名企業や高年収で知られる会社に所属していても、職種や等級によって年収レンジは大きく異なります。
            たとえば同じ会社でも、エンジニアと一般事務、コンサルタントとバックオフィスでは分布が違うため、
            年収偏差値も別々に考える必要があります。
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">「地方だから偏差値が低くなる」とは限らない</h3>
          <p className="text-sm leading-relaxed text-base-content/80">
            地方は都市部に比べて平均年収・中央値が低い傾向はありますが、
            その地域の中で見たときに年収偏差値がどうか、という視点も重要です。
            地方拠点の高収入ポジションやリモートワークなど、「場所に縛られない働き方」が増えている点も押さえておく必要があります。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-4 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          自分の年収偏差値を知るには？【無料チェッカーの案内】
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値60のイメージを把握することはできますが、
          実際にどの位置にいるかは、年齢・職種・年収レンジをもとにデータで確認する必要があります。
        </p>
        <p className="text-sm leading-relaxed text-base-content/80">
          「年収偏差値チェッカー SALARY SCORE」では、
          年齢・職種・年収レンジを入力するだけで、同年代・同職種の中でのスコアや分布を偏差値形式で可視化できます。
        </p>

        <div className="rounded-lg border border-primary/40 bg-primary/5 px-4 py-5 space-y-3">
          <p className="text-sm font-semibold">
            無料で自分の年収ポジションを確認する
          </p>
          <p className="text-xs sm:text-sm text-base-content/70">
            ・年齢×職種ごとの年収分布をヒストグラムで表示
            <br />
            ・偏差値スコアと「上位何％か」が一目でわかる
            <br />
            ・入力は匿名で、個人を特定する情報は不要
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-btn btn btn-primary btn-sm sm:btn-md"
          >
            年収偏差値を診断する（無料）
          </a>
        </div>
      </section>

      {/* 関連リンク案内 */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          関連ページ
        </h2>
        <ul className="list-disc pl-5 text-sm space-y-1 text-primary">
          <li>
            <a href="/articles/salary-score-80" className="link link-primary">
              年収偏差値80とは？上位2〜3％の世界と到達ルート
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
          <li>
            <a href="/articles/salary-score-checker-faq" className="link link-primary">
              年収偏差値チェッカーはおかしい？よくある疑問と回答
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
