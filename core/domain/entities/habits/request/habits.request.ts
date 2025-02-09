import {Habit} from '../entities/habits.entity';

export interface HabitCreateRequest extends Omit<Habit, 'id' | 'created_at'> {}

export interface HabitUpdateRequest extends Omit<Habit, 'created_at'> {}
