import {
  createHabit,
  getAllHabits,
} from '../../application/use-cases/habits.use-case';
import {Habit} from '../../domain/entities/habits/entities/habits.entity';
import {HabitRequest} from '../../domain/entities/habits/request/habits.request';
import {HabitsRepository} from '../repositories/habits.repository';

const habitsRepository = new HabitsRepository();

export class HabitsController {
  static async getAll(): Promise<Habit[]> {
    return await getAllHabits(habitsRepository);
  }

  static async create(data: HabitRequest): Promise<null> {
    return await createHabit(habitsRepository, data);
  }
}
