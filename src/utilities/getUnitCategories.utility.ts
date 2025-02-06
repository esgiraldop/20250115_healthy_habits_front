interface IValNameDict {
  val: string;
  label: string;
}

export const getUnitCategoriesJson = (
  categories: Record<string, string>,
): IValNameDict[] => {
  return Object.entries(categories).map(([val, label]) => ({
    label,
    val,
  }));
};

export const getUnitMeaning = (
  val: string,
  meaningJson: IValNameDict[],
): string | undefined => {
  return meaningJson.find(item => item.val === val)?.label;
};
