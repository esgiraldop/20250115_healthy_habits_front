/* eslint-disable no-unused-vars */ // So the enum is not flag as "unused var"
export enum RepeatsEvery_unit_enum {
  // s = 's', // Seconds
  // m = 'm', // Minutes
  // h = 'h', // Hours
  D = 'D', // Days
  W = 'W', // Weeks
  M = 'M', // Months
  // Y = 'Y', // Years
}

export interface Habit {
  id: number;
  name: string;
  created_at: string;
  date: string;
  init_hour: string;
  end_hour: string;
  repeatsEvery: number;
  repeatsEvery_unit: RepeatsEvery_unit_enum;
  repeatsNum: number;
  description: string;
}
