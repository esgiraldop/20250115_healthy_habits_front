import {Habit} from '../entities/habits.entity';

export interface HabitResponse extends Omit<Habit, 'id'> {}
