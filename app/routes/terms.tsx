// app/routes/terms.tsx
import type { ReactNode } from "react";

export default function TermsRoute() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold mb-4">
        利用規約
      </h1>

      <p className="text-sm text-base-content/70">
        本利用規約（以下「本規約」といいます。）は、「年収偏差値チェッカー SALARY SCORE」
        （以下「本サービス」といいます。）の利用条件を定めるものです。
        利用者は、本サービスを利用した時点で、本規約に同意したものとみなされます。
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">第1条（適用）</h2>
        <p className="text-sm leading-relaxed">
          本規約は、利用者による本サービスの利用に関わる一切の行為に適用されます。
          当方が本サービス上で随時掲載するガイドライン、注意書き等は、本規約の一部を構成するものとします。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">第2条（禁止事項）</h2>
        <p className="text-sm">
          利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。
        </p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>法令または公序良俗に違反する行為</li>
          <li>第三者または当方の権利・利益・名誉等を侵害する行為</li>
          <li>虚偽の情報や、他人になりすました情報を入力する行為</li>
          <li>本サービスのサーバーやネットワークに対する不正アクセス、攻撃、過度な負荷を与える行為</li>
          <li>本サービスの運営を妨害し、またはそのおそれのある行為</li>
          <li>本サービスで取得した情報を、不正な目的で利用・転載・再配布する行為</li>
          <li>その他、当方が不適切と判断する行為</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">第3条（入力内容についての責任）</h2>
        <p className="text-sm leading-relaxed">
          本サービスでは、年齢・職種・年収・ニックネームその他の情報を入力することができます。
          これらの入力内容に関しては、すべて利用者本人が責任を負うものとします。
        </p>
        <p className="text-sm leading-relaxed">
          入力内容に起因して利用者間または第三者との間でトラブルが生じた場合であっても、
          当方は一切の責任を負いません。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">第4条（サービスの変更・中断・終了）</h2>
        <p className="text-sm leading-relaxed">
          当方は、以下の場合には、利用者への事前の通知なく、本サービスの全部または一部を
          変更・中断・終了することができるものとします。
        </p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>システム保守やメンテナンスを行う場合</li>
          <li>火災・停電・地震・その他の不可抗力によりサービス提供が困難となった場合</li>
          <li>本サービスの継続提供が困難であると当方が判断した場合</li>
        </ul>
        <p className="text-sm leading-relaxed">
          当方は、本サービスの変更・中断・終了により利用者または第三者に生じたいかなる損害についても、
          一切の責任を負いません。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">第5条（免責事項）</h2>
        <p className="text-sm leading-relaxed">
          当方は、本サービスにおいて提供される年収スコア、偏差値、統計情報その他の内容について、
          その正確性・完全性・有用性等を保証するものではありません。
        </p>
        <p className="text-sm leading-relaxed">
          本サービスの利用または利用不能により利用者に生じた損害（機会損失、データ消失、
          精神的損害を含みますがこれらに限りません）について、当方は一切の責任を負いません。
        </p>
        <p className="text-sm leading-relaxed">
          また、本サービスはあくまで参考情報の提供を目的としたものであり、
          転職活動、年収交渉、投資、その他意思決定の結果について当方は関与いたしません。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">第6条（規約の変更）</h2>
        <p className="text-sm leading-relaxed">
          当方は、必要と判断した場合には、利用者に通知することなく本規約の内容を変更することができます。
          変更後の本規約は、本サービス上に掲示された時点から効力を生じるものとします。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">第7条（準拠法・管轄裁判所）</h2>
        <p className="text-sm leading-relaxed">
          本規約の解釈には日本法を準拠法とします。
          本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する日本の裁判所を
          第一審の専属的合意管轄裁判所とします。
        </p>
      </section>
    </main>
  );
}