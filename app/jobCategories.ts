export type JobCategory = {
  code: string;
  label: string;
  emoji: string;
};

export const jobCategories: JobCategory[] = [
  { code: "SALES",        label: "営業",                 emoji: "💼" },
  { code: "BACK_OFFICE",  label: "事務・バックオフィス", emoji: "🗂️" },
  { code: "IT_ENGINEER",  label: "ITエンジニア",         emoji: "🖥️" },
  { code: "TECH_NON_IT",  label: "製造・非IT技術職",     emoji: "🔧" },
  { code: "SPECIALIST",   label: "専門職・医療・士業",   emoji: "🎨" },
  { code: "MANAGEMENT",   label: "経営・管理職",         emoji: "👔" },
  { code: "OTHER",        label: "その他",           emoji: "❓" },
];

export type JobCategoryCode = (typeof jobCategories)[number]["code"];

export type JobSubCategory = {
  code: string;
  label: string;
};

// メインカテゴリ → サブカテゴリ配列
export const jobSubCategories: Record<JobCategoryCode, JobSubCategory[]> = {
  // --- 営業 ---
  SALES: [
    { code: "B2B_SALES",     label: "法人営業" },
    { code: "B2C_SALES",     label: "個人営業" },
    { code: "INSIDE_SALES",  label: "インサイドセールス" },
    { code: "FIELD_SALES",   label: "フィールドセールス" },
  ],

  // --- バックオフィス ---
  BACK_OFFICE: [
    { code: "GENERAL_OFFICE",   label: "一般事務" },
    { code: "HR_ADMIN",         label: "人事・総務・労務" },
    { code: "ACCOUNTING",       label: "経理・財務" },
    { code: "LEGAL",            label: "法務" },
    { code: "INTERNAL_IT",      label: "情シス・社内SE" },
    { code: "CUSTOMER_SUPPORT", label: "カスタマーサポート" },
  ],

  // --- ITエンジニア ---
  IT_ENGINEER: [
    { code: "BACKEND",       label: "サーバーサイド" },
    { code: "FRONTEND",      label: "フロントエンド" },
    { code: "MOBILE",        label: "モバイルアプリ" },
    { code: "INFRA",         label: "インフラ／SRE" },
    { code: "DATA",          label: "データエンジニア／ML" },
    { code: "PM",            label: "PM／PdM" },
    { code: "QA",            label: "QA／テスト" },
  ],

  // --- 製造・非IT技術職 ---
  TECH_NON_IT: [
    { code: "MECH",          label: "機械設計" },
    { code: "ELEC",          label: "電気・電子" },
    { code: "CHEM",          label: "化学・素材" },
    { code: "CIVIL",         label: "建設・土木" },
    { code: "PLANT",         label: "プラントエンジニア" },
  ],

  // --- 専門職・医療・士業 ---
  SPECIALIST: [
    { code: "DOCTOR",           label: "医師" },
    { code: "DENTIST",          label: "歯科医師" },
    { code: "NURSE",            label: "看護師" },
    { code: "DENTAL_HYGIENIST", label: "歯科衛生士" },
    { code: "CARE_WORKER",      label: "介護士" },
    { code: "PHYSIOTHERAPIST",  label: "理学療法士" },

    { code: "LAWYER",           label: "弁護士" },
    { code: "TAX_ACCOUNTANT",   label: "税理士" },
    { code: "OTHER_LICENSED_PRO", label: "その他士業" },
  ],

  // --- 経営・管理職 ---
  MANAGEMENT: [
    // 今は細分化しない（必要になったらここに生やす）
  ],
  OTHER: [],
};

export type JobSubCategoryCode =
  (typeof jobSubCategories)[keyof typeof jobSubCategories][number]["code"];
