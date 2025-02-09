import {Habit} from '../entities/habits/entities/habits.entity';

export interface HabitsInterface {
  getAll(): Promise<Habit[]>;
  getHabitById(habitId: string): Promise<Habit>;
  create(data: Habit): Promise<null>;
  delete(habitId: string): Promise<null>;
}
