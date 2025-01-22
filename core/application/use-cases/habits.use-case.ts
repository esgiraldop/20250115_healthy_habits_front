import {Habit} from '../../domain/entities/habits/entities/habits.entity';
import {HabitRequest} from '../../domain/entities/habits/request/habits.request';
import {HabitsRepository} from '../../infrastructure/repositories/habits.repository';

export const getAllHabits = async (
  habitsRepository: HabitsRepository,
): Promise<Habit[]> => {
  return await habitsRepository.getAll();
};

export const createHabit = async (
  habitsRepository: HabitsRepository,
  data: HabitRequest,
): Promise<null> => {
  return await habitsRepository.create(data);
};
