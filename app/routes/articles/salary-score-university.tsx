// app/routes/articles.salary-score-university.tsx
export default function SalaryScoreUniversityRoute() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          大学別の年収偏差値は？学歴と年収の関係を整理する
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
          「どの大学に行くと年収が高くなりやすいか」「大学別の年収ランキングが気になる」という声は少なくありません。
          この記事では、学歴と年収の関係性を整理しつつ、「大学別年収偏差値」をどう捉えればよいかを考えます。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">大学別の平均年収ランキングの見方</h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          大学別の平均年収ランキングは、卒業生の就職先や業界構成などを集計した結果として、公表されることがあります。
          ただし、同じ大学でも文系・理系、学部・学科、男女構成などによって分布は変わるため、
          「大学名だけで将来の年収が決まる」と考えるのは現実的ではありません。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          学歴は「スタートラインの傾向」を表すにすぎない
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          学歴は、新卒での就職先や最初のキャリアの選択肢に影響することがありますが、
          その後の年収は、業界選択・職種・転職タイミング・スキル・実績など、さまざまな要素によって変化します。
        </p>
        <p className="text-sm leading-relaxed text-base-content/80">
          実際に、卒業大学は同じでも、30代・40代の時点での年収偏差値が大きく分かれていることも多く、
          「大学別年収偏差値」はあくまで参考程度の指標として扱うのが現実的です。
        </p>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          大学名よりも「今の年収偏差値」を基準にする
        </h2>
        <p className="text-sm leading-relaxed text-base-content/80">
          学生の段階では大学別の年収傾向を参考にするのも一つですが、
          社会人になってからは、出身大学だけにとらわれず、
          「今の年齢・職種・年収レンジでどの位置にいるのか」を基準にキャリアを考えていくことが重要です。
        </p>
        <a href="/" className="btn btn-primary btn-sm sm:btn-md">
          年収偏差値を診断する（無料）
        </a>
      </section>
    </main>
  );
}
