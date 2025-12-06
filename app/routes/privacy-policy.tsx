// app/routes/privacy-policy.tsx
export default function PrivacyPolicyRoute() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold mb-4">
        プライバシーポリシー
      </h1>

      <p className="text-sm text-base-content/70">
        本プライバシーポリシーは、「年収偏差値チェッカー SALARY SCORE」（以下「本サービス」といいます。）において
        取得する利用者情報の取り扱い方針を定めるものです。
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. 収集する情報および収集方法</h2>

        <h3 className="text-sm font-semibold mt-2">（1）利用者からご提供いただく情報</h3>
        <p className="text-sm leading-relaxed">
          本サービスの利用にあたり、利用者から以下の情報をご提供いただく場合があります。
        </p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>年齢</li>
          <li>職種区分および（必要に応じて）サブカテゴリ</li>
          <li>年収に関する情報（レンジや代表値など）</li>
          <li>ニックネーム（本名である必要はありません）</li>
          <li>年収に対する満足度などのアンケート回答</li>
        </ul>
        <p className="text-xs text-base-content/60 mt-1">
          ※ 本名や個人が特定される情報の入力はお控えください。
        </p>

        <h3 className="text-sm font-semibold mt-4">（2）サービス利用に伴い自動的に送信される情報</h3>
        <p className="text-sm leading-relaxed">
          本サービスでは、サービスの利用状況の把握や不正利用防止のため、以下の情報を自動的に取得する場合があります。
        </p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>IPアドレス</li>
          <li>ブラウザ情報、デバイス情報</li>
          <li>Cookie 等の識別子（匿名のクライアントID など）</li>
          <li>アクセス日時、アクセス元URL（リファラ）</li>
        </ul>

        <p className="text-sm leading-relaxed mt-2">
          また、アクセス解析やエラーログ収集のために、Google Analytics 等の外部サービスを利用する場合があります。
          これらのサービスによるデータの取り扱いについては、各事業者のプライバシーポリシーをご確認ください。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. 情報の利用目的</h2>
        <p className="text-sm leading-relaxed">
          取得した情報は、以下の目的の範囲内で利用します。
        </p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>年収スコア・偏差値の算出および結果表示のため</li>
          <li>統計情報の作成、サービス内容の改善・分析のため</li>
          <li>アクセス状況の計測、不具合・不正アクセス等の検知のため</li>
          <li>本サービスに関する問い合わせ対応のため</li>
          <li>規約違反行為または不正利用への対応のため</li>
        </ul>
        <p className="text-sm leading-relaxed mt-2">
          なお、収集した情報は統計的に処理した上で、個人を特定できない形に加工して利用する場合があります。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. 第三者提供について</h2>
        <p className="text-sm leading-relaxed">
          当方は、以下の場合を除き、取得した情報を第三者に提供することはありません。
        </p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>利用者本人の同意がある場合</li>
          <li>法令に基づき開示を求められた場合</li>
          <li>人の生命・身体または財産の保護のために必要がある場合で、本人の同意取得が困難なとき</li>
        </ul>
        <p className="text-sm leading-relaxed mt-2">
          広告配信や外部へのデータ提供等を行う場合には、その内容を本プライバシーポリシーの改定等により明示します。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">4. Cookie 等の利用について</h2>
        <p className="text-sm leading-relaxed">
          本サービスでは、匿名のクライアントID付与などの目的で Cookie 等の技術を利用する場合があります。
          これらは、利用者のブラウザを識別するためのものであり、単体で特定の個人を識別するものではありません。
        </p>
        <p className="text-sm leading-relaxed">
          利用者はブラウザの設定を変更することで Cookie の利用を制限することができますが、
          本サービスの一部機能が正常に動作しない可能性があります。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">5. プライバシーポリシーの変更</h2>
        <p className="text-sm leading-relaxed">
          当方は、必要に応じて本プライバシーポリシーの内容を変更することがあります。
          変更後の内容は、本サービス上に掲載した時点から適用されるものとします。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">6. お問い合わせ</h2>
        <p className="text-sm leading-relaxed">
          本ポリシーおよび利用者情報の取扱いに関するお問い合わせは、
          本サービス内のお問い合わせ手段（今後設置予定）からご連絡ください。
        </p>
      </section>
    </main>
  );
}