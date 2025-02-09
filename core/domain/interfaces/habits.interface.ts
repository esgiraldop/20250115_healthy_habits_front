import {Habit} from '../entities/habits/entities/habits.entity';
import {
  HabitCreateRequest,
  HabitUpdateRequest,
} from '../entities/habits/request/habits.request';

export interface HabitsInterface {
  getAll(): Promise<Habit[]>;
  getHabitById(habitId: string): Promise<Habit>;
  create(data: HabitCreateRequest): Promise<null>;
  update(data: HabitUpdateRequest): Promise<null>;
  delete(habitId: string): Promise<null>;
}
