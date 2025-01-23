export enum RepeatsEvery_unit_enum {
  s, // Seconds
  m, // Minutes
  h, // Hours
  D, // Days
  W, // Weeks
  M, // Months
  Y, // Years
}

export interface Habit {
  id: number;
  name: string;
  created_at?: Date;
  date: Date;
  init_hour: number;
  end_hour: number;
  repeatsEvery: number;
  repeatsEvery_unit: RepeatsEvery_unit_enum;
  repeatsNum: number;
  description: string;
}
