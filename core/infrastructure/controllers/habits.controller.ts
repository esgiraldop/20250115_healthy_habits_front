import {
  createHabit,
  getAllHabits,
} from '../../application/use-cases/habits.use-case';
import {HabitRequest} from '../../domain/entities/habits/request/habits.request';
import {HabitsRepository} from '../repositories/habits.repository';

const habitsRepository = new HabitsRepository();

export class HabitsController {
  static async getAll() {
    getAllHabits(habitsRepository);
  }

  static async create(data: HabitRequest) {
    createHabit(habitsRepository, data);
  }
}
