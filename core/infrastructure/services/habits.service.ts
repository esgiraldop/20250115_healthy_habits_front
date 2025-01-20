import {Habit} from '../../domain/entities/habits/entities/habits.entity';
import {HabitRepository} from '../repositories/habits.repository';
import {tableName} from './db-service';

const habitsRepository = new HabitRepository();

class habitsService {
  constructor(private habitsRepository: habitsRepository) {}
}

export const getHabits = async (
  db: SQLiteDatabase,
): Promise<Habit[] | null> => {};
