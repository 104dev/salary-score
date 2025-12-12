// app/regionOptions.ts

export type RegionOption = {
  code: string;
  label: string;
};

export const regionOptions: RegionOption[] = [
  { code: "TOKYO",      label: "東京" },
  { code: "URBAN_HIGH", label: "大阪・愛知・神奈川" },
  { code: "OTHER",      label: "その他の地域" },
];
