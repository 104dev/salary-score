export type JobCategory = {
  code: string;
  label: string;
  emoji: string;
};

export const jobCategories: JobCategory[] = [
  { code: "SALES",        label: "営業",             emoji: "💼" },
  { code: "BACK_OFFICE",  label: "事務・バックオフィス", emoji: "🗂️" },
  { code: "IT_ENGINEER",  label: "ITエンジニア",     emoji: "🖥️" },
  { code: "TECH_NON_IT",  label: "製造・非IT技術職", emoji: "🔧" },
  { code: "SPECIALIST",   label: "専門職・医療・士業", emoji: "🎨" },
  { code: "MANAGEMENT",   label: "経営・管理職",     emoji: "👔" },
];

export type JobCategoryCode = (typeof jobCategories)[number]["code"];