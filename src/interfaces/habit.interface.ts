import {
  Habit,
  RepeatsEvery_unit_enum,
} from '../../core/domain/entities/habits/entities/habits.entity';
import {HabitRequest} from '../../core/domain/entities/habits/request/habits.request';

export interface IHabit extends Habit {}

export interface ICreateHabit extends HabitRequest {}

export interface IUpdateHabit extends Partial<IHabit> {}

export type unit_enum = RepeatsEvery_unit_enum;

export const freqUnitsCategories: Record<RepeatsEvery_unit_enum, string> = {
  // [RepeatsEvery_unit_enum.s]: 'Second',
  // [RepeatsEvery_unit_enum.m]: 'Minute',
  // [RepeatsEvery_unit_enum.h]: 'Hour',
  [RepeatsEvery_unit_enum.D]: 'Day',
  [RepeatsEvery_unit_enum.W]: 'Week',
  [RepeatsEvery_unit_enum.M]: 'Month',
  // [RepeatsEvery_unit_enum.Y]: 'Year',
};
