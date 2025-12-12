// app/routes/articles.salary-score-women.tsx
export default function SalaryScoreWomenRoute() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          女性の年収偏差値はどう見ればいい？男女差が生まれる理由と注意点
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「女性は年収が低く出やすい」「男性と同じ年収偏差値でも状況が違うのでは？」と感じる人も多いはずです。
          この記事では、女性の年収偏差値を見る際に注意したいポイントと、男女差が生まれやすい構造を整理します。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">男女で年収分布が異なりやすい理由</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-base-content/80 space-y-2">
          <li>出産・育児による休業や時短勤務の影響</li>
          <li>パート・アルバイト比率の違い</li>
          <li>管理職・マネジメント層への登用割合の差</li>
          <li>選択しやすい職種・業界の違い</li>
        </ul>
        <p className="text-sm leading-relaxed text-base-content/80">
          これらの要因が重なり、統計上は女性全体の平均年収や中央値が男性より低く見えやすくなります。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          「同じ年齢・同じ職種」で比較すると差は小さくなることも
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          一方で、フルタイム勤務かつ同じ職種・同じポジションで比べると、
          男女の年収差が統計上のイメージほど大きくないケースもあります。
        </p>
        <p className="text-sm leading-relaxed text-base-content/80">
          年収偏差値を見るときは、「男女全体の分布」だけでなく、
          <strong>同じ条件の中でどうか</strong> という視点を持つことで、自分の位置をより正確に把握しやすくなります。
        </p>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          女性の年収偏差値を「行動のきっかけ」として使う
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          男女差の構造は一人では変えられない部分もありますが、
          自分の年収偏差値を知ることは、キャリアや働き方を見直すきっかけになります。
          転職やスキルアップ、副業など、取りうる選択肢を検討する際の材料として活用するのが現実的な使い方です。
        </p>
        <a href="/" className="btn btn-primary btn-sm sm:btn-md">
          年収偏差値を診断する（無料）
        </a>
      </section>
    </main>
  );
}
