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
  [RepeatsEvery_unit_enum.s]: 'Seconds',
  [RepeatsEvery_unit_enum.m]: 'Minutes',
  [RepeatsEvery_unit_enum.h]: 'Hours',
  [RepeatsEvery_unit_enum.D]: 'Days',
  [RepeatsEvery_unit_enum.W]: 'Weeks',
  [RepeatsEvery_unit_enum.M]: 'Months',
  [RepeatsEvery_unit_enum.Y]: 'Years',
};
