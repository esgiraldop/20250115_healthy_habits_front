export interface IDropdownCategories<T> {
  categories: T;
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  placeholder: string;
}
