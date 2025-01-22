import {Habit} from '../../core/domain/entities/habits/entities/habits.entity';

export interface IHabit extends Habit {}

export interface IUpdateHabit extends Partial<IHabit> {}
