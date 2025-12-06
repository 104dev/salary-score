# 🧮 SALARY INDEX
匿名で「自分の年収の立ち位置」を比較できる Web サービス。  
年齢・職種・年収レンジを入力するだけで、同年代 × 同職種の中でのスコアや分布を可視化します。

> 🎯 目的：企業／エージェントに偏った年収情報を、個人にも開く「判断の基準」を提供すること。

---

## 📌 機能概要

| 機能 | 説明 |
|---|---|
| 入力フォーム | 年齢 / 職種 / （必要に応じサブカテゴリ） / 年収レンジ / ニックネーム（任意） |
| 結果ページ | 偏差値スコア / 年収帯ヒストグラム / OGP 表示用メタ情報 / シェアボタン |
| 固定スナップショット保存 | 結果表示時点での分布とスコアを永久固定。後から変動しない。 |
| 匿名ユーザ識別 | Cookie にランダムな `sid` を保存し、同一端末での重複入力を防止（注意表示）。 |

---

## 🏗 技術スタック

### 🖥 フロントエンド
| 技術 | 理由 |
|---|---|
| React Router v7 + Vite | Remix v2 廃止に伴う公式推奨。ルーティング＋loader/action 運用が継続できる。 |
| TypeScript | 安全性と定義の再利用性 |
| Tailwind CSS + DaisyUI | UI 実装修正を高速化、ライト/ダーク自動対応（OS依存） |
| Recharts | 簡易ヒストグラムレンダリング用 |

### 💾 バックエンド
| 技術 | 理由 |
|---|---|
| PostgreSQL | 小〜中規模分析用途に適した RDB、集計クエリも安定 |
| Prisma 7 (Adapter 方式) | Prisma Client に URL を書かず、`prisma.config.ts` 側で安全に設定管理 |
| Docker Compose | Node + PostgreSQL の統一環境構築 |

---

## 🗂 ディレクトリ構成（主要）

app/
├─ db.server.ts # Prisma Client 初期化
├─ jobCategories.ts # 職種定義
├─ salaryBands.ts # 年収レンジ定義と検索
├─ config/
│ └─ salaryIndexVersion.ts # スナップショット用スコア世代
├─ layouts/
│ └─ RootLayout.tsx # 共通レイアウト（Meta/Links/Scripts含む）
├─ routes/
│ ├─ home.tsx # 入力フォームページ
│ └─ result.$entryId.tsx # 結果表示ページ（meta + loader + HTML）
prisma/
├─ schema.prisma
└─ prisma.config.ts

kotlin
コードをコピーする

---

## 🧾 DB スキーマ（Prisma）

```prisma
model SalaryEntry {
  id              String   @id @default(cuid())
  createdAt       DateTime @default(now())

  clientId        String?  // Cookie sid による匿名識別

  age             Int
  jobCategoryCode String
  jobSubCategory  String?
  annualIncome    Int       // 円換算（例：525万→5250000）
  industryCode    String?

  surveyVersion   Int       @default(1)

  nickname        String?

  SnapshotResult  SnapshotResult?

  @@index([jobCategoryCode, age])
  @@index([jobCategoryCode, jobSubCategory])
}

model SnapshotResult {
  id          String   @id @default(cuid())
  entryId     String   @unique
  createdAt   DateTime @default(now())

  score       Int       // 0〜100
  zScore      Float
  percentile  Float
  sampleSize  Int
  histogram   Json
  scoreVersion Int

  SalaryEntry SalaryEntry @relation(fields: [entryId], references: [id])
}
```

## 🧮 スコア算出
指標	説明
Z値	(自分の年収 - 平均) / 標準偏差
偏差値スコア	50 + Z値 × 10 を 0〜100 にクランプ
分布スナップショット	ヒストグラム（年収帯）とスコアを表示時点で固定保存
再閲覧時	保存されたスナップショットを使用し、結果が変動しない

📝 サンプル数が少ない (<5) 場合はスコア非表示。

## 🍪 匿名識別
Cookie	用途
sid	自動生成 UUID。再回答時の注意表示に使用（ブロックはしない）。

## 🧪 ローカル開発

### 📦 環境構築
```bash
コードをコピーする
docker compose up -d
docker compose run --rm node npm install
docker compose run --rm node npx prisma migrate dev
docker compose run --rm node npm run dev
```
🔧 .env （ローカル）
```ini
コードをコピーする
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
DATABASE_URL="postgres://postgres:postgres@db:5432/postgres"
````