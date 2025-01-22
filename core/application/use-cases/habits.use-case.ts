import {HabitRequest} from '../../domain/entities/habits/request/habits.request';
import {HabitsRepository} from '../../infrastructure/repositories/habits.repository';

export const getAllHabits = async (habitsRepository: HabitsRepository) => {
  return habitsRepository.getAll();
};

export const createHabit = (
  habitsRepository: HabitsRepository,
  data: HabitRequest,
) => {
  return habitsRepository.create(data);
};
