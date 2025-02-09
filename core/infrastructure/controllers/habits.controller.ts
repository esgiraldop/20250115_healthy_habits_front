import {
  createHabit,
  deleteHabit,
  getAllHabits,
  getHabitById,
  updateHabit,
} from '../../application/use-cases/habits.use-case';
import {Habit} from '../../domain/entities/habits/entities/habits.entity';
import {
  HabitCreateRequest,
  HabitUpdateRequest,
} from '../../domain/entities/habits/request/habits.request';
import {HabitsRepository} from '../repositories/habits.repository';

const habitsRepository = new HabitsRepository();

export class HabitsController {
  static async getAll(): Promise<Habit[]> {
    return await getAllHabits(habitsRepository);
  }

  static async getHabitById(habitId: string): Promise<Habit> {
    return await getHabitById(habitsRepository, habitId);
  }

  static async create(data: HabitCreateRequest): Promise<null> {
    return await createHabit(habitsRepository, data);
  }

  static async update(data: HabitUpdateRequest): Promise<null> {
    return await updateHabit(habitsRepository, data);
  }

  static async delete(habitId: string): Promise<null> {
    return await deleteHabit(habitsRepository, habitId);
  }
}
