export type SalaryBand = {
  code: number;
  min: number;
  max: number;
  median: number;
  label: string;
  display: string;
};

export const salaryBandsV1: SalaryBand[] = [
  { code: 1, min: 0, max: 299, median: 150, label: "〜299万円", display: "〜299 万円" },
  { code: 2, min: 300, max: 349, median: 325, label: "300〜349万円", display: "300〜349 万円" },
  { code: 3, min: 350, max: 399, median: 375, label: "350〜399万円", display: "350〜399 万円" },
  { code: 4, min: 400, max: 449, median: 425, label: "400〜449万円", display: "400〜449 万円" },
  { code: 5, min: 450, max: 499, median: 475, label: "450〜499万円", display: "450〜499 万円" },
  { code: 6, min: 500, max: 549, median: 525, label: "500〜549万円", display: "500〜549 万円" },
  { code: 7, min: 550, max: 599, median: 575, label: "550〜599万円", display: "550〜599 万円" },
  { code: 8, min: 600, max: 699, median: 650, label: "600〜699万円", display: "600〜699 万円" },
  { code: 9, min: 700, max: 799, median: 750, label: "700〜799万円", display: "700〜799 万円" },
  { code: 10, min: 800, max: 899, median: 850, label: "800〜899万円", display: "800〜899 万円" },
  { code: 11, min: 900, max: 999, median: 950, label: "900〜999万円", display: "900〜999 万円" },
  { code: 12, min: 1000, max: 1199, median: 1100, label: "1000〜1199万円", display: "1000〜1199 万円" },
  { code: 13, min: 1200, max: 1499, median: 1350, label: "1200〜1499万円", display: "1200〜1499 万円" },
  { code: 14, min: 1500, max: Infinity, median: 1500, label: "1500万円以上", display: "1500 万円以上" },
];

export type SalaryBandCode = (typeof salaryBandsV1)[number]["code"];

export function findBandByCode(code: SalaryBandCode): SalaryBand | undefined {
  return salaryBandsV1.find((b) => b.code === code);
}

export function findBandForIncome(annualIncomeYen: number): SalaryBand | null {
  const man = annualIncomeYen / 10_000;
  return (
    salaryBandsV1.find((b) => man >= b.min && man <= b.max) ?? null
  );
}