import {Habit} from '../entities/habits.entity';

export interface HabitRequest extends Omit<Habit, 'id'> {}
