export type GenderOption = {
  code: string;
  label: string;
};

export const genderOptions: GenderOption[] = [
  { code: "MALE",      label: "男性" },
  { code: "FEMALE",    label: "女性" },
  { code: "OTHER",     label: "その他" },
  { code: "NO_ANSWER", label: "回答しない" },
];